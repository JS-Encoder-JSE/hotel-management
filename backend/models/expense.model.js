import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
const expenseSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    spendedfor: {
      type: String,
      required: true,
      enum: ["restaurant", "hotel"],
    },
    date: {
      type: Date,
      required: true,
    },
    items: [itemSchema],
  },
  { timestamps: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
expenseSchema.plugin(mongoosePaginate);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
