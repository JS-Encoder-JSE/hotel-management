import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const monthlySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_role: {
      type: String,
      required: true,
      enum: ["owner", "manager"],
    },
    month_name: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    total_hotel_expenses: {
      type: Number,
      required: false,
      default: 0,
    },
    total_hotel_income: {
      type: Number,
      required: false,
      default: 0,
    },
    total_hotel_profit: {
      type: Number,
      required: false,
      default: 0,
    },
    total_restaurant_expenses: {
      type: Number,
      required: false,
      default: 0,
    },
    total_restaurant_income: {
      type: Number,
      required: false,
      default: 0,
    },
    total_restaurant_profit: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

const dailySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_role: {
    type: String,
    required: true,
    enum: ["owner", "manager"],
  },
  date: {
    type: String,
    required: false,
  },
  today_hotel_expense: {
    type: Number,
    required: false,
    default: 0,
  },
  today_hotel_income: {
    type: Number,
    required: false,
    default: 0,
  },
  today_hotel_profit: {
    type: Number,
    required: false,
    default: 0,
  },
  today_restaurant_expense: {
    type: Number,
    required: false,
    default: 0,
  },
  today_restaurant_income: {
    type: Number,
    required: false,
    default: 0,
  },
  today_restaurant_profit: {
    type: Number,
    required: false,
    default: 0,
  },
});

const staticSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_role: {
      type: String,
      required: true,
      enum: ["owner", "manager"],
    },
    total_restaurant_expenses: {
      type: Number,
      required: false,
      default: 0,
    },
    total_restaurant_income: {
      type: Number,
      required: false,
      default: 0,
    },
    total_restaurant_profit: {
      type: Number,
      required: false,
      default: 0,
    },
    total_hotel_expenses: {
      type: Number,
      required: false,
      default: 0,
    },
    total_hotel_income: {
      type: Number,
      required: false,
      default: 0,
    },
    total_hotel_profit: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to set current date and year before saving
monthlySchema.pre("save", function (next) {
  const currentDate = new Date();
  this.month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
  this.year = currentDate.getFullYear().toString();

  next();
});

dailySchema.pre("save", function (next) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const formattedDate = currentDate.toISOString();
  this.date = formattedDate;
  next();
});

// Apply the mongoose-paginate-v2 plugin to your schema
staticSchema.plugin(mongoosePaginate);
monthlySchema.plugin(mongoosePaginate);

const StaticSubDashData = mongoose.model("StaticSubDashData", staticSchema);
const MonthlySubDashData = mongoose.model("MonthlySubDashData", monthlySchema);
const DailySubDashData = mongoose.model("DailySubDashData", dailySchema);

export { StaticSubDashData, MonthlySubDashData, DailySubDashData };
