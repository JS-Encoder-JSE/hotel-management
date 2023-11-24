import Expense from "../models/expense.model.js"; // Adjust the path based on your project structure

export const addExpense = async (req, res) => {
  try {
    const { hotel_id, date, expendedfor, items } = req.body;

    // Validate the request body
    if (!date || !items || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid request. Date and items are required." });
    }

    // Create a new expense instance
    const newExpense = new Expense({
      hotel_id,
      date,
      expendedfor,
      items,
    });

    // Save the expense to the database
    await newExpense.save();

    return res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to partially update an existing item by its ID using PATCH
export const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id; // Assuming you pass the item ID in the URL
    const updateFields = req.body; // Fields to be updated

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { $set: updateFields }, // Use $set to update only the provided fields
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Successfully updated Expense" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Expense" });
  }
};
