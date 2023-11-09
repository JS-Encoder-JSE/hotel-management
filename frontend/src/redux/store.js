import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createTransform, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth/authSlice.js";
import addOrderSlice from "./add-order/addOrderSlice.js";
import baseAPI from "./baseAPI.js";
import inventorySlice from "./inventory/inventorySlice.js";

const authSliceTransform = createTransform(
  (inboundState, key) => {
    if (key === "authSlice")
      return {
        token: inboundState.token,
        isUserLoading: true,
      };
    else return inboundState;
  },

  (outboundState, key) => {
    if (key === "authSlice")
      return {
        token: outboundState.token,
        isUserLoading: true,
      };
    else return outboundState;
  },
);

const authPersistConfig = {
  key: "auth",
  storage,
  transforms: [authSliceTransform],
  whitelist: ["authSlice"],
};

const rootReducer = combineReducers({
  authSlice,
  addOrderSlice,
  inventorySlice,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
