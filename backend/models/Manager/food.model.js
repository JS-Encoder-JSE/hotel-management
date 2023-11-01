import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  food_name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
