// controllers/Manager/food.controller.js

import Food from '../../models/Manager/food.model.js';

export const addfood = async (req, res) => {
  try {
    const { food_name, quantity, price, images, description } = req.body;
    
    const newFood = new Food({
      food_name,
      quantity,
      price,
      images,
      description
    });

    const savedFood = await newFood.save();

    res.status(201).json({
      success: true,
      data: savedFood,
      message: 'Food item added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

export const getfood = async (req, res) => {
    try {
      const { page = 1, limit = 10, ...query } = req.query;
      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);
  
      const startIndex = (parsedPage - 1) * parsedLimit;
      const endIndex = parsedPage * parsedLimit;
  
      const totalFoods = await Food.countDocuments(query);
      const totalPages = Math.ceil(totalFoods / parsedLimit);
  
      const foods = await Food.find(query)
        .skip(startIndex)
        .limit(parsedLimit);
  
      res.status(200).json({
        success: true,
        data: foods,
        pagination: {
          total: totalFoods,
          totalPages: totalPages,
          currentPage: parsedPage,
          limit: parsedLimit
        },
        message: 'Food items retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  };
  

export const getfoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    res.status(200).json({
      success: true,
      data: food,
      message: 'Food item retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
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
      message: 'Food item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

export const deletefood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.foodId);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        error: 'Food item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Food item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};
