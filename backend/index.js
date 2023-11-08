import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import foodRoute from "./routes/Manager/food.route.js";
import hotelsRoute from "./routes/hotels.route.js";
import uploadRoute from "./routes/upload.js";
import userRoute from "./routes/users.route.js";
import transactionRoute from "./routes/transaction.route.js";
import statusRoute from "./routes/status.route.js";
import reportRoute from "./routes/report.route.js";
import itemRoute from "./routes/Manager/item.route.js";
// import employeeRoute from "./routes/Manager/employee.route.js";
import { fileURLToPath } from "url";
// Manager Routes
import bookingRoute from "./routes/Manager/booking.route.js";
import roomRoute from "./routes/Manager/room.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

// routes
app.use("/users", userRoute);
app.use("/transactions", transactionRoute);
app.use("/status", statusRoute);
app.use("/reports", reportRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomRoute);
app.use("/foods", foodRoute);
app.use("/bookings", bookingRoute);
app.use("/items", itemRoute);
// app.use("/employee", employeeRoute);

app.use("/", uploadRoute);

// Define your routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
