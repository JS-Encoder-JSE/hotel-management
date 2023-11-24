import React from 'react';
import { GiCoins } from 'react-icons/gi';
import { MdCurrencyRupee } from 'react-icons/md';
import ExpensesChart from './ExpesesChart';
import OwnerExpenseAndSalesChart from './OwnerExpneseAndSalesChart';

const OwnerExpeseAnalytics = ({monthlyData, userHotel,dashboardData,dummyData}) => {
    return (
        <div>
             <div className='mt-10'>
             <div>
        <section
          className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-2.5`}
        >
          <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
            <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#f67709] to-[#fe9302] p-3 rounded-md">
            <GiCoins className={`db-currency text-white`} />
            </div>
            <h6 className="text-xl text-slate-400">
              Total Expenses
            </h6>
            <p className="text-2xl font-semibold mt-3">
             $5000
            </p>
          </div>
            <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
              <div className="absolute -top-[20px] text-3xl text-white bg-gradient-to-tr from-[#282884] to-[#1616ff] p-3 rounded-md">
              <GiCoins className={`db-currency text-white`} />
              </div>
              <h6 className="text-xl text-slate-400 uppercase">
               Total Sales
              </h6>
              <p className="text-2xl font-semibold mt-3">
               $10000
              </p> 
            </div>
          
          {/* Total Amount */}
          <div className="relative bg-white p-3 pb-14 text-right rounded shadow hover:shadow-md duration-200">
            <div className="absolute -top-[20px] text-3xl bg-gradient-to-tr from-[#309267] to-[#4ba555] p-3 rounded-md">
              <GiCoins className={`db-currency text-white`} />
            </div>
            <h6 className="text-xl text-slate-400 ">Net Profit</h6>
            <p className="text-2xl font-semibold mt-4">
              $3000
            </p>
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
          <OwnerExpenseAndSalesChart
            monthlyData={[...dashboardData?.monthly_datas, ...dummyData]}
            userHotel={userHotel}
          />
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
        </div>
        </div>
    );
};

export default OwnerExpeseAnalytics;