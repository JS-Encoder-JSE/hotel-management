import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const barOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    type_of_alcohol: {
      type: String,
      required: false,
    },
    surveyor_quantity: {
      type: String,
      required: false,
    },
    price: {
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
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Partial"],
      default: "Pending",
    },
  },
  { timestamp: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
barOrderSchema.plugin(mongoosePaginate);

const BarOrder = mongoose.model("BarOrder", barOrderSchema);

export default BarOrder;
