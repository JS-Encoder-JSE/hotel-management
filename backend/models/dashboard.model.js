import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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
  },
  { timestamps: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
dashboardSchema.plugin(mongoosePaginate);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
