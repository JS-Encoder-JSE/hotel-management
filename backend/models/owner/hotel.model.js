import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const hotelSchema = new mongoose.Schema({
  name: {
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
  lisence: {
    type: String,
    required: false,
  },
  branch_name: {
    type: String,
    required: false,
  },
  manager: {
    type: String,
    required: false,
  },
});

// Apply the mongoose-paginate-v2 plugin to your schema
hotelSchema.plugin(mongoosePaginate);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
