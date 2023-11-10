﻿import Booking from "../../models/Manager/booking.model.js";
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
      amount,
      paid_amount,
      discount,
      from,
      to,
      nationality,
      status,
      doc_number,
      doc_images,
    } = req.body;

    if (!room_ids || !Array.isArray(room_ids) || room_ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or empty room_ids provided",
      });
    }

    // Check if all provided room_ids exist
    const existingRooms = await Room.find({ _id: { $in: room_ids } });
    if (existingRooms.length !== room_ids.length) {
      return res.status(400).json({
        success: false,
        error: "One or more room_ids are invalid",
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
      amount,
      paid_amount,
      discount,
      from,
      to,
      nationality,
      status,
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
      error: "Internal Server Error",
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
      error: "Internal Server Error",
    });
  }
};
export const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.booking_id; // Assuming you pass the booking ID as a query parameter
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
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
      error: "Internal Server Error",
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
        error: "Booking not found",
      });
    }

    // Check if the update includes changing the status to "CheckedIn" or "CheckedOut"
    if (
      updateData.status === "CheckedIn" ||
      updateData.status === "CheckedOut"
    ) {
      const roomIds = updatedBooking.room_ids;

      // Update room status based on the updated status
      const roomStatus =
        updateData.status === "CheckedIn" ? "CheckedIn" : "Available";
      await Room.updateMany(
        { _id: { $in: roomIds } },
        { $set: { status: roomStatus } }
      );

      // Delete orders if the status is "CheckedOut"
      if (updateData.status === "CheckedOut") {
        await FoodOrder.deleteMany({ room_id: { $in: roomIds } });
        // Update room status to "CheckedIn"
        await Room.updateMany(
          { _id: { $in: roomIds } },
          { $set: { status: "Available" } }
        );
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
      error: "Internal Server Error",
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
        error: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
