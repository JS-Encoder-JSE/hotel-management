import React from "react";
import { Link } from "react-router-dom";
import { versionControl } from "../utils/utils";

const Footer = () => {
  return (
    <footer className={`bg-white py-5 -mb-10 mt-10 text-center`}>
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
  );
};

export default Footer;
