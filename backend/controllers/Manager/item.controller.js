import Item from "../../models/Manager/item.model.js";
import Room from "../../models/Manager/room.model.js";
import mongoose from "mongoose";

// Controller to add a new item
export const addItem = async (req, res) => {
  try {
    const { hotel_id, name, description } = req.body;
    const newItem = new Item({ hotel_id, name, description });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add item" });
  }
};

// Controller to partially update an existing item by its ID using PATCH
export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.item_id; // Assuming you pass the item ID in the URL
    const updateFields = req.body; // Fields to be updated

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update provided" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { $set: updateFields }, // Use $set to update only the provided fields
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

// Controller to delete an item by its ID
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.item_id; // Assuming you pass the item ID in the URL
    const deletedItem = await Item.findByIdAndRemove(itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(204).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

// Controller to get all items with filter options and pagination
export const getItemsByHotelId = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const { page = 1, limit = 10, filter, search } = req.query;
    const query = { hotel_id: hotel_id };

    if (["Available", "Unavailable"].includes(filter)) {
      query.status = filter;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    const items = await Item.paginate(query, options);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};
export const assignItemsToRoom = async (req, res) => {
  try {
    const { room_id, item_ids } = req.body;

    // Check if the provided room exists
    const existingRoom = await Room.findById(room_id);
    if (!existingRoom) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    // Check if the provided items exist
    const existingItems = await Item.find({
      _id: { $in: item_ids.map((id) => mongoose.Types.ObjectId(id)) },
    });
    if (existingItems.length !== item_ids.length) {
      return res.status(400).json({
        success: false,
        error: "One or more items are invalid",
      });
    }

    // Update the room_ids field in the items
    const itemIdsAsObjectIds = item_ids.map((id) =>
      mongoose.Types.ObjectId(id)
    );
    await Item.updateMany(
      { _id: { $in: itemIdsAsObjectIds } },
      { $push: { room_ids: mongoose.Types.ObjectId(room_id) } }
    );

    res.status(200).json({
      success: true,
      message: "Items assigned to room successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
