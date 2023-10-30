import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "./baseAPI.js";
import authSlice from "./auth/authSlice.js";
import addOrderSlice from "./add-order/addOrderSlice.js";

const store = configureStore({
  reducer: {
    authSlice,
    addOrderSlice,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export default store;
