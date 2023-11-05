import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const reportSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    phone_no: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["Sold", "Renew", "Expired"],
    },
    bill_from: {
      type: Date,
      required: true,
    },
    bill_to: {
      type: Date,
      required: true,
    },
    deposit_to: {
      type: String,
      required: true,
    },
    deposit_by: {
      type: String,
      required: true,
    },
    hotels_have: {
      type: Number,
      required: false,
      default: 0,
    },
    hotel_limit: {
      type: Number,
      required: false,
      default: 0,
    },
    paid_amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
reportSchema.plugin(mongoosePaginate);

const Report = mongoose.model("Report", reportSchema);

export default Report;
