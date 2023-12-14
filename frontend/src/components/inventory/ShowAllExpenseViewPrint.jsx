import React from "react";
import { FaRegEdit, FaRupeeSign } from "react-icons/fa";
import {
  getCurrentDateWithDay,
  getformatDateTime,
  versionControl,
} from "../../utils/utils";
import EditExpensesView from "./EditExpensesView";
import logo from "../../assets/logo.png";
import Footer from "../Footer";
import { Link } from "react-router-dom";

const ShowAllExpenseViewPrint = ({ itemExpense, totalItemsAmount }) => {
  return (
    <div className="p-4">
      <div className="mb-10">
        <div>
          <img className="w-24 h-24 mx-auto" src={logo} alt="DHK LOGO" />
        </div>
        <h1 className="text-center text-3xl">DAK Hospitality LTD </h1>
        <p className="text-center">
          Print Date :{" "}
          <span className="text-center ml-2">
            {new Date().toLocaleDateString()}
          </span>
        </p>
      </div>

      <div>
        <div>
          <h1 className={`text-2xl text-center`}> Expenses Information</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Date</th>
                <th>Items Name</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Price</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {itemExpense?.items?.map((item, idx) => {
                return (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                  >
                    <th>{++idx}</th>
                    <td>{getformatDateTime(itemExpense?.date)}</td>
                    <td>{item?.name}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.description}</td>
                    <td>
                      <span>
                        <FaRupeeSign className="inline" />
                        {item?.price}
                      </span>
                    </td>
                    <td>{item?.remark}</td>
                    <td>
                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <EditExpensesView />
                        </div>
                      </dialog>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={`flex justify-end mr-14   md:ms-[20rem] mt-4 gap-2`}>
            <h1>Grand Total :</h1>
            <div>
              <FaRupeeSign className="inline" />

              <span>{totalItemsAmount}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <div className="mt-10">
          <div className=" w-full mb-10 signature">
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
          </div>
        </div> */}
        <h1 className="page-footer">
          Powered by{" "}
          <span className="text-xl text-green-slimy">JS Encoder</span>.
          Copyright © 2023. All rights reserved.Version {versionControl}
        </h1>
      </div>
    </div>
  );
};

export default ShowAllExpenseViewPrint;
