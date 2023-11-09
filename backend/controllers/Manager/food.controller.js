import { Food, FoodOrder } from "../../models/Manager/food.model.js";

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
      error: "Internal Server Error",
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
      message: "Rooms retrieved successfully",
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
      error: "Internal Server Error",
    });
  }
};

export const updatefood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.foodId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedFood,
      message: "Food item updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const deletefood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.foodId);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        error: "Food item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Food item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// order
export const addOrder = async (req, res) => {
  try {
    const { room_id, hotel_id, items, grand_total } = req.body;

    const newFoodOrder = new FoodOrder({
      room_id,
      hotel_id,
      items,
      grand_total,
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
      error: "Internal Server Error",
    });
  }
};
