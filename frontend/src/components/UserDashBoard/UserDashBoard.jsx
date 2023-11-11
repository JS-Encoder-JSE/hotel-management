import React, { useState } from "react";
import {
  FaDollarSign,
  FaDollyFlatbed,
  FaUsers,
  FaCalendarDay,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";
import { BsFillSendCheckFill } from "react-icons/bs";
import CustomerReservation from "./CustomerReservation";
import BookingChart from "./BookingChart";
import ReservationChart from "./ReservationChart";
import TotalBookingAmountAndNumber from "./TotalBookingAmountAndNumber";
import CustomerList from "./CustomerList";
import TodaysBooking from "./TodaysBooking";
import NextBooking from "./NextBooking";
import { useSelector } from "react-redux";
import { GiCoins } from "react-icons/gi";
import { GrCurrency } from "react-icons/gr";

const UserDashBoard = () => {
  const { user } = useSelector((store) => store.authSlice);
  const [userHotel, setUserHotel] = useState(
    user.role === "manager" || user.role === "owner" 
  );

  return (
    <div>
      <section className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-2.5`}>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
            {userHotel ? <FaCalendarDay /> : <FaDollyFlatbed />}
          </div>
          <h6 className="text-xs text-slate-400">
            {userHotel ? "TODAY CHECK IN" : "TOTAL SELL"}
          </h6>
          <p className="text-2xl font-semibold mt-3">0</p>
          <hr />
            {user.role === "manager" ? (
  <div>
  <h6 className="text-xs text-slate-400 mt-4">
    TODAY {userHotel ? "  CHECK OUT" : "RENEW"}
  </h6>
  <p className="text-2xl font-semibold mt-4">
    750</p>
</div>
            ):user.role === "owner" ? (
              <div>
              <h6 className="text-xs text-slate-400 mt-4">
                TODAY {userHotel ? "  CHECK OUT" : "RENEW"}
              </h6>
              <p className="text-2xl font-semibold mt-4">
                750</p>
            </div>
            ):""
          }
        
        </div>
        {/* Total Amount */}
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#309267] to-[#4ba555] p-3 rounded-md">
            {/* <FaDollarSign /> */}
            <GiCoins className={`db-currency text-white`} />
          </div>
          <h6 className="text-xs text-slate-400 ">TOTAL AMOUNT</h6>
          <p className="text-2xl font-semibold mt-4">299m</p>
          <hr />
        </div>
        {user.role === "admin" ?  (
          <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#d32a26] to-[#d93935] p-3 rounded-md">
            <FaUsers />
          </div>
        <div>
         <h6 className="text-xs text-slate-400">
            TOTAL CUSTOMER</h6>
          <p className="text-2xl font-semibold mt-4">2.1k</p>
          <hr />
         </div>
        </div> 
        ) :user.role === "subadmin" ? (
          <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#d32a26] to-[#d93935] p-3 rounded-md">
            <FaUsers />
          </div>
        <div>
         <h6 className="text-xs text-slate-400">
            TOTAL CUSTOMER</h6>
          <p className="text-2xl font-semibold mt-4">2.1k</p>
          <hr />
         </div>
        </div>
        ) :""
      
      }
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#23c4d8] to-[#03aec3] p-3 rounded-md">
            {userHotel ? <FaRegCalendarAlt /> : <MdAutorenew />}
          </div>
          <h6 className="text-xs text-slate-400 ">
            TOTAL {userHotel ? "CHECK IN" : "RENEW"}
          </h6>
          <p className="text-2xl font-semibold mt-4">750</p>
          <hr />
          {user.role === "manager" ? (
               <div>
               <h6 className="text-xs text-slate-400 mt-4">
           TOTAL {userHotel ? "  CHECK OUT" : "Renew "}
         </h6>
         <p className="text-2xl font-semibold mt-4">750</p>
       </div>
            ) :user.role === "owner" ?  (
              <div>
              <h6 className="text-xs text-slate-400 mt-4">
          TOTAL {userHotel ? "  CHECK OUT" : "Renew "}
        </h6>
        <p className="text-2xl font-semibold mt-4">750</p>
      </div>
            ) :""
          }
          
           
        </div>
        {/* <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200 mt-3">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#23c4d8] to-[#03aec3] p-3 rounded-md">
            {userHotel ? <BsFillSendCheckFill /> : <MdAutorenew />}
          </div>
          <h6 className="text-xs text-slate-400">
            TOTAL {userHotel ? "CHECK Out" : "RENEW"}
          </h6>
          <p className="text-2xl font-semibold mb-5">750</p>
          <hr />
        </div> */}
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

        {/* customer list */}
        {/* <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
          <CustomerList />
        </div> */}
        {/* </section> */}

        {/* <section className="mt-8 grid md:grid-cols-2 gap-5"> */}
        {/* <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
          <TodaysBooking />
        </div> */}

        {/* NextBooking box */}
        {/* {userHotel && (
          <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
            <NextBooking />
          </div>
        )} */}
      </section>
    </div>
  );
};

export default UserDashBoard;
