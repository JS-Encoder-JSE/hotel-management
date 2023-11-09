import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Room from "./room.model.js";
const foodSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    food_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    serveyor_quantity: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const itemsSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  serveyor_quantity: {
    type: String,
    required: false,
    default: "1",
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
// Food Order List
const foodOrderSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    items: [itemsSchema],
    grand_total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
// Apply the mongoose-paginate-v2 plugin to your schema
foodSchema.plugin(mongoosePaginate);
foodOrderSchema.plugin(mongoosePaginate);
const Food = mongoose.model("Food", foodSchema);
const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);

export { Food, FoodOrder };
