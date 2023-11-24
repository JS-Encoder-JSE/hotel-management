import React from "react";
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


const RestaurantDashboard = () => {
  const [profit,setProfit] = useState(false);
  const formik = useFormik({
    initialValues: {
     
     
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });
  return (
    <>
      <div
        className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-3 mb-8`}
      >
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#309267] to-[#06724c] p-3 rounded-md text-white">
            <GiExpense />
          </div>
          <h6 className="text-xs text-slate-400 ">TODAY EXPENSES</h6>
          <p className="text-2xl font-semibold mt-4">$ 850</p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#d32a26] to-[#d93935] p-3 rounded-md">
            <SiSellfy />
          </div>
          <div>
            <h6 className="text-xs text-slate-400">TODAY SALES</h6>
            <p className="text-2xl font-semibold mt-4">$ 850</p>
            <hr />
          </div>
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#309267] to-[#06724c] p-3 rounded-md text-white">
          <TbCurrencyTaka />
          </div>
          <h6 className="text-xs text-slate-400 ">TODAY PROFIT</h6>
          <p className="text-2xl font-semibold mt-4">$ 850</p>
          <hr />
        </div>
      </div>

      <div className={`flex justify-center mb-20 mt-20`}>
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
      </div>

      <div
        className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-2.5`}
      >
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#309267] to-[#e5e50b] p-3 rounded-md text-white">
            <GiExpense />
          </div>
          <h6 className="text-xs text-slate-400 ">LAST WEEK EXPENSES</h6>
          <p className="text-2xl font-semibold mt-4">$550</p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#453092] to-[#5c08a5] p-3 rounded-md text-white">
            <LiaSellsy />
          </div>
          <h6 className="text-xs text-slate-400 ">LAST WEEK SALES</h6>
          <p className="text-2xl font-semibold mt-4">$ 1650</p>
          <hr />
        </div>
        <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
          <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#309267] to-[#4ba555] p-3 rounded-md text-white">
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
            <p className="text-2xl font-semibold mt-4">$ 1650</p>
          <hr />
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard;
