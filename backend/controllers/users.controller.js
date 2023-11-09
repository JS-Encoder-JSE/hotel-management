import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Hotel from "../models/hotel.model.js";
import TransactionLog from "../models/transactionlog.model.js";
import StatusLog from "../models/statuslog.model.js";
import Report from "../models/report.model.js";

// Create a function to handle user creation
export const addUser = async (req, res) => {
  try {
    const { userId } = req.user;
    // Extract user data from the request body
    const {
      username,
      name,
      password,
      role,
      designation,
      shift,
      status,
      address,
      email,
      phone_no,
      emergency_contact,
      salary,
      joining_date,
      assignedHotel,
      images,
    } = req.body;

    const parent = await User.findById(userId);

    if (!parent) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Check if the user making the request has permission to update fields based on hierarchy
    const hierarchy = {
      admin: ["subadmin", "owner", "manager", "employee"],
      subadmin: ["owner", "manager", "employee"],
      owner: ["manager", "employee"],
      manager: ["employee"],
    };

    if (!hierarchy[parent.role]) {
      return res
        .status(403)
        .json({ message: "You have no permission to create ", role });
    }

    // Create a new user instance
    const newUser = new User({
      parent_id: userId,
      username,
      name,
      password,
      role,
      designation,
      shift,
      status,
      address,
      email,
      phone_no,
      emergency_contact,
      salary,
      joining_date,
      assignedHotel,
      images,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message or the created user object
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error(error);
    res
      .status(500)
      .json({ error: "User creation failed", message: error.message });
  }
};

export const addLicense = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      username,
      name,
      password,
      address,
      email,
      phone_no,
      emergency_contact,
      bill_info,
      bill_from,
      bill_to,
      maxHotels,
      payment_method,
      tran_id,
      amount,
      remark,
      images,
    } = req.body;

    const { userId } = req.user;
    const parent = await User.findById(userId);

    if (!parent || (parent.role !== "admin" && parent.role !== "subadmin")) {
      return res
        .status(403)
        .json({ message: "You have no permission to create a license" });
    }

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new owner user
    const newOwner = new User({
      parent_id: userId,
      name,
      username,
      password,
      role: "owner",
      status: "Active",
      address,
      email,
      phone_no,
      emergency_contact,
      bill_info,
      bill_from,
      bill_to,
      maxHotels,
      images,
    });

    // Save the new owner user to the database
    const savedOwner = await newOwner.save({ session });

    // Create a new transaction log entry
    const newTransactionLog = new TransactionLog({
      tran_id,
      payment_method,
      bill_from,
      bill_to,
      from: savedOwner.username,
      to: parent.username,
      amount,
      payment_for: "Purchase",
      remark,
    });

    // Save the transaction log entry to the database
    await newTransactionLog.save({ session });

    // Create a new report object with the data provided in the request body
    const newReport = new Report({
      username,
      phone_no,
      status: "Sold",
      bill_from,
      bill_to,
      deposit_to: parent.username,
      deposit_by: username,
      hotel_limit: maxHotels,
      paid_amount: amount,
      payment_type: payment_method,
    });

    await newReport.save({ session });

    await session.commitTransaction();

    res.status(201).json({ message: "Successfully added license" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: "Failed to add a license" });
  }
};

