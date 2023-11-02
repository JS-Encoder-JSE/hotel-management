import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: false,
    enum: ["Waiter", "House_Keeper"],
  },
  shift: {
    type: String,
    required: true,
    enum: ["Day", "Night"],
  },
  sallary: {
    type: Number,
    required: false,
    default: 0,
  },
  street_address: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
  images: {
    type: Array,
    required: false,
  },
});

// Apply the mongoose-paginate-v2 plugin to your schema
employeeSchema.plugin(mongoosePaginate);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
