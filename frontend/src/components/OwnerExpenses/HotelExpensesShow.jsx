import React, { useEffect, useState } from "react";
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

import { useGetExpensesQuery, useGetHotelByManagerIdQuery } from "../../redux/room/roomAPI";
import { useSelector } from "react-redux";
import { fromDateIsoConverter, fromDateIsoConverterForAddExpenses, getISOStringDate, getformatDateTime } from "../../utils/utils";
import EditExpenses from "../../components/inventory/EditExpenses";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CreateReport from "../../components/pdf/CreateReport";

import { BsFileEarmarkPdfFill } from "react-icons/bs";
import RestaurantExpenseReport from "../../pages/report/RestaurantExpenseReport";
import ExpensesHistoryReport from "../../pages/report/ExpensesHistoryReport";

const HotelExpensesShow = ({hotelId}) => {

  const [forcePage, setForcePage] = useState(null);
  const navigate = useNavigate();
  const [reportsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [PDF,setPdf]=useState([])


const { isUserLoading, user } = useSelector((store) => store.authSlice);



const {
  data: hotelInfo,
  isLoading: isHotelLoading,
  isSuccess: isHotelSuccess,
} = useGetHotelByManagerIdQuery(user?._id);



// const hotelId = hotelInfo && isHotelSuccess && hotelInfo[0]?._id;


// const { data: hotelExpenses, isLoading, isSuccess } = useGetExpensesQuery({
//   cp: 1,
//   fromDate: fromDateIsoConverter(new Date()),
//   hotel_id: hotelId,
//   spendedfor: "restaurant",
//   limit: 10,
// });



// // https://hotel-jse.onrender.com/expenses/get-expenses?fromDate=&toDate=&hotel_id=655dfd9967d644ac2f5df54e&spendedfor=restaurant
//   const {data:hotelExpenses, isLoading,isSuccess} = useGetExpensesQuery({
//     cp: 1,
//     fromDate: fromDateIsoConverter(new Date()),
//     hotel_id: hotelId,
//     spendedfor: "restaurant",
//     limit: 10,
//   });

 
  

 
  const [searchParams, setSearchParams] = useState({
    fromDate: "",
    toDate: "",
  });

 

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    onSubmit: (values) => {

     
      setSearchParams((p) => ({
        ...p,
        toDate: p? new Date(values.endDate).toLocaleDateString() :"",
        fromDate: p? new Date(values.startDate).toLocaleDateString() : "",
      }));
    },
    onReset: (values) => {
      setCurrentPage(0);
      setForcePage(0);
      setSearchParams("")
    },
  });
  const { data: hotelExpenses, isLoading, isSuccess } = useGetExpensesQuery({
    fromDate:new Date().toLocaleDateString(),
    hotel_id: hotelId,
    spendedfor: "hotel"
  });


  const { data: filteredExpenses, isLoading: isFilterDataLoading, isSuccess: filterExSuccess } = useGetExpensesQuery({
    ...searchParams,
    cp: currentPage,
    fromDate: searchParams?.fromDate,
    toDate: searchParams?.toDate,
    hotel_id: hotelId,
    spendedfor: "hotel",
    limit: formik.values.entries,
  });

  
  useEffect(() => {
    if (filteredExpenses) setPageCount(filteredExpenses?.totalPages);
  }, [filteredExpenses]);



  

  useEffect(()=>{
setPdf(hotelExpenses?.docs[0]?.items)
  },[hotelExpenses])
 

  
  const pressEnter = (e) => {
    if (e.key === "Enter" || e.search === 13) {
      formik.handleSubmit();
    }
  };


  const totalItemPrice = hotelExpenses?.docs[0]?.items?.reduce((total, item) => {
    // Add the price of each item to the total
    return total + (item?.price || 0);
  }, 0);


  // pagination setup for today's expenses
const itemsPerPage = 10;
const [currentPageItem, setCurrentPageItem] = useState(0);

const handlePageChange = ({ selected }) => {
  setCurrentPageItem(selected);
};
const totalPage =
hotelExpenses && Math.ceil(hotelExpenses?.docs[0]?.items.length / itemsPerPage);

const indexOfLastItem = (currentPageItem + 1) * itemsPerPage;

const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentItems = hotelExpenses?.docs[0]?.items.slice(
indexOfFirstItem,
indexOfLastItem
);

