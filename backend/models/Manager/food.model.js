import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const foodSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    food_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      enum: ["Available", "Unavailable"],
    },
    serveyor_quantity: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// Apply the mongoose-paginate-v2 plugin to your schema
foodSchema.plugin(mongoosePaginate);
const Food = mongoose.model("Food", foodSchema);

export default Food;
