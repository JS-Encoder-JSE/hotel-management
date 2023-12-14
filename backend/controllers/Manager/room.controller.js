import BarOrder from "../../models/Manager/bar.model.js";
import { Booking } from "../../models/Manager/booking.model.js";
import { FoodOrder } from "../../models/Manager/food.model.js";
import GymBills from "../../models/Manager/gym.model.js";
import PoolBills from "../../models/Manager/pool.model.js";
import Room from "../../models/Manager/room.model.js"; // Assuming the Room model file path
import User from "../../models/user.model.js";

//add room
export const addRoom = async (req, res) => {
  try {
    const {
      category,
      type,
      capacity,
      price,
      bedSize,
      floorNumber,
      roomNumber,
      images,
      description,
      air_conditioned,
      status,
    } = req.body;

    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    const newRoom = new Room({
      category,
      type,
      capacity,
      price,
      bedSize,
      floorNumber,
      roomNumber,
      images,
      description,
      air_conditioned,
      status,
      hotel_id,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({
      success: true,
      data: savedRoom,
      message: "Room added successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        error: error,
        message: "Validation error",
      });
    } else {
      res.status(500).json({
        success: false,
        error: error,
        message: "Internal Server Error",
      });
    }
  }
};

// get rooms by hotel Id
export const getRoomsByHotelId = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter, search } = req.query; // Allow query parameters for filtering and searching
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    // Construct the filter object based on the query parameters
    const query = {
      hotel_id: hotel_id,
    };
    if (["Available", "Booked", "CheckedIn"].includes(filter)) {
      query.status = filter;
    }

    if (search) {
      query.$or = [
        { roomNumber: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { floorNumber: 1 }, // Sort by floorNumber in ascending order
    };

    // Query the database with the constructed filter and sort options
    const rooms = await Room.paginate(query, options);

    res.status(200).json({
      success: true,
      data: rooms,
      message: "Rooms retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
    });
  }
};

// get room by id
export const getRoomById = async (req, res) => {
  try {
    const room_id = req.params.room_id; // Assuming you're passing the room ID as a parameter
    const room = await Room.findById(room_id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
      message: "Room retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all rooms
// export const getAllRooms = async (req, res) => {
//   try {
//     // getting only room numbers
//     const only_for_room = req.query.only_for_room;
//     if (only_for_room === "true") {
//       const rooms = await Room.find({}, "category _id roomNumber");

//       // send res
//       res.status(200).json({
//         success: true,
//         data: rooms,
//         message: "Rooms retrieved successfully",
//       });
//       return;
//     }

//     const { limit = 10, page = 1, ...query } = req.query;
//     const parsedLimit = parseInt(limit);
//     const parsedPage = parseInt(page);

//     const startIndex = (parsedPage - 1) * parsedLimit;
//     const endIndex = parsedPage * parsedLimit;

//     const totalRooms = await Room.countDocuments(query);
//     const totalPages = Math.ceil(totalRooms / parsedLimit);

//     const rooms = await Room.find(query).skip(startIndex).limit(parsedLimit);

//     const paginationInfo = {
//       totalRooms,
//       totalPages,
//       currentPage: parsedPage,
//       limit: parsedLimit,
//     };

//     res.status(200).json({
//       success: true,
//       data: rooms,
//       pagination: paginationInfo,
//       message: "Rooms retrieved successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// };

// update room
export const updateRoom = async (req, res) => {
  try {
    const room_id = req.params.room_id; // Assuming you pass the booking ID in the request body
    const updateData = req.body; // Object containing the fields to update

    const updateRoom = await Room.findByIdAndUpdate(room_id, updateData, {
      new: true,
    });

    if (!updateRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updateRoom,
      message: "Room updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// delete room
export const deleteRoom = async (req, res) => {
  try {
    const room_id = req.params.room_id; // Assuming you pass the booking ID in the request body
    const deleteRoom = await Room.findByIdAndDelete(room_id);
    if (!deleteRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getRoomPostedBills = async (req, res) => {
  try {
    const room_id = req.params.room_id;
    // Find food orders for the given room_id
    const activeBookings = await Booking.find({
      room_id,
      status: "CheckedIn",
    });
    console.log(activeBookings.food_order_ids);
    const foodOrders = await FoodOrder.find({
      _id: { $in: activeBookings.food_order_ids },
      room_id,
      order_status: "Current",
      // You may add other conditions if needed
    });
    // Find gym bills for the given room_id
    const gymBills = await GymBills.find({
      room_id,
      status: { $in: ["Partial", "Pending"] },
      // You may add other conditions if needed
    });
    // Find pool bills for the given room_id
    const poolBills = await PoolBills.find({
      room_id,
      status: { $in: ["Partial", "Pending"] },
      // You may add other conditions if needed
    });

    res.status(200).json({
      success: true,
      data: {
        food_bills: foodOrders,
        gym_bills: gymBills,
        pool_bills: poolBills,
      },
      message: "Room posted bills retrieved successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
