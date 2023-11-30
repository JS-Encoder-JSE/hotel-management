﻿import { BookingInfo } from "../../models/Manager/booking.model.js";
import {
  Food,
  FoodCategory,
  FoodOrder,
} from "../../models/Manager/food.model.js";
import Room from "../../models/Manager/room.model.js";
import Table from "../../models/Manager/table.model.js";
import { Dashboard } from "../../models/dashboard.model.js";
import Hotel from "../../models/hotel.model.js";
import {
  DailySubDashData,
  MonthlySubDashData,
  StaticSubDashData,
} from "../../models/subdashboard.model.js";
import User from "../../models/user.model.js";

export const addFood = async (req, res) => {
  try {
    const {
      food_name,
      status,
      category,
      serveyor_quantity,
      type_of_alcohol,
      price,
      images,
      description,
      password,
    } = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    if (!hotel_id) {
      return res
        .status(400)
        .json({ message: "User is not assigned to any hotel" });
    }

    if (category === "Liquor") {
      const parent = await User.findById(user.parent_id);
      // Compare the provided password with the hashed password
      const isPasswordValid = await parent.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
    }
    // Check if the category_name already exists for the given hotel_id
    const existingCategory = await FoodCategory.findOne({
      hotel_id,
      category_name: category,
    });

    if (!existingCategory) {
      const newCategory = new FoodCategory({
        hotel_id,
        category_name: category,
      });

      await newCategory.save();
    }

    const newFood = new Food({
      hotel_id,
      food_name,
      status,
      category,
      serveyor_quantity,
      type_of_alcohol,
      price,
      images,
      description,
    });

    const savedFood = await newFood.save();

    res.status(201).json({
      success: true,
      data: savedFood,
      message: "Food item added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFoodByHotelId = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, filter, search } = req.query;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    const query = {
      hotel_id,
    };

    if (["Available", "Unavailable"].includes(filter)) {
      query.status = filter;
    }
    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { food_name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const foods = await Food.paginate(query, options);

    res.status(200).json({
      success: true,
      data: foods,
      message: "Foods retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
    });
  }
};

export const getfoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    res.status(200).json({
      success: true,
      data: food,
      message: "Food item retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const foodId = req.params.food_id; // Assuming you use "food_id" as the parameter name
    const updateData = req.body;

    const existingFood = await Food.findById(foodId);

    if (!existingFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }
    if (updateData.category === "Liquor") {
      const user = await User.findById(user_id);
      const parent = await User.findById(user.parent_id);
      // Compare the provided password with the hashed password
      const isPasswordValid = await parent.comparePassword(updateData.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
    }

    // Update the food with the provided data
    const updatedFood = await Food.findByIdAndUpdate(foodId, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updatedFood,
      message: "Food updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addOrder = async (req, res) => {
  try {
    const { room_id, table_id, items, current_order, paid_amount } = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    // Calculate total_price based on the sum of the 'total' field in each item
    const total_price = items.reduce((sum, item) => sum + item.total, 0);

    const unpaid_amount = total_price - paid_amount;

    // Generate a random 8-digit number
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);

    // Format the number to have exactly 8 digits as a string
    const unique_id = randomNumber.toString().slice(0, 8);
    if (room_id) {
      const bookingInfo = await BookingInfo.findOne({ room_ids: room_id });
      bookingInfo.total_posted_bills += unpaid_amount;
      bookingInfo.total_payable_amount += unpaid_amount;
      bookingInfo.total_unpaid_amount += unpaid_amount;
      await bookingInfo.save();
    }
    const newFoodOrder = new FoodOrder({
      room_id,
      table_id,
      hotel_id,
      unique_id,
      current_order,
      items,
      total_price,
      paid_amount,
      unpaid_amount,
    });

    const savedFoodOrder = await newFoodOrder.save();

    res.status(201).json({
      success: true,
      data: savedFoodOrder,
      message: "Food order added successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.order_id; // Assuming you use "order_id" as the parameter name

    // Retrieve the order by ID
    const order = await FoodOrder.findById(orderId)
      .populate({
        path: "room_id",
        select: "roomNumber floorNumber",
      })
      .populate({
        path: "table_id",
        select: "table_number",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Order retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const orderId = req.params.order_id; // Assuming you use "order_id" as the parameter name
    const updateData = req.body;

    const existingOrder = await FoodOrder.findById(orderId);

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if ((updateData.order_status = "CheckedOut")) {
      const newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      const date = newDate.toISOString();
      const month_name = newDate.toLocaleString("en-US", { month: "long" }); // Full month name
      const year = newDate.getFullYear().toString();

      const new_paid_amount =
        updateData.paid_amount - existingOrder.paid_amount;

      const user = await User.findById(user_id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const ownerDashboard = await Dashboard.findOne({
        user_id: user.parent_id,
      });
      const managerDashboard = await Dashboard.findOne({ user_id: user_id });

      ownerDashboard.total_amount += new_paid_amount;
      managerDashboard.total_amount += new_paid_amount;

      await ownerDashboard.save();
      await managerDashboard.save();
      const existingStaticSubDashData = await StaticSubDashData.findOne({
        user_id: user_id,
      });
      existingStaticSubDashData.total_restaurant_income += new_paid_amount;
      existingStaticSubDashData.total_restaurant_profit += new_paid_amount;
      await existingStaticSubDashData.save();
      const existingDailySubDashData = await DailySubDashData.findOne({
        user_id: user_id,
        date,
      });
      if (existingDailySubDashData) {
        existingDailySubDashData.today_restaurant_income += new_paid_amount;
        existingDailySubDashData.today_restaurant_profit += new_paid_amount;
        await existingDailySubDashData.save();
      }
      if (!existingDailySubDashData) {
        const newDailySubDashData = new DailySubDashData({
          user_id: user_id,
          today_restaurant_expenses: new_paid_amount,
        });
        await newDailySubDashData.save();
      }
      const existingMonthlySubDashData = await MonthlySubDashData.findOne({
        user_id: user_id,
        month_name,
        year,
      });
      if (existingMonthlySubDashData) {
        existingDailySubDashData.total_restaurant_income += new_paid_amount;
        existingDailySubDashData.total_restaurant_profit += new_paid_amount;
        await existingMonthlySubDashData.save();
      }
      if (!existingMonthlySubDashData) {
        const newMonthlySubDashData = new DailySubDashData({
          user_id: user_id,
          total_restaurant_expenses: new_paid_amount,
        });
        await newMonthlySubDashData.save();
      }
    }
    // Update the order with the provided data
    const updatedOrder = await FoodOrder.findByIdAndUpdate(
      orderId,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrdersByHotelId = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      roomNumber,
      table_number,
      unique_id,
      current_order,
      fromDate,
      toDate,
    } = req.query;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    const hotel = await Hotel.findById(hotel_id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const query = {
      hotel_id,
    };

    if (roomNumber) {
      const room = await Room.findOne({ hotel_id, roomNumber });
      if (room) {
        query.room_id = room._id;
      } else {
        return res.status(200).json({
          success: false,
          data: [],
          message: "No room found for the given room number",
        });
      }
    }

    if (table_number) {
      const table = await Table.findOne({ hotel_id, table_number });
      if (table) {
        query.table_id = table._id;
      } else {
        return res.status(200).json({
          success: false,
          data: [],
          message: "No table found for the given table number",
        });
      }
    }
    if (unique_id) {
      query.unique_id = unique_id;
    }
    if (current_order) {
      query.current_order = current_order;
    }
    if (fromDate && toDate) {
      // Assuming createdAt is a Date field in your schema
      query.createdAt = {
        $gte: new Date(fromDate), // Greater than or equal to fromDate
        $lte: new Date(toDate), // Less than or equal to toDate
      };
    } else if (fromDate) {
      // If only fromDate is provided, use $gte for the minimum date filter
      query.createdAt = { $gte: new Date(fromDate) };
    } else if (toDate) {
      // If only toDate is provided, use $lte for the maximum date filter
      query.createdAt = { $gte: new Date(toDate) };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    // Execute the query without paginate and then use populate
    const result = await FoodOrder.find(query)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate({
        path: "room_id",
        select: "roomNumber floorNumber",
      })
      .populate({
        path: "table_id",
        select: "table_number",
      });

    const totalDocuments = await FoodOrder.countDocuments(query);

    const orders = {
      docs: result,
      totalDocs: totalDocuments,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(totalDocuments / options.limit),
    };

    res.status(200).json({
      success: true,
      data: orders,
      message: "Orders retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    // Validate orderId here if needed

    const deletedOrder = await FoodOrder.findByIdAndDelete(order_id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedOrder,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { food_id } = req.params;

    // Validate foodId here if needed

    const deletedFood = await Food.findByIdAndDelete(food_id);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedFood,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getFoodsByRoomId = async (req, res) => {
  try {
    const { room_id } = req.params;

    // Find food orders for the given room_id
    const foodOrders = await FoodOrder.find({
      room_id: room_id,
      // You may add other conditions if needed
    });

    if (!foodOrders || foodOrders.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No food orders found for the given room",
      });
    }

    res.status(200).json({
      success: true,
      data: foodOrders,
      message: "Food orders retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation error. Check your request data.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const addFoodCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    // Check if the category_name already exists for the given hotel_id
    const existingCategory = await FoodCategory.findOne({
      hotel_id,
      category_name,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with the same name already exists for this hotel",
      });
    }

    const newCategory = new FoodCategory({
      hotel_id,
      category_name,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      data: newCategory,
      message: "Food category added successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error. Check your request data.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateFoodCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const updateData = req.body;

    const updatedCategory = await FoodCategory.findByIdAndUpdate(
      category_id,
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Food category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Food category updated successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error. Check your request data.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteFoodCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const deletedCategory = await FoodCategory.findByIdAndRemove(category_id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Food category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedCategory,
      message: "Food category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFoodCategoriesByHotelId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const hotel_id =
      user.assignedHotel.length > 0 ? user.assignedHotel[0] : null;

    // Find food categories for the given hotel_id
    const foodCategories = await FoodCategory.find({ hotel_id });

    if (!foodCategories || foodCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No food categories found for the given hotel",
      });
    }

    res.status(200).json({
      success: true,
      data: foodCategories,
      message: "Food categories retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle specific error cases
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error. Check your request data.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFoodCategoryById = async (req, res) => {
  try {
    const { category_id } = req.params;

    const foodCategory = await FoodCategory.findById(category_id);

    if (!foodCategory) {
      return res.status(404).json({
        success: false,
        message: "Food category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: foodCategory,
      message: "Food category retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrdersByDate = async (req, res) => {
  try {
    const { date, hotel_id, order_status } = req.query;

    // Build the query object based on the provided filters
    const query = { hotel_id };
    console.log(hotel_id);
    if (order_status) {
      query.order_status = order_status;
    }

    if (date) {
      // Check if the date is in a valid format
      const isValidDate = !isNaN(Date.parse(date));

      if (!isValidDate) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format. Please provide a valid date.",
        });
      }

      // Convert date to a Date object and set time range for the entire day
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      startDate.toISOString(); // Set the time to the beginning of the day
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      endDate.toISOString(); // Set the end date to the next day

      // Add a createdAt filter to match orders created between start and end dates
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    // Find orders without pagination and sort by createdAt in descending order
    const orders = await FoodOrder.find(query);
    console.log(orders);
    return res.status(200).json({
      success: true,
      data: orders,
      message: "Food orders retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching food orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
