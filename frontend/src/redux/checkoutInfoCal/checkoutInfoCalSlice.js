import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subTotals: 10,
  tax: 0,
  serviceCharge: 0,
  additionalCharge: 0,
  discountOffer: 0,
  grandTotal: 0,
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
    grandTotal: (state) => {
     state.grandTotal = action.payload;
    },
  },
});

export const {
  updateSubTotal,
  updateTax,
  updateServiceCharge,
  updateAdditionalCharge,
  updateDiscountOffer,
  grandTotal,
} = checkoutInfoCalSlice.actions;

export default checkoutInfoCalSlice.reducer;
