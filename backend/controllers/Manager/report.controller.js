import mongoose from "mongoose";
import ManagerReport from "../../models/Manager/report.model.js";
import User from "../../models/user.model.js";

export const getReportsByHotelId = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      filter,
      fromDate,
      toDate,
    } = req.query;

    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    const query = { hotel_id };

    // Add search criteria if provided
    if (search) {
      query.guestName = { $regex: search, $options: "i" };
    }

    // Add filter criteria if provided
    if (["Cash", "Card", "Mobile_Banking"].includes(filter)) {
      query.payment_method = filter;
    }

    // Add date range criteria if provided
    if (fromDate && toDate) {
      query.checked_in = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    // Use Mongoose pagination to retrieve reports
    const reports = await ManagerReport.paginate(query, options);
    const totalPaidAmount = await ManagerReport.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$paid_amount" } } },
    ]);

    // Extract the total value from the array
    const totalPaidAmountValue = totalPaidAmount.length > 0 ? totalPaidAmount[0].total : 0;

    // Assign the total value directly
    reports.total_paid_amount = totalPaidAmountValue;

    res.status(200).json({
      success: true,
      data: reports,
      message: "Reports retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error. Check your request data.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getReportsByDate = async (req, res) => {
  try {
    const { date, hotel_id, page = 1, limit = 10 } = req.query;

    // Build the query object based on the provided filters
    const query = { hotel_id };

    if (date) {
      // Check if the date is in a valid format
      const isValidDate = !isNaN(Date.parse(date));

      if (!isValidDate) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format. Please provide a valid date.",
        });
      }

      // Convert date to a Date object and set time range for the entire day
      const startDate = new Date(date);
      startDate.setHours(12, 0, 0, 0);
      startDate.toISOString(); // Set the time to the beginning of the day
      console.log(startDate);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(11, 59, 59, 59);
      endDate.toISOString(); // Set the end date to the next day
      console.log(endDate);

      // Add a createdAt filter to match orders created between start and end dates
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    // Find orders without pagination and sort by createdAt in descending order
    const reports = await ManagerReport.paginate(query, options);
    return res.status(200).json({
      success: true,
      data: reports,
      message: "Food orders retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching food orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
