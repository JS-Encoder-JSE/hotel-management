import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  mobileNumber: {
    type: String,
    required: false,
    default: "",
  },
  emergency_contact: {
    type: String,
    required: false,
    default: "",
  },
  adult: {
    type: Number,
    required: false,
    default: 0,
  },
  children: {
    type: Number,
    required: false,
    default: 0,
  },
  paymentMethod: {
    type: String,
    enum: ["Card", "Cash", "Mobile_Banking"],
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Active", "CheckedIn", "CheckedOut", "Canceled"],
    required: true,
    default: "Active",
  },
  nationality: {
    type: String,
    required: false,
    default: "",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
