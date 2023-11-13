import { Food, FoodOrder } from "../../models/Manager/food.model.js";
import Hotel from "../../models/hotel.model.js";

export const addFood = async (req, res) => {
  try {
    const {
      hotel_id,
      food_name,
      status,
      serveyor_quantity,
      price,
      images,
      description,
    } = req.body;

    const newFood = new Food({
      hotel_id,
      food_name,
      status,
      serveyor_quantity,
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
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFoodByHotelId = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const { page = 1, limit = 10, filter, search } = req.query;

    const query = {
      hotel_id,
    };

    if (["Available", "Unavailable"].includes(filter)) {
      query.status = filter;
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
    const foodId = req.params.food_id; // Assuming you use "food_id" as the parameter name
    const updateData = req.body;

    const existingFood = await Food.findById(foodId);

    if (!existingFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
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
    const { room_id, hotel_id, items, paid_amount } = req.body;

    // Calculate total_price based on the sum of the 'total' field in each item
    const total_price = items.reduce((sum, item) => sum + item.total, 0);

    const unpaid_amount = total_price - paid_amount;

    const newFoodOrder = new FoodOrder({
      room_id,
      hotel_id,
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

export const getOrdersByHotelId = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const { page = 1, limit = 10, search } = req.query;

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

    if (search) {
      // Update the search condition based on the actual type of room_id
      query.room_id = search; // Assuming search is the room_id you're looking for
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    // Execute the query without paginate and then use populate
    const result = await FoodOrder.find(query)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .populate("room_id", "roomNumber floorNumber");

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
