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
      guestName,
      room_numbers,
      payment_method,
      checked_in,
      checked_out,
      payable_amount,
      paid_amount,
      unpaid_amount,
    } = req.body;

    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    const currentDate = new Date();

    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    const Year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${day}-${month}-${Year}`;

    // Create a new Report instance
    const newReport = new ManagerReport({
      hotel_id,
      booking_id,
      guestName,
      room_numbers,
      payment_method,
      checked_in,
      checked_out,
      payable_amount,
      paid_amount,
      unpaid_amount,
    });

    // Update the booking status to "CheckedOut"
    const updatedBooking = await Booking.findByIdAndUpdate(
      booking_id,
      { status: "CheckedOut" }, // Fix: wrap in an object
      { new: true }
    );

    // Get room IDs from the updated booking
    const roomIds = updatedBooking.room_ids;

    // Define roomStatus (replace 'YOUR_ROOM_STATUS' with the actual status)
    const roomStatus = "Available";

    // Update room statuses
    await Room.updateMany(
      { _id: { $in: roomIds } },
      { $set: { status: roomStatus } }
    );
    await FoodOrder.deleteMany({ room_id: { $in: roomIds } });
    // Save the report to the database
    const savedReport = await newReport.save();

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
      await managerDashboardTable.save();
    } else {
      // Create a new dashboard table entry
      const newDashboardTable = new DashboardTable({
        user_id: userId,
        user_role: user.role,
        total_checkout: 1,
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
      await ownerDashboardTable.save();
    } else {
      const newDashboardTable = new DashboardTable({
        user_id: user.parent_id,
        user_role: "owner",
        total_checkout: 1,
      });
      // Save the new dashboard table to the database
      await newDashboardTable.save();
    }
    const managerCheckInfo = await CheckInfo.findOne({
      user_id: userId,
      date: formattedDate,
    });

    if (managerCheckInfo) {
      managerCheckInfo.today_checkout += 1;
      await managerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: userId,
        user_role: user.role,
        today_checkout: 1,
      });
      await newCheckInfo.save();
    }
    const ownerCheckInfo = await CheckInfo.findOne({
      user_id: user.parent_id,
      date: formattedDate,
    });

    if (ownerCheckInfo) {
      ownerCheckInfo.today_checkout += 1;
      await ownerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: userId,
        user_role: user.role,
        today_checkout: 1,
      });
      await newCheckInfo.save();
    }
    const existingStaticSubDashData = await StaticSubDashData.findOne({
      user_id: userId,
    });
    existingStaticSubDashData.total_hotel_income += new_paid_amount;
    existingStaticSubDashData.total_hotel_profit += new_paid_amount;
    await existingStaticSubDashData.save();
    const existingDailySubDashData = await DailySubDashData.findOne({
      user_id: userId,
      date,
    });
    if (existingDailySubDashData) {
      existingDailySubDashData.today_hotel_income += new_paid_amount;
      existingDailySubDashData.today_hotel_profit += new_paid_amount;
      await existingDailySubDashData.save();
    }
    if (!existingDailySubDashData) {
      const newDailySubDashData = new DailySubDashData({
        user_id: userId,
        today_hotel_expenses: new_paid_amount,
      });
      await newDailySubDashData.save();
    }
    const existingMonthlySubDashData = await MonthlySubDashData.findOne({
      user_id: userId,
      month_name,
      year,
    });
    if (existingMonthlySubDashData) {
      existingDailySubDashData.total_hotel_income += new_paid_amount;
      existingDailySubDashData.total_hotel_profit += new_paid_amount;
      await existingMonthlySubDashData.save();
    }
    if (!existingMonthlySubDashData) {
      const newMonthlySubDashData = new DailySubDashData({
        user_id: userId,
        total_hotel_expenses: new_paid_amount,
      });
      await newMonthlySubDashData.save();
    }
    // Respond with the saved report
    res.status(201).json(savedReport);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
