import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const dashboardTableSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_role: {
      type: String,
      required: true,
      enum: ["owner", "manager", "admin", "subadmin"],
    },
    month_name: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    total_expired: {
      type: Number,
      required: false,
      default: 0,
    },
    total_renew: {
      type: Number,
      required: false,
      default: 0,
    },
    total_sale: {
      type: Number,
      required: false,
      default: 0,
    },
    total_checkin: {
      type: Number,
      required: false,
      default: 0,
    },
    total_checkout: {
      type: Number,
      required: false,
      default: 0,
    },
    total_booking: {
      type: Number,
      required: false,
      default: 0,
    },
    total_expense: {
      type: Number,
      required: false,
      default: 0,
    },
    total_income: {
      type: Number,
      required: false,
      default: 0,
    },
    total_profit: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

const checkinfoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_role: {
    type: String,
    required: true,
    enum: ["owner", "manager", "admin", "subadmin"],
  },
  date: {
    type: String,
    required: false,
  },
  today_checkin: {
    type: Number,
    required: false,
    default: 0,
  },
  today_checkout: {
    type: Number,
    required: false,
    default: 0,
  },
  today_booking: {
    type: Number,
    required: false,
    default: 0,
  },
  today_canceled_bookings: {
    type: Number,
    required: false,
    default: 0,
  },
});

const dashboardSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_role: {
      type: String,
      required: true,
      enum: ["owner", "manager", "admin", "subadmin"],
    },
    total_sell_lic: {
      type: Number,
      required: false,
      default: 0,
    },
    total_renew_lic: {
      type: Number,
      required: false,
      default: 0,
    },
    total_active_lic: {
      type: Number,
      required: false,
      default: 0,
    },
    total_expired_lic: {
      type: Number,
      required: false,
      default: 0,
    },
    total_suspended_lic: {
      type: Number,
      required: false,
      default: 0,
    },
    total_amount: {
      type: Number,
      required: false,
      default: 0,
    },
    total_customer: {
      type: Number,
      required: false,
      default: 0,
    },
    total_checkin: {
      type: Number,
      required: false,
      default: 0,
    },
    total_checkout: {
      type: Number,
      required: false,
      default: 0,
    },
    total_booking: {
      type: Number,
      required: false,
      default: 0,
    },
    total_canceled: {
      type: Number,
      required: false,
      default: 0,
    },
    total_expense: {
      type: Number,
      required: false,
      default: 0,
    },
    total_revenue: {
      type: Number,
      required: false,
      default: 0,
    },
    net_profit: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to set current date and year before saving
dashboardTableSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.month_name = currentDate.toLocaleString("en-US", { month: "long" }); // Full month name
  this.year = currentDate.getFullYear().toString();

  next();
});

checkinfoSchema.pre("save", function (next) {
  const currentDate = new Date();
  // currentDate.setHours(0, 0, 0, 0);
  // const date = currentDate.toISOString();
  const date = currentDate.toLocaleDateString();
  // const year = currentDate.getFullYear();
  // const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  // const day = currentDate.getDate().toString().padStart(2, "0");

  // const formattedDate = `${day}-${month}-${year}`;
  this.date = date;
  next();
});

// Apply the mongoose-paginate-v2 plugin to your schema
dashboardSchema.plugin(mongoosePaginate);
dashboardTableSchema.plugin(mongoosePaginate);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);
const DashboardTable = mongoose.model("DashboardTable", dashboardTableSchema);
const CheckInfo = mongoose.model("CheckInfo", checkinfoSchema);

export { Dashboard, DashboardTable, CheckInfo };
