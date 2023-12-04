import { Booking, BookingInfo } from "../../models/Manager/booking.model.js";
import { FoodOrder } from "../../models/Manager/food.model.js";
import Room from "../../models/Manager/room.model.js";
import {
  CheckInfo,
  Dashboard,
  DashboardTable,
} from "../../models/dashboard.model.js";
import TransactionLog from "../../models/transactionlog.model.js";
import User from "../../models/user.model.js";

export const addBooking = async (req, res) => {
  try {
    const {
      room_ids,
      guestName,
      address,
      mobileNumber,
      emergency_contact,
      adult,
      children,
      bookingMethod,
      paymentMethod,
      transection_id,
      remark,
      from,
      to,
      no_of_days,
      room_discount,
      paid_amount = 0,
      status,
      nationality,
      doc_number,
      doc_images,
    } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    const currentDate = new Date();
    console.log(currentDate);
    const date = currentDate.toLocaleDateString();
    console.log(date);
    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    let total_rent = 0;

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

    const bookings = await Promise.all(
      room_ids.map(async (room_id) => {
        const room = await Room.findById(room_id);
        const rent_per_day = room.price;
        const total_room_rent = rent_per_day * no_of_days;
        total_rent += total_room_rent;
        const booking = new Booking({
          room_id,
          hotel_id,
          guestName,
          mobileNumber,
          from,
          to,
          no_of_days,
          rent_per_day: rent_per_day,
          total_room_rent: total_room_rent,
          status,
        });
        await booking.save(); // Save the booking document
        return booking._id; // Return the booking id
      })
    );
    const room_discount_percentage = room_discount / 100;
    const total_rent_after_dis = Math.ceil(
      total_rent - total_rent * room_discount_percentage
    );
    const newBookingInfo = new BookingInfo({
      room_ids,
      hotel_id,
      booking_ids: bookings,
      guestName,
      address,
      mobileNumber,
      emergency_contact,
      adult,
      children,
      bookingMethod,
      total_rent: total_rent,
      room_discount,
      total_rent_after_dis: total_rent_after_dis,
      total_payable_amount: total_rent_after_dis,
      paid_amount,
      total_balance:paid_amount,
      total_unpaid_amount: total_rent_after_dis - paid_amount,
      nationality,
      doc_number,
      doc_images,
    });

    const savedNewBookingInfo = await newBookingInfo.save();

    if (status === "CheckedIn") {
      const ownerDashboard = await Dashboard.findOne({
        user_id: user.parent_id,
      });
      ownerDashboard.total_checkin += 1;
      ownerDashboard.total_amount += paid_amount;

      await ownerDashboard.save();
      const managerDashboard = await Dashboard.findOne({
        user_id: userId,
      });
      managerDashboard.total_checkin += 1;
      managerDashboard.total_amount += paid_amount;

      await managerDashboard.save();
      const managerDashboardTable = await DashboardTable.findOne({
        user_id: userId,
        month_name: month_name,
        year: year,
      });

      if (managerDashboardTable) {
        managerDashboardTable.total_checkin += 1;
        await managerDashboardTable.save();
      } else {
        // Create a new dashboard table entry
        const newDashboardTable = new DashboardTable({
          user_id: userId,
          user_role: user.role,
          month_name,
          year,
          total_checkin: 1,
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
        ownerDashboardTable.total_checkin += 1;
        await ownerDashboardTable.save();
      } else {
        const newDashboardTable = new DashboardTable({
          user_id: user.parent_id,
          user_role: "owner",
          month_name,
          year,
          total_checkin: 1,
        });
        // Save the new dashboard table to the database
        await newDashboardTable.save();
      }
      const managerCheckInfo = await CheckInfo.findOne({
        user_id: userId,
        date,
      });
      if (managerCheckInfo) {
        managerCheckInfo.today_checkin += 1;
        await managerCheckInfo.save();
      } else {
        const newCheckInfo = new CheckInfo({
          user_id: userId,
          user_role: user.role,
          date,
          today_checkin: 1,
        });
        await newCheckInfo.save();
      }
      const ownerCheckInfo = await CheckInfo.findOne({
        user_id: user.parent_id,
        date,
      });

      if (ownerCheckInfo) {
        ownerCheckInfo.today_checkin += 1;
        await ownerCheckInfo.save();
      } else {
        const newCheckInfo = new CheckInfo({
          user_id: user.parent_id,
          user_role: "owner",
          date,
          today_checkin: 1,
        });
        await newCheckInfo.save();
      }
    }
    if (status === "Active") {
      const ownerDashboard = await Dashboard.findOne({
        user_id: user.parent_id,
      });
      const managerDashboard = await Dashboard.findOne({
        user_id: userId,
      });
      ownerDashboard.total_booking += 1;
      ownerDashboard.total_amount += paid_amount;

      await ownerDashboard.save();

      managerDashboard.total_booking += 1;
      managerDashboard.total_amount += paid_amount;

      await managerDashboard.save();

      const managerDashboardTable = await DashboardTable.findOne({
        user_id: userId,
        month_name: month_name,
        year: year,
      });

      if (managerDashboardTable) {
        managerDashboardTable.total_booking += 1;
        await managerDashboardTable.save();
      } else {
        // Create a new dashboard table entry
        const newDashboardTable = new DashboardTable({
          user_id: userId,
          user_role: user.role,
          month_name,
          year,
          total_booking: 1,
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
        ownerDashboardTable.total_booking += 1;
        await ownerDashboardTable.save();
      } else {
        const newDashboardTable = new DashboardTable({
          user_id: user.parent_id,
          user_role: "owner",
          month_name,
          year,
          total_booking: 1,
        });
        // Save the new dashboard table to the database
        await newDashboardTable.save();
      }
      console.log(date);
      const managerCheckInfo = await CheckInfo.findOne({
        user_id: userId,
        date,
      });
      if (managerCheckInfo) {
        managerCheckInfo.today_booking += 1;
        await managerCheckInfo.save();
      } else {
        const newCheckInfo = new CheckInfo({
          user_id: userId,
          user_role: user.role,
          date,
          today_booking: 1,
        });
        await newCheckInfo.save();
      }
      console.log("aise");
      const ownerCheckInfo = await CheckInfo.findOne({
        user_id: user.parent_id,
        date,
      });

      if (ownerCheckInfo) {
        ownerCheckInfo.today_booking += 1;
        await ownerCheckInfo.save();
      } else {
        const newCheckInfo = new CheckInfo({
          user_id: user.parent_id,
          user_role: "owner",
          date,
          today_booking: 1,
        });
        await newCheckInfo.save();
      }
    }
    // Create a new transaction log entry
    if (paid_amount > 0) {
      const newTransactionLog = new TransactionLog({
        manager_id: userId,
        booking_info_id: savedNewBookingInfo._id,
        dedicated_to: "hotel",
        tran_id: transection_id,
        payment_method: paymentMethod,
        from: guestName,
        to: user.username,
        amount: paid_amount,
        remark,
      });
      // Save the transaction log entry to the database
      await newTransactionLog.save();
    }
    // Update the status of booked rooms based on booking status
    const roomStatus = status === "CheckedIn" ? "CheckedIn" : "Booked";
    await Room.updateMany(
      { _id: { $in: room_ids } },
      { $set: { status: roomStatus } }
    );
    res.status(201).json({
      success: true,
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
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.booking_id; // Assuming you pass bookingId as a route parameter
    const userId = req.user.userId;
    const { tran_id, payment_method } = req.body;
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();

    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Fetch the booking to be canceled
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const bookingInfo = await BookingInfo.findOne({ booking_ids: bookingId });
    
    const ownerDashboard = await Dashboard.findOne({
      user_id: user.parent_id,
    });
    const managerDashboard = await Dashboard.findOne({
      user_id: userId,
    });

    // ownerDashboard.total_booking -= 1;
    ownerDashboard.total_canceled += 1;
    if (bookingInfo.room_ids.length === 1){
      ownerDashboard.total_amount -= bookingId.paid_amount;
    }
    await ownerDashboard.save();

    // managerDashboard.total_booking -= 1;
    managerDashboard.total_canceled += 1;

    await managerDashboard.save();

    const managerDashboardTable = await DashboardTable.findOne({
      user_id: userId,
      month_name: month_name,
      year: year,
    });

    if (managerDashboardTable) {
      managerDashboardTable.total_booking -= 1;
      await managerDashboardTable.save();
    }
    const ownerDashboardTable = await DashboardTable.findOne({
      user_id: user.parent_id,
      month_name: month_name,
      year: year,
    });

    if (ownerDashboardTable) {
      ownerDashboardTable.total_booking -= 1;
      await ownerDashboardTable.save();
    }
    const managerCheckInfo = await CheckInfo.findOne({
      user_id: userId,
      date,
    });

    if (managerCheckInfo) {
      managerCheckInfo.today_booking -= 1;
      managerCheckInfo.today_canceled_bookings += 1;
      await managerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: userId,
        user_role: user.role,
        today_canceled_bookings: 1,
      });
      await newCheckInfo.save();
    }
    const ownerCheckInfo = await CheckInfo.findOne({
      user_id: user.parent_id,
      date,
    });

    if (ownerCheckInfo) {
      ownerCheckInfo.today_booking -= 1;
      ownerCheckInfo.today_canceled_bookings += 1;
      await ownerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: user.parent_id,
        user_role: "owner",
        today_canceled_bookings: 1,
      });
      await newCheckInfo.save();
    }
    if (bookingInfo.paid_amount > 0) {
      if (bookingInfo.room_ids.length === 1) {
        const newTransactionLog = new TransactionLog({
          manager_id: userId,
          booking_info_id: bookingInfo._id,
          dedicated_to: "hotel",
          tran_id,
          from: user.username,
          to: bookingInfo.guestName,
          payment_method,
          amount: bookingInfo.paid_amount,
          remark: "Full booking canceled",
        });
        newTransactionLog.save();
        bookingInfo.paid_amount = 0;
        bookingInfo.total_balance = 0;
      }
    }
    // Remove the canceled room_id from bookingInfo.room_ids
    bookingInfo.room_ids.pull(booking.room_id);

    const new_total_rent = bookingInfo.total_rent - booking.total_room_rent;
    const room_discount_percentage = bookingInfo.room_discount / 100;
    const new_total_rent_after_dis = Math.ceil(
      new_total_rent - new_total_rent * room_discount_percentage
    );

    bookingInfo.total_rent = new_total_rent;
    bookingInfo.total_rent_after_dis = new_total_rent_after_dis;
    bookingInfo.total_unpaid_amount =
      new_total_rent_after_dis - bookingInfo.paid_amount;

    await bookingInfo.save();

    // Check if the booking is already canceled
    if (booking.status === "Canceled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already canceled",
      });
    }

    // Update the booking status to Canceled
    booking.status = "Canceled";
    await booking.save();

    // Update the status of booked rooms
    await Room.updateOne(
      { _id: { $in: booking.room_id } },
      { $set: { status: "Available" } }
    );
    // Update dashboard and checkInfo accordingly based on the cancellation
    // ... (implement your logic here)

    res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
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
    const { limit = 10, page = 1, search, filter } = req.query;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

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
      .populate("room_id", "roomNumber floorNumber");

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
export const getBookingDetailsById = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;

    const booking = await Booking.findById(bookingId).populate(
      "room_id",
      "roomNumber floorNumber"
    );
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    const bookingInfo = await BookingInfo.findOne({ booking_ids: bookingId });
    res.status(200).json({
      success: true,
      data: { ...booking._doc, ...bookingInfo._doc },
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

export const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;
    const updateData = req.body;
    const userId = req.user.userId;
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();

    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingBooking = await Booking.findById(bookingId);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    );

    // Check if the update includes changing the status to "CheckedIn" or "CheckedOut" or "Canceled"
    if (
      updateData.status === "CheckedIn" ||
      updateData.status === "CheckedOut" ||
      updateData.status === "Canceled"
    ) {
      const roomId = updatedBooking.room_id;

      // Update room status based on the updated status
      if (updateData.status === "CheckedIn") {
        const roomStatus = "CheckedIn";
        await Room.updateOne({ _id: roomId }, { $set: { status: roomStatus } });
        const newPaidAmount =
          updateData.paid_amount - existingBooking.paid_amount;
        const ownerDashboard = await Dashboard.findOne({
          user_id: user.parent_id,
        });
        const managerDashboard = await Dashboard.findOne({
          user_id: userId,
        });

        // ownerDashboard.total_booking -= 1;
        ownerDashboard.total_checkin += 1;
        ownerDashboard.total_amount += newPaidAmount;

        await ownerDashboard.save();

        // managerDashboard.total_booking -= 1;
        managerDashboard.total_checkin += 1;
        managerDashboard.total_amount += newPaidAmount;

        await managerDashboard.save();

        const managerDashboardTable = await DashboardTable.findOne({
          user_id: userId,
          month_name: month_name,
          year: year,
        });

        if (managerDashboardTable) {
          // managerDashboardTable.total_booking -= 1;
          managerDashboardTable.total_checkin += 1;
          await managerDashboardTable.save();
        } else {
          // Create a new dashboard table entry
          const newDashboardTable = new DashboardTable({
            user_id: userId,
            user_role: user.role,
            total_checkin: 1,
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
          // ownerDashboardTable.total_booking -= 1;
          ownerDashboardTable.total_checkin += 1;
          await ownerDashboardTable.save();
        } else {
          const newDashboardTable = new DashboardTable({
            user_id: user.parent_id,
            user_role: "owner",
            total_checkin: 1,
          });
          // Save the new dashboard table to the database
          await newDashboardTable.save();
        }
        const managerCheckInfo = await CheckInfo.findOne({
          user_id: userId,
          date,
        });

        if (managerCheckInfo) {
          managerCheckInfo.today_booking -= 1;
          managerCheckInfo.today_checkin += 1;
          await managerCheckInfo.save();
        } else {
          const newCheckInfo = new CheckInfo({
            user_id: userId,
            user_role: user.role,
            today_checkin: 1,
          });
          await newCheckInfo.save();
        }
        const ownerCheckInfo = await CheckInfo.findOne({
          user_id: user.parent_id,
          date,
        });

        if (ownerCheckInfo) {
          ownerCheckInfo.today_booking -= 1;
          ownerCheckInfo.today_checkin += 1;
          await ownerCheckInfo.save();
        } else {
          const newCheckInfo = new CheckInfo({
            user_id: user.parent_id,
            user_role: "owner",
            today_checkin: 1,
          });
          await newCheckInfo.save();
        }
      }
      if (updateData.status === "Canceled") {
        await Room.updateOne(
          { _id: roomId },
          { $set: { status: "Available" } }
        );
        const ownerDashboard = await Dashboard.findOne({
          user_id: user.parent_id,
        });
        const managerDashboard = await Dashboard.findOne({
          user_id: userId,
        });

        // ownerDashboard.total_booking -= 1;
        ownerDashboard.total_canceled += 1;
        ownerDashboard.total_amount -= updatedBooking.paid_amount;

        await ownerDashboard.save();

        // managerDashboard.total_booking -= 1;
        managerDashboard.total_canceled += 1;
        managerDashboard.total_amount -= updatedBooking.paid_amount;

        await managerDashboard.save();

        const managerDashboardTable = await DashboardTable.findOne({
          user_id: userId,
          month_name: month_name,
          year: year,
        });

        if (managerDashboardTable) {
          managerDashboardTable.total_booking -= 1;
          await managerDashboardTable.save();
        }
        const ownerDashboardTable = await DashboardTable.findOne({
          user_id: user.parent_id,
          month_name: month_name,
          year: year,
        });

        if (ownerDashboardTable) {
          ownerDashboardTable.total_booking -= 1;
          await ownerDashboardTable.save();
        }
        const managerCheckInfo = await CheckInfo.findOne({
          user_id: userId,
          date,
        });

        if (managerCheckInfo) {
          managerCheckInfo.today_booking -= 1;
          managerCheckInfo.today_canceled_bookings += 1;
          await managerCheckInfo.save();
        } else {
          const newCheckInfo = new CheckInfo({
            user_id: userId,
            user_role: user.role,
            today_canceled_bookings: 1,
          });
          await newCheckInfo.save();
        }
        const ownerCheckInfo = await CheckInfo.findOne({
          user_id: user.parent_id,
          date,
        });

        if (ownerCheckInfo) {
          ownerCheckInfo.today_booking -= 1;
          ownerCheckInfo.today_canceled_bookings += 1;
          await ownerCheckInfo.save();
        } else {
          const newCheckInfo = new CheckInfo({
            user_id: user.parent_id,
            user_role: "owner",
            today_canceled_bookings: 1,
          });
          await newCheckInfo.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      data: updatedBooking,
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const updateBookingInfo = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const updateData = req.body;

    // Find the BookingInfo document by ID
    const bookingInfo = await BookingInfo.findOne({
      booking_ids: booking_id,
    });

    if (!bookingInfo) {
      return res.status(404).json({
        success: false,
        message: "BookingInfo not found",
      });
    }

    // Update the BookingInfo document with the provided data
    Object.assign(bookingInfo, updateData);

    // Save the updated BookingInfo document
    await bookingInfo.save();

    res.status(200).json({
      success: true,
      message: "BookingInfo updated successfully",
      updatedBookingInfo: bookingInfo,
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

export const addToCheckin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      booking_ids,
      doc_images,
      doc_number,
      paid_amount,
      paymentMethod,
      remark,
      status,
      total_unpaid_amount,
      transection_id,
    } = req.body;

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();

    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const bookings = await Booking.find({ _id: { $in: booking_ids } });

    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: "one or more Bookings not found",
      });
    }

    const room_ids = bookings.map((booking) => booking.room_id);
    console.log(room_ids);
    // Find the Booking document by ID
    await Booking.updateMany(
      { _id: { $in: booking_ids } },
      { $set: { status: "CheckedIn" } }
    );

    // Find the associated BookingInfo document
    const bookingInfo = await BookingInfo.findOne({
      booking_ids: { $in: booking_ids },
    });

    if (!bookingInfo) {
      return res.status(404).json({
        success: false,
        message: "BookingInfo not found",
      });
    }

    bookingInfo.doc_images = doc_images;
    bookingInfo.doc_number = doc_number;
    bookingInfo.paid_amount += paid_amount;
    bookingInfo.total_unpaid_amount -= paid_amount;
    await bookingInfo.save();

    const roomStatus = "CheckedIn";
    await Room.updateMany(
      { _id: { $in: room_ids } },
      { $set: { status: roomStatus } }
    );
    // Perform additional actions on BookingInfo if needed
    if (paid_amount > 0) {
      const newTransactionLog = new TransactionLog({
        manager_id: userId,
        booking_info_id: bookingInfo._id,
        dedicated_to: "hotel",
        tran_id: transection_id,
        payment_method: paymentMethod,
        from: bookingInfo.guestName,
        to: user.username,
        amount: paid_amount,
        remark,
      });
      // Save the transaction log entry to the database
      await newTransactionLog.save();
    }
    const newPaidAmount = paid_amount;
    const ownerDashboard = await Dashboard.findOne({
      user_id: user.parent_id,
    });
    const managerDashboard = await Dashboard.findOne({
      user_id: userId,
    });

    // ownerDashboard.total_booking -= 1;
    ownerDashboard.total_checkin += 1;
    ownerDashboard.total_amount += newPaidAmount;

    await ownerDashboard.save();

    // managerDashboard.total_booking -= 1;
    managerDashboard.total_checkin += 1;
    managerDashboard.total_amount += newPaidAmount;

    await managerDashboard.save();

    const managerDashboardTable = await DashboardTable.findOne({
      user_id: userId,
      month_name: month_name,
      year: year,
    });

    if (managerDashboardTable) {
      // managerDashboardTable.total_booking -= 1;
      managerDashboardTable.total_checkin += 1;
      await managerDashboardTable.save();
    } else {
      // Create a new dashboard table entry
      const newDashboardTable = new DashboardTable({
        user_id: userId,
        user_role: user.role,
        total_checkin: 1,
        month_name,
        year,
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
      // ownerDashboardTable.total_booking -= 1;
      ownerDashboardTable.total_checkin += 1;
      await ownerDashboardTable.save();
    } else {
      const newDashboardTable = new DashboardTable({
        user_id: user.parent_id,
        user_role: "owner",
        total_checkin: 1,
        month_name,
        year,
      });
      // Save the new dashboard table to the database
      await newDashboardTable.save();
    }
    const managerCheckInfo = await CheckInfo.findOne({
      user_id: userId,
      date,
    });

    if (managerCheckInfo) {
      managerCheckInfo.today_booking -= 1;
      managerCheckInfo.today_checkin += 1;
      await managerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: userId,
        user_role: user.role,
        today_checkin: 1,
        date,
      });
      await newCheckInfo.save();
    }
    const ownerCheckInfo = await CheckInfo.findOne({
      user_id: user.parent_id,
      date,
    });

    if (ownerCheckInfo) {
      ownerCheckInfo.today_booking -= 1;
      ownerCheckInfo.today_checkin += 1;
      await ownerCheckInfo.save();
    } else {
      const newCheckInfo = new CheckInfo({
        user_id: user.parent_id,
        user_role: "owner",
        today_checkin: 1,
        date,
      });
      await newCheckInfo.save();
    }

    res.status(200).json({
      success: true,
      message: "Booking updated to CheckedIn successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const lastActiveBookingValidator = async (req, res) => {
  try {
    const booking_id = req.params.booking_id;

    const bookingInfo = await BookingInfo.findOne({ booking_ids: booking_id });

    if (!bookingInfo) {
      return res.status(404).json({
        message: "BookingInfo not found",
      });
    }
    if (bookingInfo.room_ids.length !== 1) {
      return res.status(403).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      paid_amount: bookingInfo.paid_amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
