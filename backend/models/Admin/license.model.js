import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const licenseSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
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
  bill_info: {
    type: String,
    required: false,
  },
  from_date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  to_date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  status: {
    type: String,
    required: false,
    enum: ["Active", "Deactive", "Suspended", "Renew"],
    default: "Active",
  },
  hotel_limit: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
    enum: ["Cash", "Card", "Mobile_Banking"],
  },
  transection_id : {
    type: String,
    required: false,
    default: "",
  },
  utilities_img: {
    type: Array,
    required: false,
  },
  trade_license_img: {
    type: Array,
    required: false,
  },
});

// Apply the mongoose-paginate-v2 plugin to your schema
licenseSchema.plugin(mongoosePaginate);

const License = mongoose.model("License", licenseSchema);

export default License;
