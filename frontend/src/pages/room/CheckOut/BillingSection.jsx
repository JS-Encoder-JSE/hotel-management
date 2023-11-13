import React, { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";

const BillingSection = ({ setTotalBilling }) => {
  const [discount, setDiscount] = useState(false);
  const [billing, setBilling] = useState([
    { amount: "" },
    { amount: "" },
    { amount: "" },
  ]);

  const handleDiscountChange = (idx, val) => {
    const arr = [...billing];

    arr.splice(idx, 1, { amount: val });
    setBilling(arr);
  };

  const handleAmountChange = (idx, val) => {
    const arr = [...billing];

    arr.splice(idx, 1, { amount: val });
    setBilling(arr);
  };

  const handleTaxChange = (idx, val) => {
    const arr = [...billing];

    arr.splice(idx, 1, { amount: val });
    setBilling(arr);
  };

  useEffect(() => {
    const totalBilling = billing.reduce(
      (total, current) =>
        total + (Boolean(current?.amount) ? +current.amount : 0),
      0,
    );

    setTotalBilling(totalBilling);
  }, [billing]);

  return (
    <section className="grid lg:grid-cols-3 gap-5">
      <div className="bg-white rounded">
        <h3 className="p-5 text-xl">Billing Details</h3>
        <hr />
        <table className="text-sm font-semibold m-5">
          <tbody>
            <tr>
              <td>Total Unpaid Amount</td>
              <td className="align-top pl-2 pb-2">$100000</td>
            </tr>
            <tr>
              <td>
                <span>Discount (Max-100%)</span>
                <div className="grid grid-cols-2 mb-1">
                  <input
                    disabled={!discount}
                    type="number"
                    className={`outline-none border rounded mr-1 pl-2 text-slate-500 ${
                      !discount && "cursor-not-allowed"
                    }`}
                    onChange={(e) => handleDiscountChange(0, +e.target.value)}
                  />
                  <span>(%)</span>
                </div>
              </td>
              <td className="align-top pl-2 pb-2">
                <select
                  onChange={(e) => {
                    e.currentTarget.value === "offer"
                      ? setDiscount(true)
                      : setDiscount(false);
                  }}
                  className="border-b outline-none text-xs font-light"
                >
                  <option value="">No Discount</option>
                  <option value="offer">Extra Discount</option>
                </select>
              </td>
            </tr>
            <div className={`mt-5`}></div>
            <tr>
              <td>Discount Amount</td>
              <td className="align-top pl-2 pb-2">$0</td>
            </tr>
            <tr>
              <td>Service Charge</td>
              <td className="align-top pl-2 pb-2">
                <div className={`flex gap-1 items-center`}>
                  <span>$</span>
                  <input
                    type="number"
                    className={`outline-none border rounded mr-1 pl-2 text-slate-500`}
                    onChange={(e) => handleAmountChange(1, +e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Tax</td>
              <td className="align-top pl-2 pb-2">
                <div className={`flex gap-1 items-center`}>
                  <span>%</span>
                  <input
                    type="number"
                    className={`outline-none border rounded mr-1 pl-2 text-slate-500`}
                    onChange={(e) => handleTaxChange(2, +e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Total Amount With Tax</td>
              <td className="align-top pl-2 pb-2">$12150.00</td>
            </tr>
            <tr>
              <td>Payable Amount</td>
              <td className="align-top pl-2 pb-2">$12150.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded">
        <h3 className="p-5 text-xl">Additional Charges</h3>
        <hr />
        <table className="text-sm font-semibold m-5">
          <tbody>
            <tr>
              <td className="align-top">Additional Charges</td>
              <td className="pl-5">
                <input
                  type="number"
                  className="mb-3 border rounded-md p-2 outline-none"
                />
              </td>
            </tr>
            <tr>
              <td className="align-top">Additional Charges Comments</td>
              <td className="pl-5">
                <textarea className="border rounded-md p-2 bg-transparent outline-none resize-none"></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="p-5 text-xl mt-8">Payment Details</h3>
        <hr />
        <table className="text-sm font-semibold m-5">
          <tbody className="flex flex-col gap-3">
            <tr>
              <td>Net Payable Amount</td>
              <td>$12321.675</td>
            </tr>
            <tr>
              <td>Payable Amount</td>
              <td>$12321.675</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded">
        <h3 className="p-5 text-xl">Room Posted Bill</h3>
        <hr />
        <div className="text-sm font-semibold p-5">
          <div className="grid grid-cols-4 gap-2 border-y border-black/20 p-2">
            <p className="col-span-2">Bill Type</p>
            <p>($) Total</p>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4 opacity-80 font-extralight border-b border-black/20 pb-2 px-2">
            <p className="capitalize whitespace-nowrap col-span-2">
              Swimming Pool
            </p>
            <p>0</p>

            {/* Condition will apply here */}
            {/* <button className='bg-green-slimy hover:bg-green-slimy/70 text-white text-xl p-1 rounded'>
                        ------------------
                        </button> */}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4 opacity-80 font-extralight pb-2 px-2">
            <p className="capitalize whitespace-nowrap col-span-2">
              Restaurant
            </p>
            <p>171.675</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingSection;
