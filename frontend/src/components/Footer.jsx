import React from "react";

const Footer = () => {
  return (
    <footer
      className={`bg-sky-50 py-5 -mb-10 mt-10 text-center text-lg font-semibold`}
    >
      <div className="container">
        <div>
          <h3>
            {new Date().getFullYear()} Copyright &copy;{" "}
            <span className={`text-green-slimy`}>JS Encoder</span>
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
