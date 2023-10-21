import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Preloader from "./components/Preloader.jsx";

const Root = () => {
  const [preloader, setPreloader] = useState(true);
  const [isHbMenu, setHbMenu] = useState(true);

  const handleResize = () => {
    if (innerWidth >= 768) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {preloader ? (
        <Preloader setPreloader={setPreloader} />
      ) : (
        <Outlet context={{ isHbMenu, setHbMenu }} />
      )}
      <Toaster />
      <ScrollRestoration />
    </>
  );
};

export default Root;
