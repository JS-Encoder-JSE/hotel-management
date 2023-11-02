import License from "../../models/Admin/license.model.js";
import User from "../../models/user.model.js";

// Create and add a new license to the database
export const addLicense = async (req, res) => {
  try {
    const {
      owner_id,
      owner_name,
      address,
      email,
      phone_no,
      bill_info,
      from_date,
      to_date,
      status,
      hotel_limit,
      payment_method,
      utilities_img,
      trade_license_img,
    } = req.body;
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user.role === "admin" || !user.role === "subadmin") {
      return res
        .status(403)
        .json({ message: "You have no permisssion to create license" });
    }
    const newLicense = new License({
      owner_id,
      owner_name,
      address,
      email,
      phone_no,
      bill_info,
      from_date,
      to_date,
      status,
      hotel_limit,
      payment_method,
      utilities_img,
      trade_license_img,
    });

    // Save the new license to the database
    const savedLicense = await newLicense.save();

    res.status(201).json(savedLicense); // Return the saved license as a response
  } catch (error) {
    res.status(500).json({ error: "Failed to create and add a license" });
  }
};
