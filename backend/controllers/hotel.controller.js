import mongoose from "mongoose";
import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import { Dashboard, DashboardTable } from "../models/dashboard.model.js";

// Controller to add a new hotel
// export const addHotel = async (req, res) => {
//   try {
//     const { owner_id, name, branch_name, address, email, phone_no, managers } =
//       req.body;

//     // Validate if owner_id is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(owner_id)) {
//       return res.status(400).json({ message: "Invalid owner_id" });
//     }

//     const owner = await User.findOne({ _id: owner_id, role: "owner" });

//     if (!owner) {
//       return res.status(404).json({ message: "Owner not found" });
//     }

//     // Check if owner's maxHotels limit is reached
//     if (owner.maxHotels <= owner.assignedHotel.length) {
//       return res
//         .status(403)
//         .json({ message: "Please upgrade your package to add more hotels" });
//     }

//     // Validate if managers is an array of valid ObjectIds
//     if (!Array.isArray(managers) || managers.length === 0) {
//       return res.status(400).json({ message: "Invalid managers array" });
//     }

//     const manager = await User.find({
//       _id: { $in: managers },
//       role: "manager",
//     });

//     if (manager.length !== managers.length) {
//       return res.status(404).json({ message: "Manager not found" });
//     }

//     // Create a new hotel instance with the provided data
//     const newHotel = new Hotel({
//       owner_id,
//       name,
//       branch_name,
//       address,
//       email,
//       phone_no,
//       managers,
//     });

//     // Save the new hotel to the database
//     const savedHotel = await newHotel.save();

//     // Assign the hotel to the managers
//     for (const managerId of managers) {
//       const manager = await User.findById(managerId);
//       manager.assignedHotel.push(savedHotel._id);
//       await manager.save();
//     }

//     res.status(201).json(savedHotel); // Respond with the created hotel data
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to add a new hotel" });
//   }
// };

export const addHotel = async (req, res) => {
  try {
    const {
      owner_id,
      name,
      branch_name,
      address,
      email,
      username,
      password,
      phone_no,
    } = req.body;

    // Check if the owner exists and has available slots for a new hotel
    const owner = await User.findOne({ _id: owner_id, role: "owner" });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new hotel instance with the provided data
    const newHotel = new Hotel({
      owner_id,
      name,
      branch_name,
      address,
      email,
      phone_no,
    });

    // Save the new hotel to the database
    const savedHotel = await newHotel.save();

    // Create a new user instance
    const newUser = new User({
      parent_id: owner_id,
      username,
      name: name + " " + branch_name,
      password,
      role: "manager",
      assignedHotel: [savedHotel._id],
    });

    // Save the user to the database
    const savedNewUser = await newUser.save();
    savedHotel.manager_acc = savedNewUser._id;
    await savedHotel.save();

    const newDashboard = new Dashboard({
      user_id: savedNewUser._id,
      user_role: "manager",
    });
    await newDashboard.save();
    // Create a new dashboard table entry
    const newDashboardTable = new DashboardTable({
      user_id: savedNewUser._id,
      user_role: "manager",
    });
    // Save the new dashboard table to the database
    await newDashboardTable.save();
    // Update the owner's assignedHotel array
    owner.assignedHotel.push(savedHotel._id);
    await owner.save();

    res.status(201).json({ message: "Successfully added hotel" }); // Respond with the created hotel data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add a new hotel" });
  }
};
export const getHotels = async (req, res) => {
  try {
    const {
      parent_id,
      user_id,
      page = 1,
      limit = 10,
      search,
      filter,
    } = req.query;

    const owner = await User.findById(user_id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    if (parent_id) {
      const parent = await User.findById(parent_id);
      if (!parent) {
        return res.status(404).json({ message: "Parent not found" });
      }
      if (!["admin", "subadmin"].includes(parent.role)) {
        return res
          .status(403)
          .json({ message: "You have no permission to get info" });
      }
    }

    const query = { owner_id: user_id };

    if (filter) {
      query.status = filter;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { branch_name: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const hotels = await Hotel.paginate(query, options);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve hotels" });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const { hotel_id } = req.params;

    const hotel = await Hotel.findById(hotel_id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve hotel information" });
  }
};
export const getHotelsByManagerId = async (req, res) => {
  try {
    const { manager_id } = req.params; // Assuming managerId is in the URL parameters

    // Use Mongoose to find hotels that have a manager with the specified ID
    const hotels = await Hotel.find({ "managers._id": manager_id }).select(
      "-managers"
    );

    if (!hotels || hotels.length === 0) {
      return res
        .status(404)
        .json({ message: "No hotels found for this manager ID" });
    }

    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels by manager ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// Controller to update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const hotel_id = req.params.hotel_id; // Assuming you pass the hotel ID in the URL
    const updateFields = req.body; // Fields to be updated

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    // Use the `findByIdAndUpdate` method to update the hotel by ID
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotel_id,
      { $set: updateFields }, // Use $set to update only the provided fields
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Successfully updated hotel" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update hotel" });
  }
};

// Controller to delete a hotel by ID
export const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id; // Assuming you pass the hotel ID in the URL

    // Use the `findByIdAndDelete` method to delete the hotel by ID
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hotel" });
  }
};

// Controller to get all employees with filter options and pagination
export const getAllHotels = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    const items = await Hotel.paginate(query, options);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve items" });
  }
};
