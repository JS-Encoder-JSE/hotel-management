import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const transactionlogSchema = new mongoose.Schema(
  {
    tran_id: {
      type: String,
      required: false,
    },
    payment_method: {
      type: String,
      required: true,
      enum: ["Cash", "Card", "Mobile_Banking"],
    },
    bill_from: {
      type: Date,
      required: true,
    },
    bill_to: {
      type: Date,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    payment_for: {
      type: String,
      required: false,
      enum: ["Renew", "Purchase"],
    },
    remark: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
transactionlogSchema.plugin(mongoosePaginate);

const TransactionLog = mongoose.model("TransactionLog", transactionlogSchema);

export default TransactionLog;
