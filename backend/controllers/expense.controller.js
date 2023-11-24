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
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
