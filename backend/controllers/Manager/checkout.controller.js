import BarOrder from "../../models/Manager/bar.model.js";
import Booking from "../../models/Manager/booking.model.js";
import { FoodOrder } from "../../models/Manager/food.model.js";
import GymBills from "../../models/Manager/gym.model.js";
import PoolBills from "../../models/Manager/pool.model.js";
import Room from "../../models/Manager/room.model.js";

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
    });
    if (!activeBookings || activeBookings.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No active CheckIns found for the given room",
      });
    }
    // Extract room_ids from each active booking
    const roomIds = activeBookings.map((booking) => booking.room_ids).flat();
    console.log(roomIds);
    const barOrders = await BarOrder.find({
      room_id: { $in: roomIds},
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
        error: "Validation error. Check your request data.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
