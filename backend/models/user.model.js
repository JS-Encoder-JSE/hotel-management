import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";
const ImageSchema = new mongoose.Schema({
  trade_lic_img: { type: Array, required: false, default: "" },
  utilities: { type: Array, required: false, default: "" },
  pancard: { type: Array, required: false, default: "" },
});
const ExtendedTimeSchema = new mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
});
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "manager", "admin", "subadmin"],
      required: true,
    },
    designation: {
      type: String,
      required: false,
      default: "",
    },
    shift: {
      type: String,
      required: false,
      enum: ["Day", "Night"],
      default: "Day",
    },
    status: {
      type: String,
      enum: ["Active", "Deactive", "Suspended", "Expired"],
      required: false,
      default: "Active",
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
    phone_no: {
      type: Number,
      required: false,
      default: 0,
    },
    bill_info: {
      type: String,
      required: false,
      default: "",
    },
    bill_from: {
      type: Date,
      required: false,
      default: Date.now,
    },
    bill_to: {
      type: Date,
      required: false,
      default: Date.now,
    },
    extended_time: [ExtendedTimeSchema],
    salary: {
      type: String,
      required: false,
      default: "",
    },
    joining_date: {
      type: String,
      required: false,
      default: "",
    },
    maxHotels: {
      type: Number,
      required: false,
      default: 0,
    },
    assignedHotel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: false,
        default: null,
      },
    ],
    trade_lic_img: {
      type: Array,
      required: false,
      default: [],
    },
    utilities_img: {
      type: Array,
      required: false,
      default: [],
    },
    images: ImageSchema,
  },
  { timestamps: true }
);
// Apply the mongoose-paginate-v2 plugin to your schema
userSchema.plugin(mongoosePaginate);

// Hash the user's password before saving it to the database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords for authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
