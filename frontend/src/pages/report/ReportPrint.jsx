import React, { useEffect, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import ReportManagerPrint from "./ReportManagerPrint";
import { useGetCheckoutDataByBookingIdQuery, useGetHotelByManagerIdQuery } from "../../redux/room/roomAPI";
const ReportPrint = ({ booking_id,hotelInfo }) => {
  const componentRef = useRef();
  const { data: getCheckoutData } =
    useGetCheckoutDataByBookingIdQuery(booking_id);
  
  return (
    <>
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => (
          <button
            onClick={() => {}}
            className="bg-green-slimy text-white px-2 rounded-md py-2"
          >
            <FaPrint className="inline" /> Print
          </button>
        )}
        onBeforeGetContent={() => {}}
      ></ReactToPrint>
      <div className="hidden">
        <div ref={componentRef}>
          <ReportManagerPrint hotelInfo={hotelInfo} data={getCheckoutData} />
        </div>
      </div>
    </>
  );
};

export default ReportPrint;