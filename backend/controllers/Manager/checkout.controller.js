import BarOrder from "../../models/Manager/bar.model.js";
import Booking from "../../models/Manager/booking.model.js";
import { FoodOrder } from "../../models/Manager/food.model.js";
import GymBills from "../../models/Manager/gym.model.js";
import PoolBills from "../../models/Manager/pool.model.js";
import ManagerReport from "../../models/Manager/report.model.js";
import Report from "../../models/Manager/report.model.js";
import Room from "../../models/Manager/room.model.js";
import User from "../../models/user.model.js";

export const getCheckoutInfoByRoom = async (req, res) => {
  try {
    const { room_id } = req.params;

    // Get the current date in the required format
    const currentDate = new Date().toISOString();

    // Find active bookings for the given room_id
    const activeBookings = await Booking.find({
      room_ids: room_id,
      status: "CheckedIn",
      from: { $lte: currentDate },
      to: { $gte: currentDate },
    }).populate({
      path: "room_ids",
      model: "Room",
      select: "roomNumber category",
    });
    if (!activeBookings || activeBookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active CheckIns found for the given room",
      });
    }
    // Extract room_ids from each active booking
    const roomIds = activeBookings.map((booking) => booking.room_ids).flat();
    const barOrders = await BarOrder.find({
      room_id: { $in: roomIds },
      status: { $in: ["Partial", "Pending"] },
    });
    // Find food orders for the given room_id
    const foodOrders = await FoodOrder.find({
      room_id: { $in: roomIds },
      // You may add other conditions if needed
    });
    // Find gym bills for the given room_id
    const gymBills = await GymBills.find({
      room_id: { $in: roomIds },
      status: { $in: ["Partial", "Pending"] },
      // You may add other conditions if needed
    });
    // Find pool bills for the given room_id
    const poolBills = await PoolBills.find({
      room_id: { $in: roomIds },
      status: { $in: ["Partial", "Pending"] },
      // You may add other conditions if needed
    });

    res.status(200).json({
      success: true,
      data: {
        booking_info: activeBookings,
        food_bills: foodOrders,
        bar_bills: barOrders,
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

    // Respond with the saved report
    res.status(201).json(savedReport);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
