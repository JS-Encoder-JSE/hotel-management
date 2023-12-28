import React from "react";
import { getOnlyFormatDate, versionControl } from "../../utils/utils";
import logo from "../../assets/logo.png";

const ConfirmOrderPrint = ({ success, orderCalc }) => {
  const currentYear = new Date().getFullYear();
  // current date
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div>
      <div className={`text-center mb-6`}>
        <img className="w-24 h-24 mx-auto p-2" src={logo} alt="logo" />
        {/* <h1 className="font-bold text-2xl">DAK Hospital LTD</h1> */}
        <span>Customer Receipt</span> <br />
        <span>Issue Date: {getOnlyFormatDate()} </span>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr className={`text-lg`}>
              <th>Name</th>
              <th>
                Surveyor <br /> Quantity
              </th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {success?.map((food, idx) => (
              <tr>
                <td>{food?.item}</td>
                <td>{food?.serveyor_quantity}</td>
                <td>{food?.price}</td>
                <td>{food?.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className={`text-sm`}>
            <tr>
              <td colSpan={5}>
                <div className="mt-3">
                  <div className="pl-2 mb-4 w-[70%] text-[1rem] font-semibold">
                    <p className="flex gap-3">
                      Total Price :<span> {orderCalc.total}</span>
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <div>
          <div className="mt-10">
            {/* <div className=" w-full mb-10 signature">
              <div className="mx-8 flex justify-between ">
                <div>
                  <p>__________________</p>
                  <p>Guest Signature</p>
                </div>
                <div>
                  <p>_____________________</p>
                  <p>Authorized Signature</p>
                </div>
              </div>
            </div> */}
          </div>
          <h1 className="text-center pl-10 page-footer">
            Powered by{" "}
            <span className="text-xl text-green-slimy">JS Encoder</span>.
            Copyright © {currentYear}. All rights reserved.Version{" "}
            {versionControl}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderPrint;
