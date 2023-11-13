import Booking from "../../models/Manager/booking.model.js";
import { FoodOrder } from "../../models/Manager/food.model.js";
import Room from "../../models/Manager/room.model.js";

export const addBooking = async (req, res) => {
  try {
    const {
      room_ids,
      hotel_id,
      guestName,
      address,
      mobileNumber,
      emergency_contact,
      adult,
      children,
      paymentMethod,
      transection_id,
      from,
      to,
      no_of_days,
      rent_per_day,
      total_rent,
      discount,
      amount_after_dis,
      paid_amount,
      total_unpaid_amount,
      status,
      nationality,
      doc_number,
      doc_images,
    } = req.body;

    if (!room_ids || !Array.isArray(room_ids) || room_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty room_ids provided",
      });
    }

    // Check if all provided room_ids exist
    const existingRooms = await Room.find({ _id: { $in: room_ids } });
    if (existingRooms.length !== room_ids.length) {
      return res.status(400).json({
        success: false,
        message: "One or more room_ids are invalid",
      });
    }

    // Check room availability for the requested dates, excluding deleted bookings or check-ins
    const overlappingBookings = await Booking.find({
      room_ids: { $in: room_ids },
      deleted: false,
      $or: [
        {
          from: { $lte: new Date(to) },
          to: { $gte: new Date(from) },
        },
        {
          from: { $gte: new Date(from) },
          to: { $lte: new Date(to) },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      const unavailableRooms = overlappingBookings.map(
        (booking) => booking.room_ids
      );

      // Find the next available dates for each room, excluding deleted bookings or check-ins
      const nextAvailableDates = await Promise.all(
        unavailableRooms.map(async (roomId) => {
          const bookingsForRoom = await Booking.find({
            room_ids: roomId,
            to: { $lte: new Date(from) },
            deleted: false,
          })
            .sort({ to: -1 })
            .limit(1);

          if (bookingsForRoom.length > 0) {
            return bookingsForRoom[0].to;
          } else {
            // If no previous bookings, room is available from today
            return new Date();
          }
        })
      );

      return res.status(400).json({
        success: false,
        message: "One or more rooms are not available for the requested dates",
        unavailableRooms,
        nextAvailableDates,
      });
    }

    const newBooking = new Booking({
      room_ids,
      hotel_id,
      guestName,
      address,
      mobileNumber,
      emergency_contact,
      adult,
      children,
      paymentMethod,
      transection_id,
      from,
      to,
      no_of_days,
      rent_per_day,
      total_rent,
      discount,
      amount_after_dis,
      paid_amount,
      total_unpaid_amount,
      status,
      nationality,
      doc_number,
      doc_images,
    });

    const savedBooking = await newBooking.save();

    // Update the status of booked rooms based on booking status
    const roomStatus = status === "CheckedIn" ? "CheckedIn" : "Booked";
    await Room.updateMany(
      { _id: { $in: room_ids } },
      { $set: { status: roomStatus } }
    );

    res.status(201).json({
      success: true,
      data: savedBooking,
      message: "Booking added successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getBookingsByHotel = async (req, res) => {
  try {
    const hotel_id = req.params.hotel_id;
    const { limit = 10, page = 1, search, filter } = req.query;

    // Construct the filter object based on the query parameters
    const query = {
      hotel_id: hotel_id,
    };

    if (["Active", "CheckedIn", "CheckedOut", "Canceled"].includes(filter)) {
      query.status = filter;
    }

    if (search) {
      query.$or = [
        { guestName: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
        { nationality: { $regex: search, $options: "i" } },
        { doc_number: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    // Execute the query without paginate and then use populate
    const result = await Booking.find(query)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate("room_ids", "roomNumber floorNumber");

    const totalDocuments = await Booking.countDocuments(query);

    const bookings = {
      docs: result,
      totalDocs: totalDocuments,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(totalDocuments / options.limit),
    };

    res.status(200).json({
      success: true,
      data: bookings,
      message: "Bookings retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.booking_id; // Assuming you pass the booking ID as a query parameter
    const booking = await Booking.findById(bookingId).populate(
      "room_ids",
      "roomNumber floorNumber"
    );
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
      message: "Booking retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;
    const updateData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if the update includes changing the status to "CheckedIn" or "CheckedOut" or "Canceled"
    if (
      updateData.status === "CheckedIn" ||
      updateData.status === "CheckedOut" ||
      updateData.status === "Canceled"
    ) {
      const roomIds = updatedBooking.room_ids;

      // Update room status based on the updated status
      if (updateData.status === "CheckedIn") {
        const roomStatus = "CheckedIn";
        await Room.updateMany(
          { _id: { $in: roomIds } },
          { $set: { status: roomStatus } }
        );
      } else if (
        updateData.status === "CheckedOut" ||
        updateData.status === "Canceled"
      ) {
        const roomStatus = "Available";
        await Room.updateMany(
          { _id: { $in: roomIds } },
          { $set: { status: roomStatus } }
        );
      }

      // Additional logic for "CheckedOut" status
      if (updateData.status === "CheckedOut") {
        await FoodOrder.deleteMany({ room_id: { $in: roomIds } });
      }
    }

    res.status(200).json({
      success: true,
      data: updatedBooking,
      message: "Booking updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId; // Assuming you pass the booking ID in the request body
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getActiveBookingByRoomId = async (req, res) => {
  try {
    const { room_id } = req.params;

    // Get the current date in the required format
    const currentDate = new Date().toISOString();

    // Find active bookings for the given room_id
    const activeBookings = await Booking.find({
      room_ids: room_id,
      status: "Active",
      from: { $lte: currentDate },
      to: { $gte: currentDate },
    });

    if (!activeBookings || activeBookings.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No active bookings found for the given room",
      });
    }

    res.status(200).json({
      success: true,
      data: activeBookings,
      message: "Active bookings retrieved successfully",
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
