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
    incQuantity: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item.id === action.payload.id,
      );

      state.order.foods.splice(findFoodIdx, 1, {
        ...action.payload,
        quantity: action.payload.quantity + 1,
      });
    },
    decQuantity: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item.id === action.payload.id,
      );

      state.order.foods.splice(findFoodIdx, 1, {
        ...action.payload,
        quantity: action.payload.quantity - 1,
      });
    },
    setQuantity: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item.id === action.payload.food.id,
      );

      state.order.foods.splice(findFoodIdx, 1, {
        ...action.payload.food,
        quantity: action.payload.quantity,
      });
    },
    delFood: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item.id === action.payload.id,
      );

      state.order.foods.splice(findFoodIdx, 1);
    },
    setOrderCalc: (state, action) => {
      const total = state.order.foods.reduce(
        (total, current) => total + current.quantity * current.price,
        0,
      );
      const tax = total * 0.03;
      const grandTotal = total + tax;

      state.orderCalc = {
        total,
        tax,
        grandTotal,
      };
    },
  },
});

export const {
  setOrder,
  incQuantity,
  decQuantity,
  setQuantity,
  setOrderCalc,
  delFood,
} = addOrderSlice.actions;
export default addOrderSlice.reducer;
