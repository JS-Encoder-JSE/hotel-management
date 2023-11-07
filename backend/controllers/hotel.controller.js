import mongoose from "mongoose";
import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";

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
      phone_no,
      managers,
      rooms,
    } = req.body;

    // Check if the owner exists and has available slots for a new hotel
    const owner = await User.findOne({ _id: owner_id, role: "owner" });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    if (owner.maxHotels <= owner.assignedHotel.length) {
      return res
        .status(403)
        .json({ message: "Please upgrade your package to add more hotels" });
    }
    // Validate if managers is an array of valid ObjectIds
    if (!Array.isArray(managers) || managers.length === 0) {
      return res.status(400).json({ message: "Invalid managers array" });
    }

    const manager = await User.find({
      _id: { $in: managers },
      role: "manager",
    });

    if (manager.length !== managers.length) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Create a new hotel instance with the provided data
    const newHotel = new Hotel({
      owner_id,
      name,
      branch_name,
      address,
      email,
      phone_no,
      managers,
      rooms,
    });

    // Save the new hotel to the database
    const savedHotel = await newHotel.save();

    // Update the owner's assignedHotel array
    owner.assignedHotel.push(savedHotel._id);
    await owner.save();
    // Assign the hotel to the managers
    for (const managerId of managers) {
      const manager = await User.findById(managerId);
      manager.assignedHotel.push(savedHotel._id);
      await manager.save();
    }

    res.status(201).json(savedHotel); // Respond with the created hotel data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add a new hotel" });
  }
};
export const getHotels = async (req, res) => {
  try {
    const { userId } = req.user;
    const { page = 1, limit = 10, search } = req.query;

    const parent = await User.findById(userId);
    if (!parent) {
      return res.status(404).json({ message: "Owner not found" });
    }
    if (!parent.role === "Owner") {
      return res
        .status(403)
        .json({ message: "You have no permission to get info" });
    }

    const query = { owner_id: userId };

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
    res.status(500).json({ error: "Failed to retrieve hotels" });
  }
};
// Controller to update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id; // Assuming you pass the hotel ID in the URL
    const updateFields = req.body; // Fields to be updated

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    // Use the `findByIdAndUpdate` method to update the hotel by ID
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: updateFields }, // Use $set to update only the provided fields
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(updatedHotel);
  } catch (error) {
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
