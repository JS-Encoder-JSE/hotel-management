import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = new mongoose.Schema({
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
  },
  shift: {
    type: String,
    required: true,
    enum: ["Day", "Night"],
  },
  status: {
    type: String,
    enum: ["Active", "Deactive", "Suspended"],
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone_no: {
    type: Number,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  joining_date: {
    type: String,
    required: false,
  },
  // Add other user-related fields here
  maxHotels: {
    type: Number,
    default: 0,
  },
  assignedHotel: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  }],
  images: {
    type: Array,
    required: false,
  }
});
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
