import mongoose, { Schema } from "mongoose";

const foodSchema = new mongoose.Schema(
	{
		food_name: {
			type: String,
			required: true,
		},
		sell: { type: Number, default: 0 },
		quantity: {
			type: Number,
			default: 0,
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

// Food Order List
const foodOrderList = new mongoose.Schema({
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
		required: true,
	},
	orders: [
		{
			food: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Food",
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			price: { type: Number, required: true },
			total_price: {
				type: Number,
				required: true,
			},
		},
	],
}, { timestamps: true });


const Food = mongoose.model("Food", foodSchema);
const FoodOrder = mongoose.model("FoodOrder", foodOrderList);

export { FoodOrder, Food };
