import React, { useEffect, useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft
} from "react-icons/fa";
import { setQuantity } from "../../redux/add-order/addOrderSlice.js";
import { useNavigate } from 'react-router-dom';

const FoodCheckout = () => {
  const [input, setInput] = useState(1);
  const navigate = useNavigate();   
 
  const print = () =>{
    {window.print()}
  }
  return (
    <div className={`flex flex-col gap-5 bg-white rounded-lg p-10`}>
      <div>
          <span
            className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
        </div>
      <h3 className="text-2xl font-semibold text-center">Checkout</h3>
      <hr/>
      <div>
        <div className={`flex items-center gap-3 `}>
          <span className={`w-26`}>Room / Table No</span>
          <span>:</span>
          <span>512</span>
        </div>
        <div className={`flex items-center gap-3`}>
          <span className={`w-24`}>Invoice No</span>
          <span className="ms-7">:</span>
          <span>512123</span>
        </div>
      </div>
      <div className="overflow-x-auto border mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Surveyor <br /> Quantity
              </th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pizza</td>
              <td>1:2</td>
              {/* <td className="flex gap-1">
                <button
                  type="button"
                  className={input === 1 ? "btn-disabled opacity-50" : ""}
                  // onClick={() => {
                  //   input > 1 ? setInput((prevState) => --prevState) : null;
                  // }}
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  // value={input}
                  value={4}
                  className="input-hide_Arrows w-12 flex outline-none text-center rounded-md p-1 placeholder:text-black border focus:border-green-slimy"
                  // onChange={(e) => {
                  //   if (e.target.value > 0 || e.target.value === "")
                  //     setInput(e.target.value);
                  // }}
                  // onBlur={(e) => {
                  //   dispatch(setQuantity({ food, quantity: +e.target.value }));
                  // }}
                />
                <button
                  type="button"
                  // onClick={() => setInput((prevState) => ++prevState)}
                >
                  <FaPlus />
                </button>
              </td> */}.
              <td className="flex gap-3 mb-4">
        <button
          type="button"
          className={input === 1 ? "btn-disabled opacity-50" : ""}
          onClick={() => {
            input > 1 ? setInput((prevState) => --prevState) : null;
          }}
        >
          <FaMinus />
        </button>
        <input
          type="number"
          value={input}
          className="input-hide_Arrows w-12 flex outline-none text-center rounded-md p-1 placeholder:text-black border focus:border-green-slimy"
          onChange={(e) => {
            if (e.target.value > 0 || e.target.value === "")
              setInput(e.target.value);
          }}
          // onBlur={(e) => {
          //   dispatch(setQuantity({ food, quantity: +e.target.value }));
          // }}
        />
        <button
          type="button"
          onClick={() => setInput((prevState) => ++prevState)}
        >
          <FaPlus />
        </button>
      </td>
              <td>22</td>
              <td>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-400 transition-colors duration-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>500</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <tfoot className={`text-sm `}>
                  <tr>
                    <td colSpan={5}>
                      <div className="mt-3 ">
                        <div className="">
                          <p className="flex justify-between text-1xl">
                            Total Price :
                             <span>{orderCalc.total}
                            </span>
                          </p>
                          <p className="flex justify-between text-1xl">
                            Tax : 
                            <span>{orderCalc.tax}</span>
                          </p>
                          <p className="flex justify-between text-1xl">
                            Grand Total: 
                            <span>{orderCalc.grandTotal}</span>
                          </p>
                        </div>
                       
                      </div>
                    </td>
                  </tr>
                </tfoot> */}
      <div className={`flex gap-4 justify-end mt-4`}>
        <button className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        onClick={() => print()}
        >        
          Print
        </button>
        <button className="btn btn-sm hover:bg-green-slimy bg-transparent hover:text-white text-green-slimy !border-green-slimy rounded normal-case">
          Checkout
        </button>
      </div>
    
    </div>
  );
};

export default FoodCheckout;
