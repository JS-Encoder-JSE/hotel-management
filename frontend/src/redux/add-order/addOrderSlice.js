import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {
    roomNumber: null,
    foods: [],
  },
  orderCalc: {
    total: 0,
    tax: 0,
    grandTotal: 0,
  },
};

const addOrderSlice = createSlice({
  name: "addOrder",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    delOrder: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item._id === action.payload._id,
      );

      state.order.foods.splice(findFoodIdx, 1);
    },
    setQuantity: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (action.payload.quantity) {
        state.order.foods.splice(findFoodIdx, 1, {
          ...action.payload.food,
          quantity: action.payload.quantity,
        });
      } else {
        state.order.foods.splice(findFoodIdx, 1, {
          ...action.payload.food,
          quantity: 1,
        });
      }
    },
    manipulateQuantity: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item._id === action.payload.food._id,
      );

      if (findFoodIdx !== -1) {
        state.order.foods.splice(findFoodIdx, 1, {
          ...state.order.foods[findFoodIdx],
          quantity: action.payload.quantity,
        });
      }
    },
    setOrderCalc: (state, action) => {
      const total = state.order.foods.reduce(
        (total, current) => total + current.quantity * current.price,
        0,
      );
      const tax = total * 0.03;
      const grandTotal = total + tax;

      state.orderCalc = {
        total: total.toFixed(2),
        tax: tax.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
      };
    },
    resetFoodOrder: (state) => {
      state.order = {
        roomNumber: null,
        foods: [],
      };
      state.orderCalc = {
        total: 0,
        tax: 0,
        grandTotal: 0,
      };
    },
  },
});

export const {
  setOrder,
  delOrder,
  setQuantity,
  manipulateQuantity,
  setOrderCalc,
  resetFoodOrder,
} = addOrderSlice.actions;
export default addOrderSlice.reducer;
