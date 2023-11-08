﻿import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const roomSchema = new mongoose.Schema({
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    enum: ["Standard", "Deluxe", "Suite", "President_Suite"], // Add other category options as needed
    required: true,
  },
  type: {
    type: String,
    enum: ["Single", "Double", "Twin"], // Add other type options as needed
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bedSize: {
    type: String,
    enum: ["Single", "Double", "King"],
    required: true,
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  air_conditioned: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    default: "Available",
    enum: ["Available", "Booked", "CheckedIn", "Deleted"],
  },
});
// Apply the mongoose-paginate-v2 plugin to your schema
roomSchema.plugin(mongoosePaginate);
const Room = mongoose.model("Room", roomSchema);

export default Room;
