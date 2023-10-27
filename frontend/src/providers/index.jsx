import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "../redux/store.js";
import AuthProvider from "./AuthProvider.jsx";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </AuthProvider>
  );
};

export default Providers;
