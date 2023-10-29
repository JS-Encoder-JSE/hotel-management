import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";

const PaymentSection = () => {
  const animatedComponents = makeAnimated();

  const [paymentList, setPaymentList] = useState(1);
  const [selectCashPayment, setSelectCashPayment] = useState(true);
  const [checkoutBtn, setCheckoutBtn] = useState(true);
  const [remainAmount, setRemainAmount] = useState(5493.0);
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [changeAmount, setChangeAmount] = useState(collectedAmount);

  const formik = useFormik({
    initialValues: {
      startDate: "",
    },
  });

  const paymentModeList = [
    { value: "null", label: "Choose Payment Mode" },
    { value: "Mobile Banking", label: "Mobile Banking" },
    { value: "Cash Payment", label: "Cash Payment" },
    { value: "Card Payment", label: "Card Payment" },
  ];

  // BackDoor -----> After adding more than 1 payment method all filed are using same state...
  const handlePaymentMode = (e) => {
    let value = e.value;

    if (value === "Mobile Banking") {
      setSelectCashPayment(false);
    } else if (value === "Cash Payment" || value === "null") {
      setSelectCashPayment(true);
    } else {
      setSelectCashPayment(false);
    }
  };

  const handleAmount = (e) => {
    const parseValue = parseFloat(e.target.value);
    const fixedValue = parseValue.toFixed(2);
    const value = parseFloat(fixedValue);
    setCollectedAmount(value);
    setChangeAmount(value - remainAmount);

    if (value >= remainAmount) {
      setCheckoutBtn(false);
    } else {
      setCheckoutBtn(true);
    }
  };

  return (
    <section>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Left Side */}
        <div className="bg-white rounded">
          <h3 className="p-5 text-xl">Credit</h3>
          <hr />
          <div className="p-5 grid grid-cols-3 gap-5 text-sm font-semibold">
            <div className="space-y-5">
              <p>Type</p>
              <p>($) Credit Amt.</p>
              <p>Remarks</p>
            </div>
            <div className="col-span-2 space-y-5">
              <div>
                <select
                  // onChange={handleDiscount}
                  className="border-b outline-none text-xs font-light w-full py-1"
                >
                  <option value="null">No Credit</option>
                  <option value="offer">Admin</option>
                  <option value="md Guest">Regular Customer</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  className="w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500"
                />
              </div>
              <div>
                <textarea
                  type="text"
                  className="border focus:border-green-slimy rounded-md p-2 bg-transparent outline-none w-full"
                ></textarea>
              </div>
            </div>
          </div>

          <h3 className="p-5 text-xl mt-5">Bill Statement</h3>
          <hr />
          <div className="grid grid-cols-7 gap-2 p-5">
            <div className="col-span-4 space-y-5">
              <div className="border-b border-black/20 py-1 mb-5">
                Payment Mode
              </div>
              {[...Array(paymentList)].map((_, index) => (
                <React.Fragment key={index}>
                  <div>
                    <Select
                      components={animatedComponents}
                      options={paymentModeList}
                      onChange={handlePaymentMode}
                      placeholder="Choose Payment Mode"
                      className={`text-xs ${selectCashPayment && "mb-[70px]"}`}
                    />
                  </div>
                  <div>
                    {!selectCashPayment && (
                      <input
                        type="number"
                        required
                        placeholder="Transaction ID"
                        className={`hide-number-arrow-input input-hide_Arrows w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500`}
                      />
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="col-span-2 space-y-5">
              <div className="border-b border-black/20 py-1 mb-5">Amount</div>
              {[...Array(paymentList)].map((_, index) => (
                <React.Fragment key={index}>
                  <div>
                    <input
                      type="number"
                      required
                      placeholder="Amount"
                      onChange={handleAmount}
                      className={`w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500 hide-number-arrow-input`}
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      name={`startDate`}
                      className={`input input-sm input-bordered rounded focus:outline-none w-full mt-1`}
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="col-span-1 text-center">
              <div className="border-b border-black/20 py-1 mb-5">Action</div>
              {[...Array(paymentList)].map((_, index) => (
                <button
                  key={index}
                  disabled={paymentList === 1}
                  onClick={() => setPaymentList((prev) => prev - 1)}
                  className={`mb-20 ${
                    paymentList === 1 && "opacity-40"
                  } border border-green-slimy hover:bg-green-slimy text-green-slimy hover:text-white duration-300 text-xl p-1 rounded w-fit`}
                >
                  <AiOutlineCloseCircle />
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 flex justify-end">
            <button
              onClick={() => setPaymentList((prev) => prev + 1)}
              disabled={paymentList === 3}
              className={`border border-green-slimy hover:bg-green-slimy text-3xl text-green-slimy hover:text-white duration-300 rounded ${
                paymentList === 3 && "opacity-40"
              }`}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white rounded">
          <h3 className="p-5 text-xl">Special Discount</h3>
          <hr />
          <div className="p-5 grid grid-cols-3 gap-5 text-sm font-semibold">
            <div className="space-y-5">
              <p>Type</p>
              <p>($) Credit Amt.</p>
              <p>Remarks</p>
            </div>
            <div className="col-span-2 space-y-5">
              <div>
                <select
                  // onChange={handleDiscount}
                  className="border-b outline-none text-xs font-light w-full py-1"
                >
                  <option value="null">No Credit</option>
                  <option value="offer">Admin</option>
                  <option value="md Guest">Regular Customer</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  className="w-full outline-none border focus:border-green-slimy rounded mr-1 p-1 text-slate-500"
                />
              </div>
              <div>
                <textarea
                  type="text"
                  className="border focus:border-green-slimy rounded-md p-2 bg-transparent outline-none w-full"
                ></textarea>
              </div>
            </div>
          </div>

          <h3 className="p-5 text-xl mt-5">Balance Details</h3>
          <hr />

          <div className="p-5 grid grid-cols-3 items-center text-sm font-semibold">
            <div className="space-y-3">
              <p>Remain Amt.</p>
              <p>Collected Amt.</p>
              <p>Change Amt.</p>
            </div>
            <div className="col-span-2 space-y-3">
              <p>$ {remainAmount.toFixed(2)}</p>
              <p>$ {collectedAmount.toFixed(2)}</p>
              <p>
                ${" "}
                {collectedAmount > remainAmount
                  ? changeAmount.toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-5">
        <button className="p-2 bg-[#28a745] text-xl text-white duration-300 rounded active:scale-90">
          Print
        </button>
        <button
          disabled={checkoutBtn}
          className={`p-2 bg-[#64bece] text-xl text-white duration-300 rounded active:scale-90 ${
            checkoutBtn && "opacity-40 active:scale-100"
          }`}
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

export default PaymentSection;
