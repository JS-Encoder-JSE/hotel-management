import { BookingInfo } from "../models/Manager/booking.model.js";
import { Dashboard, DashboardTable } from "../models/dashboard.model.js";
import {
  DailySubDashData,
  MonthlySubDashData,
  StaticSubDashData,
} from "../models/subdashboard.model.js";
import TransactionLog from "../models/transactionlog.model.js";
import User from "../models/user.model.js";

export const makePayment = async (req, res) => {
  try {
    const { manager_id, booking_id, amount, paymentMethod, tran_id, remark } =
      req.body;
    const manager = await User.findById(manager_id);
    if (!manager) {
      return res.status(404).json({
        success: false,
        message: "Manager not found",
      });
    }
    // Find the BookingInfo based on the provided bookingInfoId
    const bookingInfo = await BookingInfo.findOne({ booking_ids: booking_id });

    if (!bookingInfo) {
      return res.status(404).json({
        success: false,
        message: "BookingInfo not found",
      });
    }
    // // Calculate new paid_amount and total_unpaid_amount
    // const newPaidAmount = bookingInfo.paid_amount + amount;
    // const newUnpaidAmount = Math.max(
    //   0,
    //   bookingInfo.total_unpaid_amount - amount
    // );

    // Update BookingInfo with the new values
    bookingInfo.paid_amount += amount;
    bookingInfo.total_unpaid_amount -= amount;
    bookingInfo.total_balance += amount
    await bookingInfo.save();

    const ownerDashboard = await Dashboard.findOne({
      user_id: manager.parent_id,
    });
    ownerDashboard.total_amount += amount;
    await ownerDashboard.save();

    const managerDashboard = await Dashboard.findOne({
      user_id: manager_id,
    });
    managerDashboard.total_amount += amount;
    await managerDashboard.save();

    // Create a new TransactionLog entry
    const newTransactionLog = new TransactionLog({
      manager_id,
      booking_info_id: bookingInfo._id,
      payment_method: paymentMethod,
      dedicated_to: "hotel",
      tran_id,
      from: bookingInfo.guestName,
      to: manager.username,
      amount: amount,
      remark: remark,
    });

    // Save the new TransactionLog entry
    await newTransactionLog.save();

    res.status(200).json({
      success: true,
      data: {
        bookingInfo: bookingInfo,
        transactionLog: newTransactionLog,
      },
      message: "Payment made successfully",
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

export const cashBack = async (req, res) => {
  try {
    const {
      manager_id,
      bookingInfoId,
      amount,
      paymentMethod,
      tran_id,
      remark,
    } = req.body;

    const currentDate = new Date();

    const manager = await User.findById(manager_id);
    if (!manager) {
      return res.status(404).json({
        success: false,
        message: "Manager not found",
      });
    }
    // Find the BookingInfo based on the provided bookingInfoId
    const bookingInfo = await BookingInfo.findById(bookingInfoId);

    if (!bookingInfo) {
      return res.status(404).json({
        success: false,
        message: "BookingInfo not found",
      });
    }
    bookingInfo.paid_amount -= amount;
    bookingInfo.total_balance -= amount;
    bookingInfo.save();

    const ownerDashboard = await Dashboard.findOne({
      user_id: manager.parent_id,
    });
    ownerDashboard.total_amount -= amount;
    await ownerDashboard.save();

    const managerDashboard = await Dashboard.findOne({
      user_id: manager_id,
    });
    managerDashboard.total_amount -= amount;
    await managerDashboard.save();

    const newTransactionLog = new TransactionLog({
      manager_id,
      booking_info_id: bookingInfoId,
      payment_method: paymentMethod,
      tran_id,
      from: bookingInfo.guestName,
      to: manager.username,
      amount: amount,
      remark: remark,
    });

    // Save the new TransactionLog entry
    await newTransactionLog.save();

    res.status(200).json({
      success: true,
      data: {
        bookingInfo: bookingInfo,
        transactionLog: newTransactionLog,
      },
      message: "Cashback successfully",
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
