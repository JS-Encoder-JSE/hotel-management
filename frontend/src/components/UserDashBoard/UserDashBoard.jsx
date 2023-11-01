import React, { useState } from "react";
import {
  FaDollarSign,
  FaDollyFlatbed,
  FaUsers,
  FaCalendarDay,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";
import CustomerReservation from "./CustomerReservation";
import BookingChart from "./BookingChart";
import ReservationChart from "./ReservationChart";
import TotalBookingAmountAndNumber from "./TotalBookingAmountAndNumber";
import CustomerList from "./CustomerList";
import TodaysBooking from "./TodaysBooking";
import NextBooking from "./NextBooking";
import { useSelector } from "react-redux";

const UserDashBoard = () => {
  const { user } = useSelector((store) => store.authSlice);
  const [userHotel, setUserHotel] = useState(user.role === "manager" || user.role === "owner");

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-5">
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
            {userHotel ? <FaCalendarDay /> : <FaDollyFlatbed />}
          </div>
          <h6 className="text-xs text-slate-400">
            {userHotel ? "TODAY CHECK IN" : "TOTAL SELL"}
          </h6>
          <p className="text-2xl font-semibold mb-5">0</p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#309267] to-[#4ba555] p-3 rounded-md">
            <FaDollarSign />
          </div>
          <h6 className="text-xs text-slate-400">TOTAL AMOUNT</h6>
          <p className="text-2xl font-semibold mb-5">299m</p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#d32a26] to-[#d93935] p-3 rounded-md">
            <FaUsers />
          </div>
          <h6 className="text-xs text-slate-400">TOTAL CUSTOMER</h6>
          <p className="text-2xl font-semibold mb-5">2.1k</p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#23c4d8] to-[#03aec3] p-3 rounded-md">
            {userHotel ? <FaRegCalendarAlt /> : <MdAutorenew />}
          </div>
          <h6 className="text-xs text-slate-400">
            TOTAL {userHotel ? "CHECK IN" : "RENEW"}
          </h6>
          <p className="text-2xl font-semibold mb-5">750</p>
          <hr />
        </div>
      </section>

      <section className="bg-white p-3 mt-8 rounded shadow hover:shadow-md duration-200">
        <CustomerReservation userHotel={userHotel} />
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-5">
        <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
          <BookingChart userManager={userHotel} />
        </div>
        <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
          <ReservationChart userManager={userHotel} />
        </div>
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-5">
        {/* <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
          <TotalBookingAmountAndNumber />
        </div> */}
        <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
          <CustomerList />
        </div>
        {/* </section> */}

        {/* <section className="mt-8 grid md:grid-cols-2 gap-5"> */}
        {/* <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
          <TodaysBooking />
        </div> */}
        {userHotel && (
          <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
            <NextBooking />
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashBoard;