export const getUsersByParentId = async (req, res) => {
  try {
    const { parent_id } = req.params;
    const { page = 1, limit = 10, role, search, filter } = req.query;

    const parent = await User.findById(parent_id);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    const query = {};
    if (role) {
      query.role = role;
    }
    if (
      ["Active", "Deactive", "Suspended", "Expired", "Deleted"].includes(filter)
    ) {
      query.status = filter;
    }

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const users = await User.paginate(query, options);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

export const addOwner = async (req, res) => {
  try {
    const { username, name, password, maxHotels } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new owner user
    const owner = new User({
      name,
      username,
      password,
      role: "owner",
      maxHotels,
    });

    await owner.save();

    res.status(201).json({ message: "Owner added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add owner" });
  }
};

export const addManager = async (req, res) => {
  try {
    const {
      username,
      name,
      password,
      assignedHotelId,
      address,
      email,
      phone_no,
      salary,
      joining_date,
      images,
    } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new manager user
    const manager = new User({
      username,
      name,
      password,
      role: "manager",
      assignedHotel: assignedHotelId,
      address,
      email,
      phone_no,
      salary,
      joining_date,
      images,
    });

    await manager.save();

    // Update the assigned hotel to include the manager
    await Hotel.findByIdAndUpdate(assignedHotelId, {
      $push: { managers: manager._id },
    });

    res.status(201).json({
      message: "Manager added and assigned to the hotel successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const {
      username,
      name,
      password,
      designation,
      shift,
      assignedHotelId,
      address,
      email,
      phone_no,
      salary,
      joining_date,
      images,
    } = req.body;
    const { userId } = req.user;

    const manager = await User.findById(userId);

    if (!manager) {
      return res.status(403).json({ message: "You are not a manager" });
    }
    if (!manager.assignedHotelId === assignedHotelId) {
      return res.status(403).json({
        message: "You have no permission to add employee in this hotel",
      });
    }
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new manager user
    const employee = new User({
      username,
      name,
      password,
      designation,
      shift,
      role: "employee",
      assignedHotel: assignedHotelId,
      address,
      email,
      phone_no,
      salary,
      joining_date,
      images,
    });

    await employee.save();

    // Update the assigned hotel to include the manager
    await Hotel.findByIdAndUpdate(assignedHotelId, {
      $push: { managers: employee._id },
    });

    res.status(201).json({
      message: "Manager added and assigned to the hotel successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSuperUser = async (req, res) => {
  try {
    const username = "superuser";
    const password = "superuserpassword";

    // Check if a superuser with the same username already exists
    const existingSuperUser = await User.findOne({ username });
    if (existingSuperUser) {
      console.log("Superuser already exists.");
      res.status(400).json("already existed");
      return;
    }

    // Create a new superuser
    const superuser = new User({
      username,
      password,
      role: "superuser",
    });

    await superuser.save();
    res.status(200).json({ message: "Superuser created", data: superuser });
    console.log("Superuser created successfully.");
  } catch (error) {
    console.error("Error creating superuser:", error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.role === "employee") {
      return res
        .status(403)
        .json({ message: "You have no permission to login" });
    }
    if (["Expired", "Deactive", "Deleted"].includes(user.status)) {
      return res
        .status(403)
        .json({ message: "You have no permission to login" });
    }
    // Compare the provided password with the hashed password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// get login user
export const getLoginUser = async (req, res) => {
  try {
    // If you want to exclude sensitive information like password
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      data: user,
      message: "Logged in user retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const getOwners = async (req, res) => {
  try {
    // Find all user with the role 'owner'
    const owners = await User.find({ role: "owner" });
    if (!owners) {
      return res.status(404).json({ message: "Owners not found" });
    }
    res.json(owners);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to retrieve user information",
    });
  }
};

export const getManagersByOwner = async (req, res) => {
  try {
    const ownerId = req.user.userId; // Assuming you pass the owner's ID as a route parameter
    const { page = 1, limit = 10, filter, search } = req.query;
    // Find the owner's user document
    const owner = await User.findOne({ _id: ownerId, role: "owner" });
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    const query = {
      role: "manager",
      assignedHotel: { $in: owner.assignedHotels },
    };
    if (
      filter === "Active" ||
      filter === "Deactive" ||
      filter === "Suspended"
    ) {
      query.status = filter;
    }
    if (search) {
      query.username = { $regex: search, $options: "i" };
    }
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    // Find all user with the role 'manager' and assigned to the owner's hotels
    const managers = await User.paginate(query, options);

    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getManagerById = async (req, res) => {
  try {
    const managerId = req.params.managerId; // Assuming you pass the manager's ID as a route parameter

    // Find the manager by ID
    const manager = await User.findOne({ _id: managerId, role: "manager" });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getUserByHotel = async (req, res) => {
//   try {
//     const {userId} = req.user;
//     const { hotel_id, role, page, limit, search, status } = req.query;

//     const user = await User.findById(userId);

//     if (!user.assignedHotelId === hotel_id) {
//       return res.status(403).json({ message:"You have no permission to get info"});
//     }
//     const query = { assignedHotelId: hotel_id };
//     if (role) {
//       query.role = role;
//     }
//     // if (filter === "Waiter" || filter === "House_Keeper") {
//     //   query.designation = filter;
//     // }
//     if (status) {
//       query.status = status;
//     }
//     if (search) {
//       query.name = { $regex: search, $options: "i" };
//     }

//     const options = {
//       page: parseInt(page, 10),
//       limit: parseInt(limit, 10),
//     };
//     const items = await User.paginate(query, options);
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve items" });
//   }
// };
// export const getUserByHotel = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const { hotel_id, role, page, limit, search, status } = req.query;

//     const user = await User.findById(userId);

//     if (!user.assignedHotel.includes(hotel_id)) {
//       return res.status(403).json({ message: "You have no permission to get info" });
//     }

//     const query = { assignedHotel: hotel_id };
//     if (role) {
//       query.role = role;
//     }
//     if (status) {
//       query.status = status;
//     }
//     if (search) {
//       query.name = { $regex: search, $options: "i" };
//     }

//     const options = {
//       page: parseInt(page, 10),
//       limit: parseInt(limit, 10),
//     };

//     const items = await User.paginate(query, options);
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve items" });
//   }
// };

// Create and add a new license to the database
// export const addLicense = async (req, res) => {
//   try {
//     const {
//       username,
//       name,
//       password,
//       address,
//       email,
//       phone_no,
//       bill_info,
//       bill_from,
//       bill_to,
//       maxHotels,
//       payment_method,
//       tran_id,
//       amount,
//       remark,
//       utilities_img,
//       trade_lic_img,
//     } = req.body;

//     const { userId } = req.user;
//     const parent = await User.findById(userId);
//     console.log(parent);
//     if (!parent.role === "admin" || !parent.role === "subadmin") {
//       return res
//         .status(403)
//         .json({ message: "You have no permisssion to create license" });
//     }
//     // Check if a user with the same username already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }
//     const newOwner = new User({
//       name,
//       username,
//       password,
//       role:"owner",
//       status: "Active",
//       address,
//       email,
//       phone_no,
//       bill_info,
//       bill_from,
//       bill_to,
//       maxHotels,
//       utilities_img,
//       trade_lic_img,
//     });
//     console.log("aise");
//     // Save the new license to the database
//     const savedOwner = await newOwner.save();
//     console.log("savedowner");
//     const newTransectionLog = new TransactionLog({
//       tran_id,
//       payment_method,
//       from: savedOwner.username,
//       to: parent.username,
//       amount,
//       payment_for: "Purchase",
//       remark,
//     });
//     await newTransectionLog.save();
//     res.status(201).json({ massage: "Successfully added license" }); // Return the saved license as a response
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add a license" });
//   }
// };
// export const renewLicense = async (req, res) => {
//   try {
//     const loginUserId = req.user.userId; // Assuming userId is part of the URL
//     const {
//       user_id,
//       tran_id,
//       status,
//       payment_method,
//       amount,
//       bill_from,
//       bill_to,
//       remark,
//     } = req.body;

//     // Check if the provided status is valid
//     if (!status === "Active") {
//       return res.status(400).json({ message: "Invalid status value" });
//     }
//     const parent = await User.findById(loginUserId);

//     if (!parent || (parent.role !== "admin" && parent.role !== "subadmin")) {
//       return res
//         .status(403)
//         .json({ message: "You have no permission to create a license" });
//     }

//     // Find the user by their ID
//     const user = await User.findById(user_id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!["Expired", "Suspended"].includes(user.status)) {
//       return res
//         .status(400)
//         .json({ message: "This Licese is not Expired or Suspended" });
//     }

//     // Create a new StatusLog instance
//     const newStatusLog = new StatusLog({
//       changed_from: parent.username,
//       changed_for: user.username,
//       pre_status: user.status,
//       updated_status: status,
//       remark: remark,
//     });
//     await newStatusLog.save();

//     const newTransactionLog = new TransactionLog({
//       tran_id:tran_id,
//       payment_method:payment_method,
//       from:user.username,
//       to: parent.username,
//       amount: amount,
//       payment_for: "Renew",
//       remark:remark,
//     });
//     await newTransactionLog.save();

//     // Update the user's status
//     user.status = status;
//     user.bill_from = bill_from;
//     user.bill_to = bill_to;

//     // Save the updated user document
//     await user.save();

//     res.status(200).json({ message: "User status updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update user status" });
//   }
// };

export const renewLicense = async (req, res) => {
  try {
    const loginUserId = req.user.userId; // Assuming userId is part of the URL
    const {
      user_id,
      tran_id,
      payment_method,
      amount,
      bill_from,
      bill_to,
      remark,
    } = req.body;

    const parent = await User.findById(loginUserId);

    if (!parent || (parent.role !== "admin" && parent.role !== "subadmin")) {
      return res
        .status(403)
        .json({ message: "You have no permission to renew a license" });
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.role === "owner") {
      return res.status(403).json({ message: "This user isn't a owner" });
    }

    if (!["Expired", "Suspended"].includes(user.status)) {
      return res
        .status(400)
        .json({ message: "This license is not Expired or Suspended" });
    }

    // Create a new StatusLog instance
    const newStatusLog = new StatusLog({
      changed_from: parent.username,
      changed_for: user.username,
      pre_status: user.status,
      updated_status: "Active",
      remark: remark,
    });

    // Create a new TransactionLog instance
    const newTransactionLog = new TransactionLog({
      tran_id,
      payment_method,
      bill_from,
      bill_to,
      from: user.username,
      to: parent.username,
      amount,
      payment_for: "Renew",
      remark,
    });

    // Create a new report object with the data provided in the request body
    const newReport = new Report({
      username: user.username,
      phone_no: user.phone_no,
      status: "Renew",
      bill_from,
      bill_to,
      deposit_to: parent.username,
      deposit_by: user.username,
      hotel_limit: user.maxHotels,
      paid_amount: amount,
      payment_type: payment_method,
    });

    // Use a transaction to ensure data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await newStatusLog.save({ session });
      await newTransactionLog.save({ session });
      await newReport.save({ session });

      // Update the user's status
      user.status = "Active";
      user.bill_from = bill_from;
      user.bill_to = bill_to;
      user.last_renew = new Date().toISOString();

      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: "License renew successfully" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      console.error(error);
      res.status(500).json({ message: "Failed to update user status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user status" });
  }
};

// export const updateStatus = async (req, res) => {
//   try {
//     const loginUserId = req.user.userId; // Assuming userId is part of the URL
//     const { user_id, status, extended_time, remark } = req.body;

//     const parent = await User.findById(loginUserId);

//     if (!parent || (parent.role !== "admin" && parent.role !== "subadmin")) {
//       return res
//         .status(403)
//         .json({ message: "You have no permission to create a license" });
//     }
//     // Check if the provided status is valid
//     if (!["Active", "Deactive", "Suspended"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     // Find the user by their ID
//     const user = await User.findById(user_id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create a new StatusLog instance
//     const newStatusLog = new StatusLog({
//       changed_from: parent.username,
//       changed_for: user.username,
//       pre_status: user.status,
//       updated_status: status,
//       remark: remark,
//     });
//     await newStatusLog.save();

//     if (status === "Suspended" && extended_time) {
//       if (!user.status === "Expired") {
//         return res.status(400).json({ message: "Invalid status value" });
//       }
//       user.extended_time = extended_time;
//     }
//     if (status === "Active") {
//       if (!user.status === "Deactive") {
//         return res.status(400).json({ message: "Invalid status value" });
//       }
//     }
//     // Update the user's status
//     user.status = status;

//     // Save the updated user document
//     await user.save();

//     res.status(200).json({ message: "User status updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update user status" });
//   }
// };

export const updateStatus = async (req, res) => {
  try {
    const loginUserId = req.user.userId; // Assuming userId is part of the URL
    const { user_id, status, extended_time, remark } = req.body;

    // Find the user by their ID
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hierarchy = {
      admin: ["subadmin", "owner", "manager", "employee"],
      subadmin: ["owner", "manager", "employee"],
      owner: ["manager", "employee"],
      manager: ["employee"],
    };

    // Check if the login user's role allows them to update the target user's status
    const parent = await User.findById(loginUserId);
    const allowedRoles = hierarchy[parent.role];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "You have no permission to update the status of this user",
      });
    }

    // Check if the provided status is valid
    if (!["Active", "Deactive", "Suspended", "Deleted"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (extended_time) {
      // Create a new StatusLog instance
      const newStatusLog = new StatusLog({
        changed_from: parent.username,
        changed_for: user.username,
        extended_time: extended_time[0],
        pre_status: user.status,
        updated_status: status,
        remark: remark || "",
      });
      await newStatusLog.save();
    } else {
      // Create a new StatusLog instance
      const newStatusLog = new StatusLog({
        changed_from: parent.username,
        changed_for: user.username,
        pre_status: user.status,
        updated_status: status,
        remark: remark || "",
      });
      await newStatusLog.save();
    }

    if (status === "Suspended" && extended_time) {
      if (user.status !== "Expired") {
        return res.status(400).json({ message: "Invalid status value" });
      }
      user.extended_time = extended_time;
    } else if (status === "Active") {
      if (user.status !== "Deactive" && user.status !== "Deleted") {
        return res.status(400).json({ message: "Invalid status value" });
      }
    }

    // Update the user's status
    user.status = status;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user status" });
  }
};

export const getOwnersByAdmin = async (req, res) => {
  try {
    const { userId } = req.user;
    const { page = 1, limit = 10, search, filter } = req.query;

    const parent = await User.findById(userId);
    if (!parent) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!parent.role === "admin") {
      return res
        .status(403)
        .json({ message: "You have no permission to get info" });
    }

    const query = { role: "owner" };

    if (
      ["Active", "Deactive", "Suspended", "Expired", "Deleted"].includes(filter)
    ) {
      query.status = filter;
    }

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const users = await User.paginate(query, options);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve items" });
  }
};

export const updateUserField = async (req, res) => {
  try {
    const { userId } = req.user;
    const { user_id, field, value } = req.body;

    const parent = await User.findById(userId);

    if (!parent) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user making the request has permission to update fields based on hierarchy
    const hierarchy = {
      admin: ["subadmin", "owner", "manager", "employee"],
      subadmin: ["owner", "manager", "employee"],
      owner: ["manager", "employee"],
      manager: ["employee"],
    };

    if (!hierarchy[parent.role]) {
      return res
        .status(403)
        .json({ message: "You have no permission to update fields" });
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's role allows them to update the specified field
    if (!hierarchy[parent.role].includes(user.role)) {
      return res.status(403).json({
        message: "You have no permission to update this field for the user",
      });
    }

    // Update the user's field with the new value
    user[field] = value;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "User field updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user field" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { user_id, role, page = 1, limit = 10, search, filter } = req.query;

    const parent = await User.findById(user_id);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    // Check if the user making the request has permission to get user information
    const hierarchy = {
      admin: ["subadmin", "owner", "manager", "employee"],
      subadmin: ["owner", "manager", "employee"],
      owner: ["manager", "employee"],
      manager: ["employee"],
    };

    if (!hierarchy[parent.role]) {
      return res
        .status(403)
        .json({ message: "You have no permission to get user information" });
    }

    const query = { parent_id: user_id, role: role };

    if (["Active", "Deactive", "Suspended", "Expired"].includes(filter)) {
      query.status = filter;
    }

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    // Exclude users with status "Deleted"
    query.status = { $ne: "Deleted" };

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    // Use Mongoose pagination to retrieve users
    const users = await User.paginate(query, options);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.user;
    const { user_id } = req.params;

    const parent = await User.findById(userId);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    // Check if the user making the request has permission to get user information
    const hierarchy = {
      admin: ["subadmin", "owner", "manager", "employee"],
      subadmin: ["owner", "manager", "employee"],
      owner: ["manager", "employee"],
      manager: ["employee"],
    };

    if (!hierarchy[parent.role]) {
      return res
        .status(403)
        .json({ message: "You have no permission to get user information" });
    }

    const user = await User.findById(user_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use the populate() method to populate the 'assignedHotel' field
    await User.populate(user, { path: "assignedHotel" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user information" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id; // Assuming you get the user ID from the request parameters
    const updates = req.body; // Assuming you receive the updates in the request body

    // If the updates include a new password, hash it before updating
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    // Find the user by ID and update the fields provided in the request body
    const user = await User.findByIdAndUpdate(user_id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Update user successful" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
