import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Preloader from "./components/Preloader.jsx";
import Header from "./components/Header.jsx";

const Root = () => {
  const location = useLocation();
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
        <>
          {location.pathname !== "/" ? <Header isHbMenu={isHbMenu} setHbMenu={setHbMenu} /> : null}
          <Outlet context={{isHbMenu, setHbMenu}} />
        </>
      )}
      <Toaster />
    </>
  );
};

export default Root;
