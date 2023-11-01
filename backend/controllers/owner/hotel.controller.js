import Hotel from "../../models/hotel.model.js";

// Controller to add a new hotel
export const addHotel = async (req, res) => {
  try {
    const { name, address, email, phone_no, license, branch_name, } =
      req.body;

    // Create a new hotel instance based on the Hotel model
    const newHotel = new Hotel({
      name,
      address,
      email,
      phone_no,
      license,
      branch_name,
    });

    // Save the new hotel to the database
    const savedHotel = await newHotel.save();

    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to add a hotel" });
  }
};

// Controller to update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id; // Assuming you pass the hotel ID in the URL
    const updateFields = req.body; // Fields to be updated

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update provided" });
    }

    // Use the `findByIdAndUpdate` method to update the hotel by ID
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: updateFields }, // Use $set to update only the provided fields
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel" });
  }
};

// Controller to delete a hotel by ID
export const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id; // Assuming you pass the hotel ID in the URL

    // Use the `findByIdAndDelete` method to delete the hotel by ID
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel" });
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
      res.status(500).json({ error: "Failed to retrieve items" });
    }
  };
  