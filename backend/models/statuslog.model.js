import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const statuslogSchema = new mongoose.Schema(
  {
    changed_from: {
      type: String,
      required: false,
    },
    changed_for: {
      type: String,
      required: false,
    },
    pre_status: {
      type: String,
      required: false,
      enum: ["Active", "Deactive", "Suspended", "Expired"],
    },
    updated_status: {
      type: String,
      required: false,
      enum: ["Active", "Deactive", "Suspended", "Expired"],
    },
    remark: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Apply the mongoose-paginate-v2 plugin to your schema
statuslogSchema.plugin(mongoosePaginate);

const StatusLog = mongoose.model("StatusLog", statuslogSchema);

export default StatusLog;
