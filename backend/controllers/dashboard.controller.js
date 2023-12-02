import {
  CheckInfo,
  Dashboard,
  DashboardTable,
} from "../models/dashboard.model.js";
import { StaticSubDashData } from "../models/subdashboard.model.js";
import User from "../models/user.model.js";

export const addDashboard = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const currentDate = new Date();
    const month_name = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear().toString();

    // Find the user based on userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a dashboard with the same month and year already exists
    const existingDashboard = await Dashboard.findOne({
      user_id: userId,
    });

    if (existingDashboard) {
      return res.status(400).json({
        message: "Dashboard for the current month and year already exists",
      });
    }

    // Set the user_role based on the user data
    const user_role = user.role || "defaultUserRole";

    // Create a new dashboard entry
    const newDashboard = new Dashboard({
      user_id: userId,
      user_role,
      // Add other properties based on your request body
    });

    // Save the new dashboard to the database
    await newDashboard.save();

    res.status(201).json({ message: "Successfully added dashboard" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add a dashboard" });
  }
};

export const addDashboardTable = async (req, res) => {
  try {
    const userId = req.params.user_id; // Assuming userId is in the route parameters
    const currentDate = new Date();
    const month_name = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear().toString();

    // Find the user based on userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a dashboard with the same month and year already exists
    const existingDashboardTable = await DashboardTable.findOne({
      user_id: userId,
      month_name: month_name,
      year: year,
    });

    if (!existingDashboardTable) {
      return res.status(400).json({
        message:
          "Dashboard not found for the current month and year. Create a dashboard first.",
      });
    }

    // Set the user_role based on the user data
    const user_role = user.role || "defaultUserRole";

    // Create a new dashboard table entry
    const newDashboardTable = new DashboardTable({
      user_id: userId,
      user_role,
      // Add other properties based on your request body
    });

    // Save the new dashboard table to the database
    await newDashboardTable.save();

    res.status(201).json({ message: "Successfully added dashboard table" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add a dashboard table" });
  }
};

// Get dashboard by user ID
export const getDashboardByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const dashboard = await Dashboard.findOne({ user_id: userId });

    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    res.status(200).json(dashboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get dashboard" });
  }
};

// Get dashboard table by filters (user_id, user_role, month_name, year)
export const getDashboardTable = async (req, res) => {
  try {
    const { user_id, user_role, date } = req.query;

    const filters = { user_id, user_role };

    if (date) {
      filters.date = date;
    }

    const dashboardTable = await DashboardTable.findOne(filters, "table_data");

    if (!dashboardTable) {
      return res.status(404).json({ message: "Dashboard table not found" });
    }

    res.status(200).json(dashboardTable.table_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get dashboard table" });
  }
};

// Get check info by filters (user_id, user_role, date)
export const getCheckInfo = async (req, res) => {
  try {
    const { user_id, user_role, date } = req.query;

    const filters = { user_id, user_role };

    if (date) {
      filters.date = date;
    }

    const checkInfo = await CheckInfo.findOne(filters);

    if (!checkInfo) {
      return res.status(404).json({ message: "Check info not found" });
    }

    res.status(200).json(checkInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get check info" });
  }
};

// Get dashboard by user ID
export const getDashboardInfo = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const dashboard = await Dashboard.findOne({ user_id: userId });

    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    // Calculate the start date for fetching the last 12 months
    const startDate = new Date(currentDate); 
    startDate.setMonth(currentDate.getMonth() - 11);
    console.log(startDate);
    console.log(currentDate);
    const dashboardTable = await DashboardTable.find({
      user_id: userId,
      createdAt: { $gte: startDate, $lte: currentDate },
    });
    if (!dashboardTable) {
      return res.status(404).json({ message: "Dashboard table not found" });
    }
    const checkInfo = await CheckInfo.find({
      user_id: userId,
      date,
    });
    const overall_datas = {};
    if (user.role === "manager") {
      const permanent_datas = await StaticSubDashData.findOne({
        user_id: userId,
      });
      overall_datas.total_restaurant_expenses =
        permanent_datas.total_restaurant_expenses;
      overall_datas.total_restaurant_income =
        permanent_datas.total_restaurant_income;
      overall_datas.total_restaurant_profit =
        permanent_datas.total_restaurant_profit;
      overall_datas.total_hotel_expenses = permanent_datas.total_hotel_expenses;
      overall_datas.total_hotel_income = permanent_datas.total_hotel_income;
      overall_datas.total_hotel_profit = permanent_datas.total_hotel_profit;
      overall_datas.total_net_profit =
        permanent_datas.total_hotel_profit +
        permanent_datas.total_restaurant_profit;
    }

    res.status(200).json({
      success: true,
      message: "Succesfully fetched dashboard informations",
      daily_datas: checkInfo,
      permanent_datas: dashboard,
      monthly_datas: dashboardTable,
      overall_datas: overall_datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get dashboard" });
  }
};
