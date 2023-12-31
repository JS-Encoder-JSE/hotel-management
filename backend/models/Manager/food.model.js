﻿import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Room from "./room.model.js";
import Table from "./table.model.js";
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
    category: {
      type: String,
      required: true,
    },
    serveyor_quantity: {
      type: String,
      required: false,
    },
    type_of_alcohol: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: false,
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
const foodCategorySchema = new mongoose.Schema({
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  category_name: {
    type: String,
    required: true,
  },
});
// Food Order List
const foodOrderSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Room",
    },
    table_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Table",
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    unique_id: {
      type: String,
      required: false,
    },
    current_order: {
      type: Boolean,
      required: false,
    },
    order_status: {
      type: String,
      required: false,
      enum: ["Current", "CheckedOut", "AssignedToRoom"],
    },
    items: [itemsSchema],
    total_price: {
      type: Number,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: false,
      default: 0,
    },
    unpaid_amount: {
      type: Number,
      required: false,
      default: 0,
    },
    payment_status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Partial"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
// Apply the mongoose-paginate-v2 plugin to your schema
foodSchema.plugin(mongoosePaginate);
foodOrderSchema.plugin(mongoosePaginate);
const Food = mongoose.model("Food", foodSchema);
const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);

export { Food, FoodOrder, FoodCategory };
