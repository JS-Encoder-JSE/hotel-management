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
      discount,
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

    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    const Year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${day}-${month}-${Year}`;

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

    // // Check room availability for the requested dates, excluding deleted bookings or check-ins
    // const overlappingBookings = await Booking.find({
    //   room_ids: { $in: room_ids },
    //   deleted: false,
    //   status: { $ne: "Canceled" },
    //   $or: [
    //     {
    //       from: { $lte: new Date(to) },
    //       to: { $gte: new Date(from) },
    //     },
    //     {
    //       from: { $gte: new Date(from) },
    //       to: { $lte: new Date(to) },
    //     },
    //   ],
    // });

    // if (overlappingBookings.length > 0) {
    //   const unavailableRooms = overlappingBookings.map(
    //     (booking) => booking.room_ids
    //   );

    //   // Find the next available dates for each room, excluding deleted bookings or check-ins
    //   const nextAvailableDates = await Promise.all(
    //     unavailableRooms.map(async (roomId) => {
    //       const bookingsForRoom = await Booking.find({
    //         room_ids: roomId,
    //         to: { $lte: new Date(from) },
    //         status: { $ne: "Canceled" },
    //         deleted: false,
    //       })
    //         .sort({ to: -1 })
    //         .limit(1);

    //       if (bookingsForRoom.length > 0) {
    //         return bookingsForRoom[0].to;
    //       } else {
    //         // If no previous bookings, room is available from today
    //         return new Date();
    //       }
    //     })
    //   );

    //   return res.status(400).json({
    //     success: false,
    //     message: "One or more rooms are not available for the requested dates",
    //     unavailableRooms,
    //     nextAvailableDates,
    //   });
    // }
    // const bookings = await Promise.all(
    //   room_ids.map(async (room_id) => {
    //     const room = await Room.findById(room_id);
    //     const rent_per_day = room.price;
    //     const total_room_rent = rent_per_day * no_of_days;
    //     total_rent += total_room_rent;
    //     return new Booking({
    //       room_id,
    //       hotel_id,
    //       from,
    //       to,
    //       no_of_days,
    //       rent_per_day: rent_per_day,
    //       total_room_rent: total_room_rent,
    //       status,
    //     });
    //   })
    // );
    // await Booking.create(bookings);
    const bookings = await Promise.all(
      room_ids.map(async (room_id) => {
        const room = await Room.findById(room_id);
        const rent_per_day = room.price;
        const total_room_rent = rent_per_day * no_of_days;
        total_rent += total_room_rent;
        const booking = new Booking({
          room_id,
          hotel_id,
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
    console.log(bookings);
    const amount_after_dis = total_rent - discount;
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
      discount,
      amount_after_dis: amount_after_dis,
      paid_amount,
      total_unpaid_amount: amount_after_dis - paid_amount,
      nationality,
      doc_number,
      doc_images,
    });

    const savedNewBookingInfo = await newBookingInfo.save();
    // const newBooking = new Booking({
    //   room_id,
    //   hotel_id,
    //   from,
    //   to,
    //   no_of_days,
    //   rent_per_day,
    //   total_rent,
    //   status,
    // });

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
          total_checkin: 1,
        });
        // Save the new dashboard table to the database
        await newDashboardTable.save();
      }
      const managerCheckInfo = await CheckInfo.findOne({
        user_id: userId,
        date: formattedDate,
      });
      if (managerCheckInfo) {
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
        date: formattedDate,
      });

      if (ownerCheckInfo) {
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
          total_booking: 1,
        });
        // Save the new dashboard table to the database
        await newDashboardTable.save();
      }
      const managerCheckInfo = await CheckInfo.findOne({
        user_id: userId,
        date: formattedDate,
      });
      if (managerCheckInfo) {
        managerCheckInfo.today_booking += 1;
        await managerCheckInfo.save();
      } else {
        const newCheckInfo = new CheckInfo({
          user_id: userId,
          user_role: user.role,
          today_booking: 1,
        });
        await newCheckInfo.save();
      }
      console.log("aise");
      const ownerCheckInfo = await CheckInfo.findOne({
        user_id: user.parent_id,
        date: formattedDate,
      });

      if (ownerCheckInfo) {
        ownerCheckInfo.today_booking += 1;
        await ownerCheckInfo.save();
      } else {
        const newCheckInfo = new CheckInfo({
          user_id: user.parent_id,
          user_role: "owner",
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

    // Check if the user has the authority to cancel the booking (you might want to implement your own logic for this)

    // Fetch the booking to be canceled
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const bookingInfo = await BookingInfo.findOne({ booking_ids: bookingId });
    const new_total_rent = bookingInfo.total_rent - booking.total_room_rent;
    const new_amount_after_dis = new_total_rent - bookingInfo.discount;

    bookingInfo.total_rent = new_total_rent;
    bookingInfo.amount_after_dis = new_amount_after_dis;
    bookingInfo.total_unpaid_amount =
      new_amount_after_dis - bookingInfo.paid_amount;

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
    const userId = req.user.userId;
    const currentDate = new Date();

    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

    const Year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${day}-${month}-${Year}`;

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
      const roomIds = updatedBooking.room_ids;

      // Update room status based on the updated status
      if (updateData.status === "CheckedIn") {
        const roomStatus = "CheckedIn";
        await Room.updateMany(
          { _id: { $in: roomIds } },
          { $set: { status: roomStatus } }
        );
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
          date: formattedDate,
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
          date: formattedDate,
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
        await Room.updateMany(
          { _id: { $in: roomIds } },
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
          date: formattedDate,
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
          date: formattedDate,
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
