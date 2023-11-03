import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignedHotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    description: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: false,
      default: 0,
    },
    use: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timeStamp: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
itemSchema.plugin(mongoosePaginate);

const Item = mongoose.model("Item", itemSchema);

export default Item;
