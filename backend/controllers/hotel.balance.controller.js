import { BookingInfo } from "../models/Manager/booking.model.js";
import { DashboardTable } from "../models/dashboard.model.js";
import {
  DailySubDashData,
  MonthlySubDashData,
  StaticSubDashData,
} from "../models/subdashboard.model.js";
import TransactionLog from "../models/transactionlog.model.js";
import User from "../models/user.model.js";

export const makePayment = async (req, res) => {
  try {
    const {
      manager_id,
      bookingInfoId,
      amount,
      paymentMethod,
      tran_id,
      remark,
    } = req.body;

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
    // Calculate new paid_amount and total_unpaid_amount
    const newPaidAmount = bookingInfo.paid_amount + amount;
    const newUnpaidAmount = Math.max(
      0,
      bookingInfo.total_unpaid_amount - amount
    );

    // Update BookingInfo with the new values
    bookingInfo.paid_amount = newPaidAmount;
    bookingInfo.total_unpaid_amount = newUnpaidAmount;

    // Save the updated BookingInfo
    await bookingInfo.save();

    // Create a new TransactionLog entry
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
    const date = currentDate.toLocaleDateString();
    const month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = currentDate.getFullYear().toString();

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
    bookingInfo.save();

    const managerDashboardTable = await DashboardTable.findOne({
      user_id: manager_id,
      month_name,
      year,
    });
    managerDashboardTable.total_expense += amount;
    managerDashboardTable.total_profit -= amount;
    managerDashboardTable.save();

    const managerStaticSubDashData = await StaticSubDashData.findOne({
      user_id: manager_id,
    });
    managerStaticSubDashData.total_hotel_expenses += amount;
    managerStaticSubDashData.total_hotel_profit -= amount;
    managerStaticSubDashData.save();

    const managerMonthlySubDashData = await MonthlySubDashData.findOne({
      user_id: manager_id,
      month_name,
      year,
    });
    managerMonthlySubDashData.total_hotel_expenses += amount;
    managerMonthlySubDashData.total_hotel_profit -= amount;
    managerMonthlySubDashData.save();

    const managerDailySubDashData = await DailySubDashData.findOne({
      user_id: manager_id,
      date,
    });
    managerDailySubDashData.today_hotel_expenses += amount;
    managerDailySubDashData.today_hotel_profit -= amount;
    managerDailySubDashData.save();

    // Create a new TransactionLog entry
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
