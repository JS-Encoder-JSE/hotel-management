import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "../redux/store.js";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </>
  );
};

export default Providers;
