import React, { useState } from "react";
import {
  FaArrowLeft,
  FaEye,
  FaRegEdit,
  FaRegFilePdf,
  FaRupeeSign,
} from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { MdCurrencyRupee } from "react-icons/md";
import EditTodayHotelSales from "./EditTodayHotelSales";
import { BiRupee } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";



const HotelSalesShow = () => {
  const navigate = useNavigate();
  const [managersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.search === 13) {
      formik.handleSubmit();
    }
  };

  return (
    <div className={`px-5 space-y-5`}>
      <div className={`bg-white px-10 py-5 rounded`}>
        <div className="mb-10">
          <Link to={`/dashboard `}>
            <button
              type="button"
              class="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
            >
              <dfn>
                <abbr title="Back">
                  <FaArrowLeft />
                </abbr>
              </dfn>

              <span className="tracking-wider font-semibold text-[1rem]"></span>
            </button>
          </Link>
        </div>
        <div>
          <div>
            <h3  className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}>
              Today Checkout
            </h3>
          </div>
          <div className={`flex justify-end mb-5`}>
            <button className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
              {" "}
              <FaRegFilePdf />
              PDF
            </button>
          </div>

          <div className="overflow-x-auto">
          <div className="overflow-x-auto mt-10">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
          
                  <th>Guest Name</th>
                  <th>Room Numbers</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Amount</th>
                  <th>Action</th>
                
                </tr>
              </thead>
              <tbody>
              {[...Array(+formik.values.entries || 5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>
                        Jon Doe
                        {/* {report.guestName} */}
                        </td>
                      <td>101
                        {/* {report?.room_numbers.join(",")} */}
                        </td>
                      <td>
                        25-11-23
                        {/* {getFormateDateAndTime(report?.checked_in)} */}
                        </td>
                      <td>26-11-23
                        {/* {getFormateDateAndTime(report?.checked_out)} */}
                        </td>
                      <td>5000
                        
                        {/* {report?.paid_amount} */}
                        </td>
                      <td className={`space-x-1.5`}>
                      <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                          onClick={() =>
                            navigate(`/dashboard/sales-hotel-view/${idx}`)
                          }
                        >
                          <FaEye />
                        </span>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className={`text-[1.2rem] font-bold`}>
                <tr>
                  <td colSpan={5} className={`text-end `}>
                  Total :
                  </td>
                  <td>
                 <div className="flex">
                  <div><BiRupee/></div>
                  <div>25000</div>
                 </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
            {/* <div className={`flex justify-center md:ms-[20rem] mt-4`}>
              <h1>Grand Total :</h1>
              <div className="flex ">
              <div>
              <FaRupeeSign />
              </div>
              <div>
                <span>25000</span>
              </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex justify-center mt-10">
            <ReactPaginate
              containerClassName="join rounded-none"
              pageLinkClassName="join-item btn btn-md bg-transparent"
              activeLinkClassName="btn-active !bg-green-slimy text-white"
              disabledLinkClassName="btn-disabled"
              previousLinkClassName="join-item btn btn-md bg-transparent"
              nextLinkClassName="join-item btn btn-md bg-transparent"
              breakLinkClassName="join-item btn btn-md bg-transparent"
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
            />
          </div>

        {/* Restaurant Expenses */}

        <div className={`mb-10 mt-10`}>
          <div>
            <h3  className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}>
             All Checkout
            </h3>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
              {" "}
              <FaRegFilePdf />
              PDF
            </button>
          </div>
        </div>
        <div className={`flex gap-3 `}>
          <DatePicker
            autoComplete={`off`}
            dateFormat="dd/MM/yyyy"
            name="startDate"
            placeholderText={`From`}
            selected={formik.values.startDate}
            className={`input input-sm input-bordered rounded focus:outline-none`}
            onChange={(date) => formik.setFieldValue("startDate", date)}
            onBlur={formik.handleBlur}
            onKeyUp={(e) => {
              e.target.value === "" ? formik.handleSubmit() : null;
            }}
            onKeyDown={(e) => pressEnter(e)}
          />
          <DatePicker
            autoComplete={`off`}
            dateFormat="dd/MM/yyyy"
            name="endDate"
            placeholderText={`To`}
            selected={formik.values.endDate}
            className={`input input-sm input-bordered rounded focus:outline-none`}
            onChange={(date) => formik.setFieldValue("endDate", date)}
            onBlur={formik.handleBlur}
            onKeyUp={(e) => {
              e.target.value === "" ? formik.handleSubmit() : null;
            }}
            onKeyDown={(e) => pressEnter(e)}
          />
          <button
            type={"button"}
            onClick={() => {
              formik.resetForm();
              formik.handleSubmit();
            }}
            className="btn btn-sm min-w-[2rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
          >
            <GrPowerReset className="text-green-slimy" />
          </button>
          <button
            type={"button"}
            onClick={() => {
              setCurrentPage(0);
              setForcePage(0);
              formik.handleSubmit();
            }}
            className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
          >
            Apply Filter
          </button>
        </div>
        <hr className={`my-5 mb-4`} />
        <div className={`space-y-10`}>
        <div className="overflow-x-auto mt-10">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
          
                  <th>Guest Name</th>
                  <th>Room Numbers</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Amount</th>
                  <th>Action</th>
                
                </tr>
              </thead>
              <tbody>
              {[...Array(+formik.values.entries || 5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>
                        Jon Doe
                        {/* {report.guestName} */}
                        </td>
                      <td>101
                        {/* {report?.room_numbers.join(",")} */}
                        </td>
                      <td>
                        25-11-23
                        {/* {getFormateDateAndTime(report?.checked_in)} */}
                        </td>
                      <td>26-11-23
                        {/* {getFormateDateAndTime(report?.checked_out)} */}
                        </td>
                      <td>5000
                        
                        {/* {report?.paid_amount} */}
                        </td>
                      <td className={`space-x-1.5`}>
                      <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                          onClick={() =>
                            navigate(`/dashboard/sales-hotel-view/${idx}`)
                          }
                        >
                          <FaEye />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className={`text-[1.2rem] font-bold`}>
                <tr>
                  <td colSpan={5} className={`text-end`}>
                    Total :
                  </td>
               <td>
               <div className="flex">
                  <div><BiRupee/></div>
                  <div>25000</div>
                 </div>
               </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex justify-center mt-10">
            <ReactPaginate
              containerClassName="join rounded-none"
              pageLinkClassName="join-item btn btn-md bg-transparent"
              activeLinkClassName="btn-active !bg-green-slimy text-white"
              disabledLinkClassName="btn-disabled"
              previousLinkClassName="join-item btn btn-md bg-transparent"
              nextLinkClassName="join-item btn btn-md bg-transparent"
              breakLinkClassName="join-item btn btn-md bg-transparent"
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
            />
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default HotelSalesShow;
