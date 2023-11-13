import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={`bg-white py-5 -mb-10 mt-10 text-center`}>
      <div className="container">
        <div>
          <h3>
            Powered by{" "}
            <Link className={`text-green-slimy text-lg font-semibold`} to={``}>
              JS Encoder
            </Link>
            . Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
