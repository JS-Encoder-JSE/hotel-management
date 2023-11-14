import mongoose from "mongoose";
import ManagerReport from "../../models/Manager/report.model.js";

export const getReportsByHotelId = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const {
      page = 1,
      limit = 10,
      search,
      filter,
      fromDate,
      toDate,
    } = req.query;

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
