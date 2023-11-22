import PaymentMethod from "./PaymentMethod";
import CustomerInfoSection from "./CustomerInfoSection";
import RoomDetailsSection from "./RoomDetailsSection";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import PaymentMethodPrint from "./PaymentMethodPrint";
import BalanceDetailsPrint from "./BalanceDetailsPrint";
import CustomerInfoPrint from "./CustomerInfoPrint";
import { useSelector } from "react-redux";
import AuthoInfoPrint from "./AuthoInfoPrint";
import logo from "../../../assets/logo.png";
import BillingSection from "./BillingSection";
import BillingSectionPrint from "./BillingSectionPrint";
import { useGetHotelByManagerIdQuery } from "../../../redux/room/roomAPI";

// current date
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;

const CheckOutPrint = ({
  data,
  paymentList,
  setPll,
  hotelInfo,
  isHotelSuccess,
}) => {
  return (
    <div>
      <div>
        <div className={`text-center mb-6`}>
          <img className="w-24 h-24 mx-auto p-2" src={logo} alt="logo" />
          <h1 className="font-bold text-2xl">DAK Hospital LTD</h1>
          <span>Customer Receipt</span> <br />
          <span>Issue Date: {formattedDate} </span>
        </div>
      </div>
      {isHotelSuccess && (
        <div className="px-4 mt-10 flex justify-between mx-10">
          <AuthoInfoPrint
            hotelInfo={hotelInfo}
            isHotelSuccess={isHotelSuccess}
          />
          <CustomerInfoPrint data={data} />
        </div>
      )}
      <RoomDetailsSection data={data} />

      {/* <div>
        <div className={`mt-5 space-y-3`}>
          {paymentList.map((elem, idx) => {
            return (
              <>
                <div className="relative grid grid-cols-2 gap-4 pt-2 px-4">
                  <div className="flex flex-col gap-3">
                    <select
                      name={`method`}
                      className="bg-transparent  rounded focus:outline-none focus:border-green-slimy"
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
                      placeholder="Amount"
                      name="amount"
                      className={`input input-sm bg-transparent rounded w-full  focus:outline-none p-2 
                  ${!elem?.method ? "btn-disabled" : ""}
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
                        className="input input-sm bg-transparent rounded w-full  focus:outline-none p-2"
                        onChange={(e) => handleChange(e, idx)}
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-3">
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      name="date"
                      placeholderText={`Date`}
                      selected={elem.date}
                      className={`input input-sm bg-transparent rounded focus:outline-none focus:border-green-slimy w-full`}
                      onChange={(date) =>
                        handleChange(
                          { target: { name: "date", value: date } },
                          idx
                        )
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
              </>
            );
          })}
        </div>
      </div> */}
      {/* <PaymentMethod paymentList={paymentList} /> */}
      {/* <div>
        {paymentList?.map((method) => (
          <table className="collapse">
            <tr className="border-1 border-black">
              <th>Method</th>
              <th>Amount</th>
              <th>Trx</th>
              <th>Date</th>
            </tr>
            <tr>
              <td>Method</td>
              <td>Amount</td>
              <td>Trx</td>
              <td>Date</td>
            </tr>
          </table>
        ))}
      </div> */}
      {/* payment method */}
      <div className="w-[800px] mx-auto flex justify-between items-center px-4">
        {paymentList.map(
          (method) =>
            method.method &&
            method.amount !== "" && (
              <PaymentMethodPrint paymentList={paymentList} />
            )
        )}
        <BillingSectionPrint />
        {/* <BalanceDetailsPrint colAmount={colAmount} pBill={pBill} /> */}
      </div>
      <div className="text-xs px-4 mt-10">
        <h1 className="font-semibold">TERMS & CONDITIONS</h1>
        <ol className="list-decimal p-4 text-gray-500">
          <li>
            Terms of Use Our Site may use "cookies"to enhance User experience
          </li>
          <li>
            User's web browser places cookies on their hard drive for
            record-keeping purposes and sometimes to track information about
            them
          </li>
          <li>
            User may choose to set their web browser to refuse cookies, or to
            alert you when cookies are being sen
          </li>
          <li>
            If they do so, note that some parts of the Site may not function
            properly
          </li>
        </ol>
      </div>
      <div className="absolute bottom-0 w-full my-10">
        <div className="p-4 flex justify-between">
          <div>
            <p>__________________</p>
            <p>Guest Signature</p>
          </div>
          <div>
            <p>_______________________</p>
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>
      <h1 className="text-center absolute bottom-0 pb-2 w-full">
        Powered by <span className="text-xl text-green-slimy">JS Encoder</span>.
        Copyright © 2023. All rights reserved.
      </h1>
    </div>
  );
};
export default CheckOutPrint;
