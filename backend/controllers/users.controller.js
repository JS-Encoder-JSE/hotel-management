import User from "../models/user.model.js";
import Hotel from "../models/hotel.model.js";
import jwt from "jsonwebtoken";

export const addOwner = async (req, res) => {
  try {
    const { username, password, maxHotels } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new owner user
    const owner = new User({
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
    const { username, password, assignedHotelId } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new manager user
    const manager = new User({
      username,
      password,
      role: "manager",
      assignedHotel: assignedHotelId,
    });

    await manager.save();

    // Update the assigned hotel to include the manager
    await Hotel.findByIdAndUpdate(assignedHotelId, {
      $push: { managers: manager._id },
    });

    res
      .status(201)
      .json({
        message: "Manager added and assigned to the hotel successfully",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSuperUser = async () => {
  try {
    const username = "superuser";
    const password = "superuserpassword";

    // Check if a superuser with the same username already exists
    const existingSuperUser = await User.findOne({ username });
    if (existingSuperUser) {
      console.log("Superuser already exists.");
      return;
    }

    // Create a new superuser
    const superuser = new User({
      username,
      password,
      role: "superuser",
    });

    await superuser.save();

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
    const token = jwt.sign({ userId: user._id }, "jkncaiyecnijn8c98acnon23bn", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getOwners = async (req, res) => {
  try {
    // Find all users with the role 'owner'
    const owners = await User.find({ role: 'owner' });

    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getManagersByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId; // Assuming you pass the owner's ID as a route parameter

    // Find the owner's user document
    const owner = await User.findOne({ _id: ownerId, role: 'owner' });

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    // Find all users with the role 'manager' and assigned to the owner's hotels
    const managers = await User.find({ role: 'manager', assignedHotel: { $in: owner.assignedHotels } });

    res.json(managers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getManagerById = async (req, res) => {
  try {
    const managerId = req.params.managerId; // Assuming you pass the manager's ID as a route parameter

    // Find the manager by ID
    const manager = await User.findOne({ _id: managerId, role: 'manager' });

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