const handleScrollToTop = () => {
// Scroll to the top of the page
window.scrollTo({ top: 0, behavior: 'smooth' });
};



  return (
    <div className={`space-y-5`}>
      {hotelExpenses && filteredExpenses && <div className={`bg-white p-4 rounded`}>
        {/* <div className="mb-10">
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
        </div> */}
        {/* today's expense */}
   <div>
     <div>
          <div>
            <h3  className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}>
              Today Expenses
            </h3>
          </div>
          <div className={`flex justify-end mb-5 mr-5`}>
          {PDF?.length ? (
                <PDFDownloadLink
                document={<RestaurantExpenseReport date={hotelExpenses?.docs[0]?.date} values={hotelExpenses?.docs[0]?.items} header={{
                  title: "DAK Hospitality LTD",
                  name: "Today's Hotel Expenses",
                }} />}
                fileName={`${new Date().toLocaleDateString()}.pdf`}
                className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
              >
                <BsFileEarmarkPdfFill/>
                PDF
              </PDFDownloadLink>
              ) : null}
          </div>
        <div>
        {hotelExpenses&& hotelExpenses?.docs[0]?.items.length ?<div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Items Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remark</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {currentItems && currentItems?.map((item, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{new Date(hotelExpenses?.docs[0]?.date).toLocaleDateString()}</td>
                      <td>{item?.name}</td>
                      <td>{item?.description}</td>
                      <td>{item?.quantity}</td>
                      <td>
                        
                        <FaRupeeSign className="inline" />
                          <span>{item?.price}</span>   
                      </td>
                   <td>{item?.remark}</td>
                      {/* <td>
                        <button
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case md:mb-2 mb-2 ms-2`}
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                        >
                          <FaRegEdit />
                        </button>
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                           
                            <EditExpenses />
                          </div>
                        </dialog>
                      </td> */}
                     
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className={`text-[1.2rem] font-bold`}>
                <tr>
                  <td colSpan={5} className={`text-end text-md font-bold`}>
                    Total :
                  </td>
                  <td>
                    <div className="flex">
                      <div>
                        <FaRupeeSign />
                      </div>
                      <div>
                        {" "}
                      
                        {totalItemPrice}
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
      
          </div> : <p className="flex justify-center items-center mt-16">No Expenses Today</p>}
        </div>
        </div>

        {/* pagination */}

        {currentItems?.length &&<div onClick={handleScrollToTop} className="flex justify-center mt-10">
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
              pageCount={totalPage}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              renderOnZeroPageCount={null}
            />
          </div>}
     </div>

        {/* Restaurant Expenses */}

        <div className={`mb-10 mt-10`}>
          <div>
            <h3  className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}>
              Hotel Expenses History
            </h3>
          </div>
          <div className="flex justify-end mr-5">
          {PDF?.length ? (
                <PDFDownloadLink
                document={<ExpensesHistoryReport date={hotelExpenses?.docs[0]?.date} values={filteredExpenses?.docs} header={{
                  title: "DAK Hospitality LTD",
                  name: "Hotel Expenses History",
                }} />}
                fileName={`${new Date().toLocaleDateString()}.pdf`}
                className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
              >
                <BsFileEarmarkPdfFill/>
                PDF
              </PDFDownloadLink>
              ) : null}
          </div>
      
        </div>
        <div className={`flex justify-between my-5`}>
            <div className={`space-x-1.5`}>
              <span>Show</span>
              <select
                name="entries"
                className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
                value={formik.values.entries}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
          </div>
        <div className={`flex flex-col md:flex-row gap-4`}>
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
            onClick={formik.handleSubmit}
            // onClick={() => {
            //   setCurrentPage(0);
            //   setForcePage(0);
            //   formik.handleSubmit();
            // }}
            className="btn btn-sm min-w-[5rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case"
          >
            Apply Filter
          </button>
        </div>
        <hr className={`my-5 mb-4`} />
       {filteredExpenses?.docs.length ? <div className={`space-y-10`}>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses?.docs.map((item, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{new Date(item?.date).toLocaleDateString()}</td>
                      <td>
                          <FaRupeeSign className="inline"/>                       
                          <span>{item?.total_amount}</span>
                      </td>
                      <td className={`space-x-1.5`}>
                        <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                          onClick={() =>
                            navigate(`/dashboard/hotel-expenses/${item?._id}`)
                          }
                        >
                          <FaEye />
                        </span>
                        {/* <span
                          className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case`}
                        >
                          <AiTwotoneDelete />
                        </span> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
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
              forcePage={forcePage}
            />
          </div>
        </div> : <p className="text-center mt-16 py-16">No Expenses yet!</p>}
      </div>}
    </div>
  );
};

export default HotelExpensesShow;
