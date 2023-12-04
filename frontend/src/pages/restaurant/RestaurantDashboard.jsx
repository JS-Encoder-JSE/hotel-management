import React, { useEffect } from "react";
import { useState } from "react";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { SiSellfy } from "react-icons/si";
import { MdAttachMoney, MdOutlineLastPage } from "react-icons/md";
import { LiaSellsy } from "react-icons/lia";
import { GrMoney } from "react-icons/gr";
import { useFormik } from "formik";
import { TbCurrencyTaka } from "react-icons/tb";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { BiRupee } from "react-icons/bi";
import RestaurantDashboardChart from "../../components/UserDashBoard/RestaurantDashboardChart";
import { useGetSubDashBoardInfoQuery } from "../../redux/expensesAndSales/expensesAndSalesApi";
import { useSelector } from "react-redux";
import { Rings } from "react-loader-spinner";
import { dummyData, isValidUrl } from "../../utils/utils";
import {useLocation, useNavigate } from 'react-router-dom';
import { TbSquareRoundedLetterC } from "react-icons/tb";


const RestaurantDashboard = ({ managerId }) => {
  // console.log("managerId",managerId)

  const { user } = useSelector((state) => state.authSlice);
  const { data, isLoading, isError } = useGetSubDashBoardInfoQuery(
    managerId ? managerId : user._id
  );
  console.log("data",data)
  const [profit, setProfit] = useState(false);
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });

  if (isLoading || isError) {
    return (
      <div>
        <Rings
          width="50"
          height="50"
          color="#37a000"
          wrapperClass="justify-center"
        />
      </div>
    );
  }

  const location = useLocation();
  const {  pathname  } = location;
 


  return (
    <>
      <div
        // className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-3 mb-20`}
        className="grid md:grid-cols-3 gap-4 mb-20"
      >
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200 mb-4">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#cedc4e] to-[#a0c528] p-3 rounded-md text-white">
            <GiExpense />
          </div>
          <h6 className="text-xs text-slate-400 ">TODAY'S EXPENSES</h6>
          <p className="text-2xl font-semibold mt-4">
            <div className="flex justify-end">
              <div>
                <BiRupee />
              </div>
              <div>
                <span>
                  {isValidUrl("restaurant",pathname)
                    ? data?.daily_datas[0]?.today_restaurant_expenses
                    : data?.daily_datas[0]?.today_hotel_expenses}
                </span>
              </div>
            </div>
          </p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200 mb-4">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#26d360] to-[#44c60c8a] p-3 rounded-md">
          <TbSquareRoundedLetterC />
          </div>
          <div>
            <h6 className="text-xs text-slate-400">
              TODAY'S {isValidUrl("restaurant",pathname) ? "SALES" : "CHECKOUT REVENUE"}
            </h6>
            <p className="text-2xl font-semibold mt-4">
              <div className="flex justify-end">
                <div>
                  <BiRupee />
                </div>
                <div>
                  <span>
                    {isValidUrl("restaurant",pathname)
                      ? data?.daily_datas[0]?.today_restaurant_income
                      : data?.daily_datas[0]?.today_hotel_income}
                  </span>
                </div>
              </div>
            </p>
            <hr />
          </div>
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200 mb-4">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#1ca167] to-[#11ad77] p-3 rounded-md text-white">
            <HiOutlineCurrencyRupee />
          </div>
          <h6 className="text-xs text-slate-400 ">TODAY'S PROFIT</h6>
          <p className="text-2xl font-semibold mt-4">
            <div className="flex justify-end">
              <div>
                <BiRupee />
              </div>
              <div>
                <span>
                  {isValidUrl("restaurant",pathname)
                    ? data?.daily_datas[0]?.today_restaurant_profit
                    : data?.daily_datas[0]?.today_hotel_profit}
                </span>
              </div>
            </div>
          </p>
          <hr />
        </div>
      </div>

      {/* <div className={`flex justify-center mb-20 mt-20`}>
        <div>
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="">All</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastMonth3">Last 3 Month</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
      </div> */}

      <div
        // className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-2.5`}
        className="grid md:grid-cols-3 gap-4 mt-4"
      >
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200 mb-4">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#16b36f] to-[#0be554] p-3 rounded-md text-white">
            <GiExpense />
          </div>
          <h6 className="text-xs text-slate-400 ">LAST WEEK EXPENSES</h6>
          <p className="text-2xl font-semibold mt-4">
            <div className="flex justify-end">
              <div>
                <BiRupee />
              </div>
              <div>
                <span>
                  {isValidUrl("restaurant",pathname)
                    ? data?.last_week_data?.last_week_restaurant_expenses
                    : data?.last_week_data?.last_week_hotel_expenses}
                </span>
              </div>
            </div>
          </p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200 mb-4">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#453092] to-[#5c08a5] p-3 rounded-md text-white">
            <LiaSellsy />
          </div>
          <h6 className="text-xs text-slate-400 ">
            LAST WEEK {isValidUrl("restaurant",pathname) ? "SALES" : "CHECKOUT REVENUE"}
          </h6>
          <p className="text-2xl font-semibold mt-4">
            <div className="flex justify-end">
              <div>
                <BiRupee />
              </div>
              <div>
                <span>
                  {isValidUrl("restaurant",pathname)
                    ? data?.last_week_data?.last_week_restaurant_income
                    : data?.last_week_data?.last_week_hotel_income}
                </span>
              </div>
            </div>
          </p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200 mb-4">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#e00d54] to-[#f70d57] p-3 rounded-md text-white">
            <HiOutlineCurrencyRupee />
          </div>

          <h6 className="text-xs text-slate-400 ">PROFIT</h6>
          {/* <div>
                    {profit === "positive" ? (
                      <div className="text-2xl font-semibold mt-4">
                        $ 2500
                      </div>
                    ) : (
                      <div className="badge min-w-[6rem] bg-red-600 border-red-600 text-white">
                        Negative
                      </div>
                    )}
                  </div> */}
          <p className="text-2xl font-semibold mt-4">
            <div className="flex justify-end">
              <div>
                <BiRupee />
              </div>
              <div>
                <span>
                  {isValidUrl("restaurant",pathname)
                    ? data?.last_week_data?.last_week_restaurant_profit
                    : data?.last_week_data?.last_week_hotel_profit}
                </span>
              </div>
            </div>
          </p>
          <hr />
        </div>
      </div>
      <div>
        <section className="bg-white p-3 mt-8 rounded shadow hover:shadow-md duration-200 mb-4">
          <h1 className="text-[1.2rem] text-center font-bold">
            Financial Overview
          </h1>

          <RestaurantDashboardChart
            monthlyData={[...dummyData, ...data?.monthly_datas]}
          />
        </section>
      </div>
    </>
  );
};

export default RestaurantDashboard;
