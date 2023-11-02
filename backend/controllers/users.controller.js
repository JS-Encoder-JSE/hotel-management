import User from "../models/user.model.js";
import Hotel from "../models/hotel.model.js";
import jwt from "jsonwebtoken";

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
    res.status(500).json({ error: error.message });
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
      return res
        .status(403)
        .json({
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

// get login user
export const getLoginUser = async (req, res) => {
  try {
    // If you want to exclude sensitive information like password
    const { userId } = req.user;
    console.log(req.user);
    const user = await User.findById(userId);
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      data: rest,
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
    // Find all users with the role 'owner'
    const owners = await User.find({ role: "owner" });

    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    // Find all users with the role 'manager' and assigned to the owner's hotels
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