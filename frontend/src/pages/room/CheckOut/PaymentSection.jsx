import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import PaymentMethod from "./PaymentMethod.jsx";

const PaymentSection = () => {
  const [colAmount, setColAmount] = useState(0);
  const [checkoutBtn, setCheckoutBtn] = useState(true);
  const [remainAmount, setRemainAmount] = useState(5493.0);
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [changeAmount, setChangeAmount] = useState(collectedAmount);

  const [paymentList, setPaymentList] = useState([
    { method: "", amount: "", trx: "", date: "" },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...paymentList];
    list[index][name] = value;
    setPaymentList(list);
  };

  const handleRemove = (index) => {
    const list = [...paymentList];
    list.splice(index, 1);
    setPaymentList(list);
  };

  const handleAdd = () => {
    setPaymentList([
      ...paymentList,
      { method: "", amount: "", trx: "", date: "" },
    ]);
  };

  useEffect(() => {
    const totalCol = paymentList.reduce(
      (total, current) =>
        total + (Boolean(current.amount) ? +current.amount : 0),
      0,
    );

    setColAmount(totalCol);
  }, [paymentList]);

  return (
    <section>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Left Side */}
        <div className="bg-white rounded">
          {/* bill statement */}
          <h3 className="p-5 text-xl mt-5">Bill Statement</h3>
          <hr />
          <PaymentMethod
            paymentList={paymentList}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleChange={handleChange}
          />
        </div>
        {/* Right Side */}
        <div className="bg-white rounded">
          <h3 className="p-5 text-xl mt-5">Balance Details</h3>
          <hr />

          <div className="p-5 grid grid-cols-3 items-center text-sm font-semibold">
            <div className="space-y-3">
              <p>Remain Amount</p>
              <p>Collected Amount</p>
              <p>Change Amount</p>
            </div>
            <div className="col-span-2 space-y-3">
              <p>$ {remainAmount.toFixed(2)}</p>
              <p>$ {colAmount.toFixed(2)}</p>
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
