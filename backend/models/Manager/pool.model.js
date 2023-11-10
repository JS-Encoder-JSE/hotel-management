import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const poolBillSchema = new mongoose.Schema(
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
    members: {
      type: String,
      required: false,
    },
    pool_name: {
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
  { timeStamp: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
poolBillSchema.plugin(mongoosePaginate);

const PoolBills = mongoose.model("PoolBills", poolBillSchema);

export default PoolBills;
