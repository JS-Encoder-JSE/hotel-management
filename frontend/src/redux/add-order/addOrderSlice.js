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
    setSerQuantity: (state, action) => {
      const findFoodIdx = state.order.foods.findIndex(
        (item) => item._id === action.payload.food._id,
      );

      if (action.payload.serQuantity) {
        state.order.foods.splice(findFoodIdx, 1, {
          ...action.payload.food,
          serveyor_quantity: action.payload.serQuantity,
        });
      } else {
        state.order.foods.splice(findFoodIdx, 1, {
          ...action.payload.food,
          serveyor_quantity: "1:1",
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
  },
});

export const {
  setOrder,
  delOrder,
  incQuantity,
  decQuantity,
  setQuantity,
  setSerQuantity,
  setOrderCalc,
} = addOrderSlice.actions;
export default addOrderSlice.reducer;
