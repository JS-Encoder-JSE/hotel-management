import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Room from "./room.model.js";
const ImageSchema = new mongoose.Schema({
  driving_lic_img: { type: Array, required: false, default: "" },
  passport: { type: Array, required: false, default: "" },
  nid: { type: Array, required: false, default: "" },
});
const bookingInfoSchema = new mongoose.Schema(
  {
    room_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room",
      },
    ],
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
    bookingMethod: {
      type: String,
      enum: ["Online", "Offline"],
      required: false,
    },
    total_rent: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    amount_after_dis: {
      type: Number,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: false,
      default: 0,
    },
    total_unpaid_amount: {
      type: Number,
      required: false,
      default: 0,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
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
  },
  { timestamps: true }
);
const bookingSchema = new mongoose.Schema(
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
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    no_of_days: {
      type: Number,
      required: true,
    },
    rent_per_day: {
      type: Number,
      required: true,
    },
    total_room_rent: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "CheckedIn", "CheckedOut", "Canceled"],
      required: true,
    },
  },
  { timestamps: true }
);
// Apply the mongoose-paginate-v2 plugin to your schema
bookingSchema.plugin(mongoosePaginate);
const Booking = mongoose.model("Booking", bookingSchema);
const BookingInfo = mongoose.model("BookingInfo", bookingInfoSchema);

export { Booking, BookingInfo };
