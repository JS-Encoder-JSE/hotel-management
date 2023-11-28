import Expense from "../models/expense.model.js"; // Adjust the path based on your project structure
import {
  DailySubDashData,
  MonthlySubDashData,
  StaticSubDashData,
} from "../models/subdashboard.model.js";

export const addExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { hotel_id, date, spendedfor, items, total_amount } = req.body;

    const newDate = new Date(date);
    const month_name = newDate.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = newDate.getFullYear().toString();

    const existingExpense = await Expense.findOne({
      date,
      hotel_id,
      spendedfor,
    });
    if (existingExpense) {
      existingExpense.items = [...existingExpense.items, ...items];
      existingExpense.total_amount += total_amount;
      await existingExpense.save();

      const existingStaticSubDashData = await StaticSubDashData.findOne({
        user_id: userId,
      });
      const existingDailySubDashData = await DailySubDashData.findOne({
        user_id: userId,
        date,
      });
      const existingMonthlySubDashData = await MonthlySubDashData.findOne({
        user_id: userId,
        month_name,
        year,
      });
      if (spendedfor === "hotel") {
        existingDailySubDashData.today_hotel_expenses += total_amount;
        existingDailySubDashData.today_hotel_profit -= total_amount;
        existingMonthlySubDashData.total_hotel_expenses += total_amount;
        existingMonthlySubDashData.total_hotel_profit -= total_amount;
        existingStaticSubDashData.total_hotel_expenses += total_amount;
        existingStaticSubDashData.total_hotel_profit -= total_amount;
      }
      if (spendedfor === "restaurant") {
        existingDailySubDashData.today_restaurant_expenses += total_amount;
        existingDailySubDashData.today_restaurant_profit -= total_amount;
        existingMonthlySubDashData.total_restaurant_expenses += total_amount;
        existingMonthlySubDashData.total_restaurant_profit -= total_amount;
        existingStaticSubDashData.total_restaurant_expenses += total_amount;
        existingStaticSubDashData.total_restaurant_profit -= total_amount;
      }
      await existingDailySubDashData.save();
      await existingMonthlySubDashData.save();
      await existingStaticSubDashData.save();
    }
    if (!existingExpense) {
      // Create a new expense instance
      const newExpense = new Expense({
        hotel_id,
        date,
        spendedfor,
        items,
        total_amount,
      });
      // Save the expense to the database
      await newExpense.save();
      const existingStaticSubDashData = await StaticSubDashData.findOne({
        user_id: userId,
      });
      if (spendedfor === "hotel") {
        existingStaticSubDashData.total_hotel_expenses += total_amount;
        existingStaticSubDashData.total_hotel_profit -= total_amount;
      }
      if (spendedfor === "restaurant") {
        existingStaticSubDashData.total_restaurant_expenses += total_amount;
        existingStaticSubDashData.total_restaurant_profit -= total_amount;
      }
      await existingStaticSubDashData.save();
      const existingDailySubDashData = await DailySubDashData.findOne({
        user_id: userId,
        date,
      });
      if (existingDailySubDashData) {
        if (spendedfor === "hotel") {
          existingDailySubDashData.today_hotel_expenses += total_amount;
          existingDailySubDashData.today_hotel_profit -= total_amount;
        }
        if (spendedfor === "restaurant") {
          existingDailySubDashData.today_restaurant_expenses += total_amount;
          existingDailySubDashData.today_restaurant_profit -= total_amount;
        }
        await existingDailySubDashData.save();
      }
      if (!existingDailySubDashData) {
        if (spendedfor === "hotel") {
          const newDailySubDashData = new DailySubDashData({
            user_id: userId,
            today_hotel_expenses: total_amount,
          });
          await newDailySubDashData.save();
        }
        if (spendedfor === "restaurant") {
          const newDailySubDashData = new DailySubDashData({
            user_id: userId,
            today_restaurant_expenses: total_amount,
          });
          await newDailySubDashData.save();
        }
      }
      const existingMonthlySubDashData = await MonthlySubDashData.findOne({
        user_id: userId,
        month_name,
        year,
      });
      if (existingMonthlySubDashData) {
        if (spendedfor === "hotel") {
          existingMonthlySubDashData.total_hotel_expenses += total_amount;
          existingMonthlySubDashData.total_hotel_profit -= total_amount;
        }
        if (spendedfor === "restaurant") {
          existingDailySubDashData.total_restaurant_expenses += total_amount;
          existingDailySubDashData.total_restaurant_profit -= total_amount;
        }
        await existingMonthlySubDashData.save();
      }
      if (!existingMonthlySubDashData) {
        if (spendedfor === "hotel") {
          const newMonthlySubDashData = new DailySubDashData({
            user_id: userId,
            total_hotel_expenses: total_amount,
          });
          await newMonthlySubDashData.save();
        }
        if (spendedfor === "restaurant") {
          const newMonthlySubDashData = new DailySubDashData({
            user_id: userId,
            total_restaurant_expenses: total_amount,
          });
          await newMonthlySubDashData.save();
        }
      }
    }
    return res.status(201).json({ message: "Successfully added expenses" });
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

export const getExpenses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      spendedfor,
      hotel_id,
      fromDate,
      toDate,
    } = req.query;

    // Build the query object based on the provided filters
    const query = {};
    if (hotel_id) {
      query.hotel_id = hotel_id;
    }
    if (spendedfor) {
      query.spendedfor = spendedfor;
    }
    if (fromDate && toDate) {
      // If both fromDate and toDate are provided, use $gte and $lte for the date range filter
      query.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    } else if (fromDate) {
      // If only fromDate is provided, use $gte for the minimum date filter
      query.createdAt = { $gte: new Date(fromDate) };
    } else if (toDate) {
      // If only toDate is provided, use $lte for the maximum date filter
      query.createdAt = { $lte: new Date(toDate) };
    }
    // Use the paginate function to get paginated results
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const expenses = await Expense.paginate(query, options);

    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const { expense_id } = req.params;

    // Find the expense by ID
    const expense = await Expense.findById(expense_id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(200).json(expense);
  } catch (error) {
    console.error("Error fetching expense by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
