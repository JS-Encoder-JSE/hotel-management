import Booking from '../../models/Manager/booking.model.js';

export const addBooking = async (req, res) => {
    try {
        const {
          roomNumber,
          guestName,
          mobileNumber,
          age,
          adult,
          children,
          paymentMethod,
          discount,
          documents,
          to,
          from,
        } = req.body;
    
        const newBooking = new Booking({
          roomNumber,
          guestName,
          mobileNumber,
          age,
          adult,
          children,
          paymentMethod,
          discount,
          documents,
          from,
          to
        });
    
        const savedBooking = await newBooking.save();
    
        res.status(201).json({
          success: true,
          data: savedBooking,
          message: 'Booking added successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error'
        });
      }
};

export const getBooking = async (req, res) => {
    try {
      const { limit = 10, page = 1,...query } = req.query;
      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);
  
      const startIndex = (parsedPage - 1) * parsedLimit;
      const endIndex = parsedPage * parsedLimit;
  
      const totalBookings = await Booking.countDocuments(query);
      const totalPages = Math.ceil(totalBookings / parsedLimit);
  
      const bookings = await Booking.find(query).skip(startIndex).limit(parsedLimit);
  
      res.status(200).json({
        success: true,
        data: bookings,
        pagination: {
          total: totalBookings,
          totalPages: totalPages,
          currentPage: parsedPage,
          limit: parsedLimit
        },
        message: 'Bookings retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  };

export const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.bookingId; // Assuming you pass the booking ID as a query parameter
        const booking = await Booking.findById(bookingId);
    
        if (!booking) {
          return res.status(404).json({
            success: false,
            error: 'Booking not found'
          });
        }
    
        res.status(200).json({
          success: true,
          data: booking,
          message: 'Booking retrieved successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error'
        });
      }
};


export const updateBooking = async (req, res) => {
  try {
      
    const bookingId = req.params.bookingId; // Assuming you pass the booking ID in the request body
        const updateData = req.body; // Object containing the fields to update
    
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
    
        if (!updatedBooking) {
          return res.status(404).json({
            success: false,
            error: 'Booking not found'
          });
        }
    
        res.status(200).json({
          success: true,
          data: updatedBooking,
          message: 'Booking updated successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error'
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
            error: 'Booking not found'
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Booking deleted successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error'
        });
      }
};