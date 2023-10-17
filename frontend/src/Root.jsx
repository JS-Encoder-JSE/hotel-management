import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Preloader from "./components/Preloader.jsx";

const Root = () => {
  const [preloader, setPreloader] = useState(true);

  return (
    <>
      {preloader ? <Preloader setPreloader={setPreloader} /> : <Outlet />}
      <Toaster />
    </>
  );
};

export default Root;
