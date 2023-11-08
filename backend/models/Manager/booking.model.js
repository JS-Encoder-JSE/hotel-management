import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ImageSchema = new mongoose.Schema({
  driving_lic_img: { type: Array, required: false, default: "" },
  passport: { type: Array, required: false, default: "" },
  nid: { type: Array, required: false, default: "" },
});
const bookingSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  hotel_id: {
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
  doc_number: {
    type: String,
    required: false,
    default: "",
  },
  doc_images: ImageSchema,
});
// Apply the mongoose-paginate-v2 plugin to your schema
bookingSchema.plugin(mongoosePaginate);
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
