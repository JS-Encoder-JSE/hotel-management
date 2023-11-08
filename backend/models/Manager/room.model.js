import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Standard", "Deluxe", "Suite", "President-Suite"],  // Add other category options as needed
    default: "Standard",
  },
  type: {
    type: String,
    enum: ["Single", "Double"],  // Add other type options as needed
    default: "Single",
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
    type: Number,
    required: true,
  },
  images: {
    type:Array,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  air_conditioned:{
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    default: "Available",
    enum: ["Available", "Booked", "CheckedIn"],
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    require:true
  }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
