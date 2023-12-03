import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subTotals: 0,
  tax: 0,
  serviceCharge: 0,
  additionalCharge: 0,
  discountOffer: 0,
  grandTotal: 0,
  roomPostedBill: 0,
  extraDiscount: 0,
  refundAmount: 0,
  bookingInfo: "",
  collectedAmount: 0,
  texAmount: 0,
};

const checkoutInfoCalSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    updateSubTotal: (state, action) => {
      state.subTotals = action.payload;
    },
    updateTax: (state, action) => {
      state.tax = action.payload;
    },
    updateServiceCharge: (state, action) => {
      state.serviceCharge = action.payload;
    },
    updateAdditionalCharge: (state, action) => {
      state.additionalCharge = action.payload;
    },
    updateDiscountOffer: (state, action) => {
      state.discountOffer = action.payload;
    },
    setGrandTotal: (state, action) => {
      state.grandTotal = action.payload;
    },
    setRoomPostedBill: (state, action) => {
      state.roomPostedBill = action.payload;
    },
    setExtraDiscount: (state, action) => {
      state.extraDiscount = action.payload;
    },
    setBookingInfo: (state, action) => {
      state.bookingInfo = action.payload;
    },
    setRefundAmount: (state, action) => {
      state.refundAmount = action.payload;
    },
    setCollectedAmount: (state, action) => {
      state.collectedAmount = action.payload;
    },
    setTexAmount: (state, action) => {
      state.texAmount = action.payload;
    },
  },
});

export const {
  updateSubTotal,
  updateTax,
  updateServiceCharge,
  updateAdditionalCharge,
  updateDiscountOffer,
  setGrandTotal,
  setRoomPostedBill,
  setExtraDiscount,
  setBookingInfo,
  setRefundAmount,
  setTexAmount,
} = checkoutInfoCalSlice.actions;

export default checkoutInfoCalSlice.reducer;
