import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const tableSchema = new mongoose.Schema({
  month_name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  total_expired: {
    type: Number,
    require: false,
  },
  total_renew: {
    type: Number,
    require: false,
  },
  total_sale: {
    type: Number,
    require: false,
  },
  total_checkin: {
    type: Number,
    require: false,
  },
  total_booking: {
    type: Number,
    require: false,
  },
});
const dashboardSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    total_sell_lic: {
      type: Number,
      require: false,
    },
    total_renew_lic: {
      type: Number,
      require: false,
    },
    total_active_lic: {
      type: Number,
      require: false,
    },
    total_expired_lic: {
      type: Number,
      require: false,
    },
    total_suspended_lic: {
      type: Number,
      require: false,
    },
    total_amount: {
      type: Number,
      require: false,
    },
    total_coustomer: {
      type: Number,
      require: false,
    },
    total_checkin: {
      type: Number,
      require: false,
    },
    total_checkout: {
      type: Number,
      require: false,
    },
    total_booking: {
      type: Number,
      require: false,
    },
    total_canceled: {
      type: Number,
      require: false,
    },
    today_checkin: {
      type: Number,
      require: false,
    },
    today_checkout: {
      type: Number,
      require: false,
    },
    table_data: tableSchema,
  },
  { timestamps: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
dashboardSchema.plugin(mongoosePaginate);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
