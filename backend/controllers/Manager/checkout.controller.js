import BarOrder from "../../models/Manager/bar.model.js";
import { Booking, BookingInfo } from "../../models/Manager/booking.model.js";
import { FoodOrder } from "../../models/Manager/food.model.js";
import GymBills from "../../models/Manager/gym.model.js";
import PoolBills from "../../models/Manager/pool.model.js";
import ManagerReport from "../../models/Manager/report.model.js";
import Report from "../../models/Manager/report.model.js";
import Room from "../../models/Manager/room.model.js";
import {
  CheckInfo,
  Dashboard,
  DashboardTable,
} from "../../models/dashboard.model.js";
import {
  DailySubDashData,
  MonthlySubDashData,
  StaticSubDashData,
} from "../../models/subdashboard.model.js";
import TransactionLog from "../../models/transactionlog.model.js";
import User from "../../models/user.model.js";

export const getCheckoutInfoByRoom = async (req, res) => {
  try {
    const { room_ids } = req.body;

    // // Get the current date in the required format
    // const currentDate = new Date().toISOString();
    // // Get the date for the previous day
    // const previousDay = new Date();
    // previousDay.setDate(previousDay.getDate() - 1);
    // const previousDayString = previousDay.toISOString();

    // Find active bookings for the given room_id
    const activeBookings = await Booking.find({
      room_id: { $in: room_ids },
      status: "CheckedIn",
    }).populate({
      path: "room_id",
      model: "Room",
      select: "roomNumber category",
    });
    if (!activeBookings || activeBookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active CheckIns found for the given room",
      });
    }
    const activeBookingIds = activeBookings.map((booking) => booking._id);

    const bookingInfo = await BookingInfo.findOne({
      booking_ids: { $in: activeBookingIds },
    }).populate({
      path: "room_ids",
      model: "Room",
      select: "roomNumber category",
    });
    // Find food orders for the given room_id
    const foodOrders = await FoodOrder.find({
      room_id: { $in: room_ids },
      // You may add other conditions if needed
    });
    // Find gym bills for the given room_id
    const gymBills = await GymBills.find({
      room_id: { $in: room_ids },
      status: { $in: ["Partial", "Pending"] },
      // You may add other conditions if needed
    });
    // Find pool bills for the given room_id
    const poolBills = await PoolBills.find({
      room_id: { $in: room_ids },
      status: { $in: ["Partial", "Pending"] },
      // You may add other conditions if needed
    });

    res.status(200).json({
      success: true,
      data: {
        booking_info: bookingInfo,
        room_bookings: activeBookings,
        food_bills: foodOrders,
        gym_bills: gymBills,
        pool_bills: poolBills,
      },
      message: "Checkout informations retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error. Check your request data.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const checkedOut = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      booking_id,
      new_total_room_rent,
      new_no_of_days,
      to,
      new_total_rent,
      new_total_rent_after_dis,
      new_total_posted_bills,
      new_total_payable_amount,
      new_total_paid_amount,
      new_total_unpaid_amount,
      new_total_balance,
      new_total_tax,
      new_total_additional_charges,
      new_total_service_charges,
      guestName,
      room_numbers,
      payment_method,
      tran_id,
      checked_in,
      checked_out,
      paid_amount,
      total_checkout_bills,
      restaurant_income,
    } = req.body;

    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    const hotel_income = total_checkout_bills - restaurant_income;

    const newReport = new ManagerReport({
      hotel_id,
      booking_ids: booking_id,
      guestName,
      room_numbers,
      payment_method,
      checked_in,
      checked_out,
      payable_amount: total_checkout_bills,
      paid_amount,
      unpaid_amount: total_checkout_bills - paid_amount,
    });
    await newReport.save();
    // Update the booking status to "CheckedOut"
    await Booking.updateOne(
      { _id: booking_id },
      { $set: { status: "CheckedOut" } }, // Wrap the update in $set
      { new: true }
    );

    // Retrieve the updated documents
    // const updatedDocuments = await Booking.findOne({ _id: booking_id });

    // Extract room_ids from the updated documents
    // const roomIds = updatedDocuments.map((doc) => doc.room_id);
    const booking = await Booking.findById(booking_id);

    booking.to = to;
    booking.total_room_rent = new_total_room_rent;
    booking.no_of_days = new_no_of_days;

    await booking.save();
    const room_id = booking.room_id;

    const bookingInfo = await BookingInfo.findOne({
      booking_ids: booking_id,
    });

    bookingInfo.room_ids.pull(room_id);
    bookingInfo.total_rent = new_total_rent;
    bookingInfo.total_rent_after_dis = new_total_rent_after_dis;
    bookingInfo.total_posted_bills = new_total_posted_bills;
    bookingInfo.paid_amount = new_total_paid_amount;
    bookingInfo.total_payable_amount = new_total_payable_amount;
    bookingInfo.total_unpaid_amount = new_total_unpaid_amount;
    bookingInfo.total_balance = new_total_balance;
    bookingInfo.total_tax = new_total_tax;
    bookingInfo.total_additional_charges = new_total_additional_charges;
    bookingInfo.total_service_charges = new_total_service_charges;

    await bookingInfo.save();


    if (paid_amount > 0) {
      const newTransactionLog = new TransactionLog({
        manager_id: userId,
        booking_info_id: bookingInfo._id,
        dedicated_to: "hotel",
        tran_id,
        payment_method,
        from: bookingInfo.guestName,
        to: user.username,
        amount: paid_amount,
        remark: "checkout",
      });
      // Save the transaction log entry to the database
      await newTransactionLog.save();
    }
    // Define roomStatus (replace 'YOUR_ROOM_STATUS' with the actual status)
    const roomStatus = "Available";

    // Update room statuses
    await Room.updateOne({ _id: room_id }, { $set: { status: roomStatus } });
    await FoodOrder.updateOne(
      { room_id: room_id },
      { $set: { status: "CheckedOut", payment_status: "Paid" } }
    );
    await GymBills.updateOne(
      { room_id: room_id },
      { $set: { status: "Paid" } }
    );
    await PoolBills.updateOne(
      { room_id: room_id },
      { $set: { status: "Paid" } }
    );
    // await FoodOrder.deleteMany({ room_id: { $in: roomIds } });
    // await GymBills.deleteMany({ room_id: { $in: roomIds } });
    // await PoolBills.deleteMany({ room_id: { $in: roomIds } });

    const ownerDashboard = await Dashboard.findOne({
      user_id: user.parent_id,
    });
    const managerDashboard = await Dashboard.findOne({
      user_id: userId,
    });

    ownerDashboard.total_checkout += 1;
    ownerDashboard.total_amount += paid_amount;

    await ownerDashboard.save();

    managerDashboard.total_checkout += 1;
    managerDashboard.total_amount += paid_amount;

    await managerDashboard.save();

    const managerDashboardTable = await DashboardTable.findOne({
      user_id: userId,
      month_name: month_name,
      year: year,
    });

    if (managerDashboardTable) {
      managerDashboardTable.total_checkout += 1;
      managerDashboardTable.total_income += paid_amount;
      managerDashboardTable.total_profit += paid_amount;
      await managerDashboardTable.save();
    } else {
      // Create a new dashboard table entry
      const newDashboardTable = new DashboardTable({
        user_id: userId,
        user_role: user.role,
        month_name,
        year,
        total_checkout: 1,
        total_income: paid_amount,
        total_profit: paid_amount,
      });
      // Save the new dashboard table to the database
      await newDashboardTable.save();
    }
    const ownerDashboardTable = await DashboardTable.findOne({
      user_id: user.parent_id,
      month_name: month_name,
      year: year,
    });

    if (ownerDashboardTable) {
      ownerDashboardTable.total_checkout += 1;
      ownerDashboardTable.total_income += paid_amount;
      ownerDashboardTable.total_profit += paid_amount;
      await ownerDashboardTable.save();
    } else {
      const newDashboardTable = new DashboardTable({
        user_id: user.parent_id,
        user_role: "owner",
        month_name,
        year,
        total_checkout: 1,
        total_income: paid_amount,
        total_profit: paid_amount,
      });
      // Save the new dashboard table to the database
      await newDashboardTable.save();
    }
    const managerCheckInfo = await CheckInfo.findOne({
      user_id: userId,
      date,
    });

    if (managerCheckInfo) {
      managerCheckInfo.today_checkout += 1;
      await managerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: userId,
        user_role: user.role,
        date,
        today_checkout: 1,
      });
      await newCheckInfo.save();
    }
    const ownerCheckInfo = await CheckInfo.findOne({
      user_id: user.parent_id,
      date,
    });

    if (ownerCheckInfo) {
      ownerCheckInfo.today_checkout += 1;
      await ownerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: userId,
        user_role: user.role,
        date,
        today_checkout: 1,
      });
      await newCheckInfo.save();
    }
    const existingStaticSubDashData = await StaticSubDashData.findOne({
      user_id: userId,
    });
    existingStaticSubDashData.total_hotel_income += hotel_income;
    existingStaticSubDashData.total_hotel_profit += hotel_income;
    existingStaticSubDashData.total_restaurant_income += restaurant_income;
    existingStaticSubDashData.total_restaurant_profit += restaurant_income;
    await existingStaticSubDashData.save();
    const existingDailySubDashData = await DailySubDashData.findOne({
      user_id: userId,
      date,
    });
    if (existingDailySubDashData) {
      existingDailySubDashData.today_hotel_income += hotel_income;
      existingDailySubDashData.today_hotel_profit += hotel_income;
      existingDailySubDashData.today_restaurant_income += restaurant_income;
      existingDailySubDashData.today_restaurant_profit += restaurant_income;
      await existingDailySubDashData.save();
    }
    if (!existingDailySubDashData) {
      const newDailySubDashData = new DailySubDashData({
        user_id: userId,
        user_role: user.role,
        date,
        today_hotel_income: hotel_income,
        today_hotel_profit: hotel_income,
        today_restaurant_income: restaurant_income,
        today_restaurant_profit: restaurant_income,
      });
      await newDailySubDashData.save();
    }
    const existingMonthlySubDashData = await MonthlySubDashData.findOne({
      user_id: userId,
      month_name,
      year,
    });
    console.log(existingMonthlySubDashData);
    if (existingMonthlySubDashData) {
      existingMonthlySubDashData.total_hotel_income += hotel_income;
      existingMonthlySubDashData.total_hotel_profit += hotel_income;
      existingMonthlySubDashData.total_restaurant_income += restaurant_income;
      existingMonthlySubDashData.total_restaurant_profit += restaurant_income;
      await existingMonthlySubDashData.save();
    }
    if (!existingMonthlySubDashData) {
      const newMonthlySubDashData = new MonthlySubDashData({
        user_id: userId,
        user_role: user.role,
        month_name,
        year,
        total_hotel_income: hotel_income,
        total_hotel_profit: hotel_income,
        total_restaurant_income: restaurant_income,
        total_restaurant_profit: restaurant_income,
      });
      await newMonthlySubDashData.save();
    }
    // Respond with the saved report
    res.status(201).json({ message: "Successfully Checked-Out" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
