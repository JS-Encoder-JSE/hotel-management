import Item from "../../models/Manager/item.model.js";

// Controller to add a new item
export const addItem = async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const newItem = new Item({ name, description, quantity, stock:quantity, use:0 });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
};

// Controller to partially update an existing item by its ID using PATCH
export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id; // Assuming you pass the item ID in the URL
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
    const itemId = req.params.id; // Assuming you pass the item ID in the URL
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
export const getAllItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, stock, search } = req.query;
    const query = {};

    if (stock === "in_stock") {
      query.stock = { $gt: 0 }; // Fetch items with stock greater than 0
    }
    if (stock === "out_of_stock") {
      query.stock = 0; // Assuming you have a "status" field in your Item schema
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
