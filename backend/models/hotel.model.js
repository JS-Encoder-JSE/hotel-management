import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// const RoomsSchema = new mongoose.Schema({
//   room_no: { type: Number, required: true },
//   floor: { type: Number, required: true },
//   type: { type: String, required: true },
//   ac_status: { type: Boolean, default: false },
// });
const ImageSchema = new mongoose.Schema({
  driving_lic_img: { type: Array, required: false, default: "" },
  trade_lic_img: { type: Array, required: false, default: "" },
  profile_img: { type: String, required: false, default: "" },
  utilities: { type: Array, required: false, default: "" },
  passport: { type: Array, required: false, default: "" },
  pancard: { type: Array, required: false, default: "" },
  nid: { type: Array, required: false, default: "" },
});
const ManagerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "manager", "admin", "subadmin", "employee"],
      required: true,
    },
    shift: {
      type: String,
      required: false,
      enum: ["Morning", "Day", "Night"],
      default: "Day",
    },
    status: {
      type: String,
      enum: ["Active", "Deactive", "Suspended", "Expired", "Deleted"],
      required: false,
      default: "Active",
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
    phone_no: {
      type: String,
      required: false,
      default: "",
    },
    emergency_contact: {
      type: String,
      required: false,
      default: "",
    },
    salary: {
      type: String,
      required: false,
      default: "",
    },
    joining_date: {
      type: String,
      required: false,
      default: "",
    },
    images: ImageSchema,
  },
  { timestamps: true }
);
const hotelSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  branch_name: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone_no: {
    type: Number,
    required: false,
    default: 0,
  },
  managers: [ManagerSchema],
  // rooms: [RoomsSchema],
});

// Apply the mongoose-paginate-v2 plugin to your schema
hotelSchema.plugin(mongoosePaginate);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
