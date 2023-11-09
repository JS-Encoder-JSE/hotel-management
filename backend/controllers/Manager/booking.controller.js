import Booking from "../../models/Manager/booking.model.js";

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
      discount,
      from,
      to,
      nationality,
      status,
      doc_number,
      doc_images,
    } = req.body;

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
      discount,
      from,
      to,
      nationality,
      status,
      doc_number,
      doc_images,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      data: savedBooking,
      message: "Booking added successfully",
    });
  } catch (error) {
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

    // Query the database with the constructed filter
    const bookings = await Booking.paginate(query, options);

    res.status(200).json({
      success: true,
      data: bookings,
      message: "Rooms retrieved successfully",
    });
  } catch (error) {
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
    const bookingId = req.params.booking_id; // Assuming you pass the booking ID in the request body
    const updateData = req.body; // Object containing the fields to update

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
