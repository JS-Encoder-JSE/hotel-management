import React from "react";
import { Link } from "react-router-dom";
import { versionControl } from "../utils/utils";

const Footer = () => {
  return (
   <div className="h-[39px] w-full mb-10">
     <footer className={`bg-white py-5 text-center absolute bottom-0 w-full
     `}>
      <div className="container">
        <div>
          <h3>
            Powered by{" "}
            <Link className={`text-green-slimy text-lg font-semibold`} to={`https://jsencoder.com/`} target="_blank">
              JS Encoder
            </Link>
            . Copyright &copy; {new Date().getFullYear()}. All rights reserved. Version {versionControl} </h3>
        </div>
      </div>
    </footer>
   </div>

  );
};

export default Footer;
