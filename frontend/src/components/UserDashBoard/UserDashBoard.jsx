import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaDollyFlatbed,
  FaUsers,
  FaCalendarDay,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";
import { BsClipboard2DataFill, BsFillSendCheckFill } from "react-icons/bs";
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
import { useGetDashboardInfoQuery } from "../../redux/dashboard/dashboardApi";
import { Rings } from "react-loader-spinner";
const dummyData = [
  {
    month_name: "November",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2022",
  },
  {
    month_name: "December",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2022",
  },
  {
    month_name: "January",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "February",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "March",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "April",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "May",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "June",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "July",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "August",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "September",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
  {
    month_name: "October",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
  },
];
const UserDashBoard = () => {
  const { user } = useSelector((store) => store.authSlice);
  const {
    data: dashboardData,
    isSuccess,
    isLoading,
    isError,
  } = useGetDashboardInfoQuery(user._id);

  console.log(dashboardData);
  const [userHotel, setUserHotel] = useState(
    user.role === "manager" || user.role === "owner"
  );
  useEffect(() => {}, []);
  if (isLoading || isError) {
    return (
      <Rings
        width="50"
        height="50"
        color="#37a000"
        wrapperClass="justify-center"
      />
    );
  }
  return (
    <>
      <div>
        <section
          className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-2.5`}
        >
          <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
            <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
              {userHotel ? <FaCalendarDay /> : <FaDollyFlatbed />}
            </div>
            <h6 className="text-xs text-slate-400">
              {userHotel ? "TODAY'S CHECK IN" : "TOTAL SELL"}
            </h6>
            <p className="text-2xl font-semibold mt-3">
              {Math.floor(
                userHotel
                  ? dashboardData?.daily_datas[0]?.today_checkin
                  : dashboardData?.permanent_datas?.total_sell_lic
              )}
              {}
            </p>
            <hr />
            {user.role === "manager" ? (
              <div>
                <h6 className="text-xs text-slate-400 mt-4">
                  TODAY'S {userHotel ? "  CHECK OUT" : "RENEW"}
                </h6>
                <p className="text-2xl font-semibold mt-4">
                  {Math.floor(dashboardData?.daily_datas[0]?.today_checkout)}
                </p>
              </div>
            ) : user.role === "owner" ? (
              <div>
                <h6 className="text-xs text-slate-400 mt-4">
                  TODAY'S {userHotel ? "  CHECK OUT" : "RENEW"}
                </h6>
                <p className="text-2xl font-semibold mt-4">750</p>
              </div>
            ) : (
              ""
            )}
          </div>
          {user.role === "manager" || user.role === "owner" ? (
            <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
              <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#282884] to-[#1616ff] p-3 rounded-md">
                <BsClipboard2DataFill />
              </div>
              <h6 className="text-xs text-slate-400 uppercase">
                TODAY'S Booking
              </h6>
              <p className="text-2xl font-semibold mt-3">
                {Math.floor(dashboardData?.daily_datas[0]?.today_booking)}
              </p>
              <hr />
              <h6 className="text-xs text-slate-400 mt-4">
                TODAY'S CANCEL BOOKING
              </h6>
              <p className="text-2xl font-semibold mt-4">
                {Math.floor(
                  dashboardData?.daily_datas[0]?.today_canceled_bookings
                )}
              </p>
            </div>
          ) : (
            ""
          )}
          {/* Total Amount */}
          <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
            <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#309267] to-[#4ba555] p-3 rounded-md">
              {/* <FaDollarSign /> */}
              <GiCoins className={`db-currency text-white`} />
            </div>
            <h6 className="text-xs text-slate-400 ">TOTAL AMOUNT</h6>
            <p className="text-2xl font-semibold mt-4">
              {Math.floor(dashboardData?.permanent_datas?.total_amount)}
            </p>
            <hr />
          </div>
          {user.role === "admin" || user.role === "subadmin" ? (
            <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
              <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#d32a26] to-[#d93935] p-3 rounded-md">
                <FaUsers />
              </div>
              <div>
                <h6 className="text-xs text-slate-400">TOTAL CUSTOMER</h6>
                <p className="text-2xl font-semibold mt-4">
                  {dashboardData?.permanent_datas?.total_customer}
                </p>
                <hr />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
            <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#23c4d8] to-[#03aec3] p-3 rounded-md">
              {userHotel ? <FaRegCalendarAlt /> : <MdAutorenew />}
            </div>
            <h6 className="text-xs text-slate-400 ">
              TOTAL {userHotel ? "CHECK IN" : "RENEW"}
            </h6>
            <p className="text-2xl font-semibold mt-4">
              {Math.floor(
                userHotel
                  ? dashboardData?.permanent_datas?.total_checkin
                  : dashboardData?.permanent_datas?.total_renew_lic
              )}
            </p>
            <hr />
            {user.role === "manager" ? (
              <div>
                <h6 className="text-xs text-slate-400 mt-4">
                  TOTAL {userHotel ? "  CHECK OUT" : "Renew "}
                </h6>
                <p className="text-2xl font-semibold mt-4">
                  {Math.floor(dashboardData?.permanent_datas?.total_checkout)}
                </p>
              </div>
            ) : user.role === "owner" ? (
              <div>
                <h6 className="text-xs text-slate-400 mt-4">
                  TOTAL {userHotel ? "  CHECK OUT" : "Renew "}
                </h6>
                <p className="text-2xl font-semibold mt-4">750</p>
              </div>
            ) : (
              ""
            )}
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
          <CustomerReservation
            monthlyData={[...dashboardData?.monthly_datas, ...dummyData]}
            userHotel={userHotel}
          />
        </section>

        <section className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
            <BookingChart
              chartData={dashboardData?.permanent_datas}
              userManager={userHotel}
            />
          </div>
          <div className="bg-white p-3 rounded shadow hover:shadow-md duration-200">
            <ReservationChart
              userManager={userHotel}
              monthlyData={[...dashboardData?.monthly_datas, ...dummyData]}
            />
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
    </>
  );
};

export default UserDashBoard;
