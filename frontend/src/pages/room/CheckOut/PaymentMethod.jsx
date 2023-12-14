import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
// const [discount, setDiscount] = useState(false);

const PaymentMethod = ({
  paymentList,
  handleAdd,
  handleRemove,
  handleChange,
  totalRefund,
  pBill,
  roomData,
  trxError
}) => {

const [isRequired,setRequired]=useState("")
console.log(trxError)
//   // form validation
// const validationSchema = yup.object({
//   room_arr: yup.array().required("Room IDs are required"),
//   // hotel_id: yup.string().required("Hotel ID is required"),
//   guestName: yup.string().required("Guest name is required"),
//   address: yup.string().required("Address is required"),
//   mobileNumber: yup.string().required("Mobile number is required"),
//   emergency_contact: yup.string().required("Emergency contact is required"),
//   adult: yup
//     .number()
//     .required("Adult is required")
//     .positive("Adult must be a positive number")
//     .integer("Adult must be an integer"),
//   //   children: yup.number().when([], {
//   //   is: (children) => children && children.length > 0,
//   //   children: yup
//   //     .number()
//   //     .positive("Children must be a positive number")
//   //     .integer("Children must be an integer"),
//   // }),
//   children: yup.number(),

//   paymentMethod: yup.string().required("Payment method is required"),
//   trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
//     if (paymentMethod !== "Cash")
//       return schema.required("Transaction ID is required");
//     else return schema;
//   }),

//   from: yup.string().required("From Date is required"),
//   to: yup.string().required("To Date is required"),
//   amount: yup.number(),
//   nationality: yup.string().required("Nationality is required"),
//   bookingMethod: yup.string().required("Booking method is required"),
// });
  const paymentSchema = yup.object({
    // method: yup.string().required("Payment method is required"),
    // amount: yup.number().required("Amount is required"),
    trx: yup.string().when(["method"], ([method], schema) => {
      if (method !== "Cash")
        return schema.required("Transaction ID is required");
      else return schema;
    }),

    // date: yup.date().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: paymentList,
    validationSchema: yup.array().of(paymentSchema),
  });
console.log(paymentList)
  return (
    <div className={`mt-5 space-y-3`}>
      {paymentList.map((elem, idx) => {
        return (
          <>
            <div className="relative grid grid-cols-2 gap-4 pt-2 px-14">
              <div className="flex flex-col gap-3">
                <select
                  name={`method`}
                  className="select select-sm bg-transparent select-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  onChange={(e) => handleChange(e, idx)}
                  value={elem.method}
                >
                  <option value="" selected disabled>
                    Payment Method
                  </option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Mobile_Banking">Mobile Banking</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <input
                  type="number"
                  value={elem.amount}
                  onWheel={(event) => event.currentTarget.blur()}
                  disabled={
                    !elem?.method
                  }
                  placeholder="Amount"
                  name="amount"
                  className={`input input-sm input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2 
                  ${!elem?.method ? "cursor-not-allowed" : ""}
                  `}
                  onChange={(e) => handleChange(e, idx)}
                />
              </div>
              {elem?.method && elem?.method !== "Cash" ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Trx ID"
                    value={elem.trx}
                    name="trx"
                    className="input input-sm input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
                    onChange={(e) => handleChange(e, idx)}
                  />
                 {Boolean(trxError) ? (
                    <small className="text-red-600">
                      Trx ID is Required
                    </small>
                  ) : null}
                </div>
              ) : null}
              
              <div className="flex flex-col gap-3">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="date"
                  placeholderText={`Date`}
                  selected={elem.date}
                  className={`input input-sm bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
                  onChange={(date) =>
                    handleChange({ target: { name: "date", value: date } }, idx)
                  }
                />
              </div>
              {paymentList.length !== 1 && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 right-5 flex justify-end text-red-600 hover:text-green-slimy cursor-pointer transition-colors duration-500 `}
                  onClick={() => handleRemove(idx)}
                >
                  <FaTrash />
                </div>
              )}
            </div>
            {/* <div className={`px-14 pb-4`}>
              {paymentList.length - 1 === idx && (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case w-fit mt-4"
                >
                  Add more
                </button>
              )}
            </div> */}
          </>
        );
      })}
    </div>
  );
};

export default PaymentMethod;
