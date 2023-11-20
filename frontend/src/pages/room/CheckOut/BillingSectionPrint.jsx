import React, { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useSelector } from "react-redux";

const BillingSectionPrint = ({
  data,
  totalBilling,
  setTotalBilling,
  setPBill,
}) => {
  const billingState = useSelector((state) => state.checkoutInfoCalSlice);
  const {
    subTotals,
    tax,
    serviceCharge,
    additionalCharge,
    discountOffer,
    grandTotal,
    roomPostedBill,
  } = billingState;
  //   const [discount, setDiscount] = useState(false);
  //   const [discountAmt, setDiscountAmt] = useState(0);
  //   const [breakAmt, setBreakAmt] = useState(0);
  //   const [billing, setBilling] = useState([{ amount: "" }, { amount: "" }]);

  //   const [poolBill, setPollBill] = useState(0);
  //   const [barBill, setBarBill] = useState(0);
  //   const [foodBill, setFoodBill] = useState(0);
  //   const [gymBill, setGymBill] = useState(0);

  //   const handleDiscountChange = (val) => {
  //     const newValue = Math.min(Math.max(val, 0), 100);
  //     const amount =
  //       (data?.booking_info?.[0]?.total_unpaid_amount * newValue) / 100;

  //     setDiscountAmt(amount);
  //   };

  //   const handleAmountChange = (idx, val) => {
  //     const arr = [...billing];

  //     arr.splice(idx, 1, { amount: val });
  //     setBilling(arr);
  //   };

  //   const handleTaxChange = (idx, val) => {
  //     const arr = [...billing];
  //     const amount = (data?.booking_info?.[0]?.total_unpaid_amount * val) / 100;

  //     arr.splice(idx, 1, { amount });
  //     setBilling(arr);
  //   };

  //   useEffect(() => {
  //     const totalBilling = billing.reduce(
  //       (total, current) =>
  //         total + (Boolean(current?.amount) ? +current.amount : 0),
  //       0
  //     );

  //     setTotalBilling?setTotalBilling(totalBilling):null;
  //   }, [billing]);

  //   useEffect(() => {
  //     if (data) {
  //       setPollBill(
  //         data?.pool_bills?.reduce(
  //           (total, current) => total + current?.unpaid_amount,
  //           0
  //         )
  //       );
  //       setFoodBill(
  //         data?.food_bills?.reduce(
  //           (total, current) => total + current?.unpaid_amount,
  //           0
  //         )
  //       );
  //       setBarBill(
  //         data?.bar_bills?.reduce(
  //           (total, current) => total + current?.unpaid_amount,
  //           0
  //         )
  //       );
  //       setGymBill(
  //         data?.gym_bills?.reduce(
  //           (total, current) => total + current?.unpaid_amount,
  //           0
  //         )
  //       );
  //     }
  //   }, [data]);

  //   useEffect(() => {
  //     if (data) {
  //       const total =
  //         poolBill +
  //         foodBill +
  //         barBill +
  //         gymBill +
  //         (data?.booking_info?.[0]?.total_unpaid_amount +
  //           totalBilling -
  //           (discount ? discountAmt : 0) +
  //           breakAmt);

  //       setPBill(total);
  //     }
  //   }, [
  //     data,
  //     poolBill,
  //     foodBill,
  //     barBill,
  //     gymBill,
  //     totalBilling,
  //     discount,
  //     discountAmt,
  //     breakAmt,
  //   ]);

  return (
    <section>
      <div className=" grid grid-cols-2 gap-10">
        <div className="space-y-4">
          <p>SubTotal</p>
          <p>Tax</p>
          <p>Additional Changes</p>
          <p>Service Charge</p>
          <p>Room Posted Bill</p>
          <p className="text-lg font-bold">GrandTotal</p>
        </div>
        <div className="space-y-4">
          <p>: ${subTotals}</p>
          <p>: ${tax}</p>
          <p>: ${additionalCharge}</p>
          <p>: ${serviceCharge}</p>
          <p>: ${roomPostedBill}</p>
          <p>: ${grandTotal}</p>
        </div>
      </div>
    </section>
  );
};

export default BillingSectionPrint;
