import {
  DailySubDashData,
  MonthlySubDashData,
  StaticSubDashData,
} from "../models/subdashboard.model.js";

export const addStaticSubDashData = async (req, res) => {
  try {
    // Extract data from the request body
    const { user_id, user_role } = req.body;

    // Create a new instance of StaticSubDashData
    const newStaticSubDashData = new StaticSubDashData({
      user_id,
      user_role,
    });

    // Save the new instance to the database
    await newStaticSubDashData.save();

    // Respond with a success message
    return res
      .status(201)
      .json({ message: "Successfully added static sub-dashboard data" });
  } catch (error) {
    console.error("Error adding static sub-dashboard data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSubDashboardInfo = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const date = currentDate.toISOString();

    const permanent_datas = await StaticSubDashData.findOne({
      user_id: userId,
    });

    if (!permanent_datas) {
      return res.status(404).json({ message: "permanent_datas not found" });
    }
    // Calculate the start date for fetching the last 12 months
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 11);
    const monthly_datas = await MonthlySubDashData.find({
      user_id: userId,
      createdAt: { $gte: startDate, $lte: currentDate },
    });
    const daily_datas = await DailySubDashData.find({
      user_id: userId,
      date,
    });

    res.status(200).json({
      success: true,
      message: "Succesfully fetched subdashboard informations",
      daily_datas: daily_datas,
      permanent_datas: permanent_datas,
      monthly_datas: monthly_datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get dashboard" });
  }
};
