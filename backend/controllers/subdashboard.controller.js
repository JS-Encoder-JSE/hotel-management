import { StaticSubDashData } from "../models/subdashboard.model.js";

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
