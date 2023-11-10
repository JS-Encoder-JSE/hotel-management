import mongoose from "mongoose";
import PoolBills from "../../models/Manager/pool.model.js";
import Room from "../../models/Manager/room.model.js";

export const addPoolBill = async (req, res) => {
  try {
    const {
      name,
      hotel_id,
      room_id,
      members,
      pool_name,
      price,
      paid_amount = 0,
    } = req.body;

    const unpaid_amount = Math.max(price - paid_amount, 0);
    let status = "Pending";
    if (paid_amount >= price) {
      status = "Paid";
    } else if (paid_amount > 0) {
      status = "Partial";
    }

    const newPoolBill = new PoolBills({
      name,
      hotel_id: hotel_id,
      room_id: room_id,
      members,
      pool_name,
      price,
      paid_amount,
      unpaid_amount,
      status,
    });

    const savedPoolBill = await newPoolBill.save();

    res.status(201).json({
      success: true,
      data: savedPoolBill,
      message: "Pool bill added successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
export const getPoolBillsByHotelId = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const { page = 1, limit = 10, search, filter } = req.query;

    const query = { hotel_id };

    if (search) {
      const room = await Room.findOne({ hotel_id, roomNumber: search });
      if (room) {
        query.room_id = room._id;
      } else {
        return res.status(200).json({
          success: true,
          data: [],
          message: "No Pool Bills found for the given roomNumber",
        });
      }
    }

    if (["Pending", "Paid", "Partial"].includes(filter)) {
      query.status = filter;
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const poolBills = await PoolBills.paginate(query, options);

    res.status(200).json({
      success: true,
      data: poolBills,
      message: "Pool Bills retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
export const getPoolBillById = async (req, res) => {
  try {
    const poolBillId = req.params.bill_id;

    if (!mongoose.Types.ObjectId.isValid(poolBillId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid pool bill ID",
      });
    }

    const poolBill = await PoolBills.findById(poolBillId);

    if (!poolBill) {
      return res.status(404).json({
        success: false,
        error: "Pool bill not found",
      });
    }

    res.status(200).json({
      success: true,
      data: poolBill,
      message: "Pool bill retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
export const updatePoolBill = async (req, res) => {
  try {
    const poolBillId = req.params.bill_id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(poolBillId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid pool bill ID",
      });
    }

    const existingPoolBill = await PoolBills.findById(poolBillId);

    if (!existingPoolBill) {
      return res.status(404).json({
        success: false,
        error: "Pool bill not found",
      });
    }

    const updatedPoolBill = await PoolBills.findByIdAndUpdate(
      poolBillId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedPoolBill,
      message: "Pool bill updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
