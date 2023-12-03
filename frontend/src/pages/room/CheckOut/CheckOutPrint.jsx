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
  roomData,
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
      {roomData?.length
        ? roomData?.map((roomInfo, i) => (
            <RoomDetailsSection roomData={roomInfo} />
          ))
        : null}
        
      {/* payment method */}
      <div className="w-[800px] mx-auto flex justify-between items-center px-4">
        {paymentList?.map(
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
        Copyright © 2023. All rights reserved.Version 01.0.0
      </h1>
    </div>
  );
};
export default CheckOutPrint;
