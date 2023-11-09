import mongoose from "mongoose";
import cron from "node-cron";
import License from "./models/Admin/license.model.js";
import User from "./models/user.model.js";

mongoose.connect(
  "mongodb+srv://jsencoder:hellofromtheotherside@cluster0.onulisf.mongodb.net/hotels?authMechanism=SCRAM-SHA-1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected successfully.");

  // Schedule the cron job
  cron.schedule("1 0 * * *", () => {
    console.log("Running license renewal check at", new Date().toISOString());
    checkLicenseRenewal();
  });
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

const checkLicenseRenewal = async () => {
  try {
    const currentDate = new Date();
    const expiredLicenses = await License.find({
      to_date: { $lt: currentDate },
      status: { $ne: "Renew" }, // To avoid unnecessary updates
    });

    if (expiredLicenses.length > 0) {
      for (const license of expiredLicenses) {
        // Update License status to "Renew"
        await License.findByIdAndUpdate(license._id, { status: "Renew" });

        // Find the corresponding owner in the User model and update status to "Expired"
        await User.findByIdAndUpdate(license.owner_id, { status: "Expired" });
      }

      console.log("Licenses renewed and user statuses updated.");
    } else {
      console.log("No licenses need renewal.");
    }
  } catch (error) {
    console.error("Error checking license renewal:", error);
  }
};
