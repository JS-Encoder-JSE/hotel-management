import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { setQuantity } from "../../redux/add-order/addOrderSlice.js";

const FoodCheckout = () => {
  return (
    <div className={`flex flex-col gap-5 bg-white rounded-lg p-10`}>
      <h3>Checkout</h3>
      <hr/>
      <div>
        <div className={`flex items-center gap-2`}>
          <span className={`w-24`}>Room / Table No</span>
          <span>:</span>
          <span>512</span>
        </div>
        <div className={`flex items-center gap-2`}>
          <span className={`w-24`}>Invoice No</span>
          <span>:</span>
          <span>512123</span>
        </div>
      </div>
      <div className="overflow-x-auto border">
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
              <td className="flex gap-1">
                <button
                  type="button"
                  // className={input === 1 ? "btn-disabled opacity-50" : ""}
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
      <div className={`flex gap-1.5 justify-end`}>
        <button className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
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
