import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaEye,
  FaRegEdit,
  FaRegFilePdf,
  FaRupeeSign,
} from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GrPowerReset } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { MdCurrencyRupee } from "react-icons/md";
import EditSales from "../../components/inventory/EditSales";
import { useGetDailyDataQuery, useGetOrdersByDateQuery } from "../../redux/room/roomAPI";
import { useSelector } from "react-redux";
import { fromDateIsoConverter, fromDateIsoConverterForAddExpenses, getISOStringDate } from "../../utils/utils";
// import EditExpenses from "./EditExpenses";

const ShowAllSell = () => {
  const navigate = useNavigate();
  const [forcePage, setForcePage] = useState(null);
  const [managersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [PDF, setPdf] = useState([]);

  const { user } = useSelector((store) => store.authSlice);


  // console.log(user?.assignedHotel[0],"user")

  

  

  const [searchParams, setSearchParams] = useState({
    fromDate: "",
    toDate: "",
  });

  console.log(searchParams);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      filter:"",
    },
    onSubmit: (values) => {
      setSearchParams((p) => ({
        ...p,
        toDate: getISOStringDate(values.endDate),
        fromDate: getISOStringDate(values.startDate),
      }));
    },
    onReset: (values) => {
      setCurrentPage(0);
      setForcePage(0);
    },
  });


  // / query by searchParams
  const {  data:restaurantSalesToday, error:restaurantSaleEx, isLoading:dataLoading } = useGetOrdersByDateQuery({
    date: fromDateIsoConverterForAddExpenses(new Date()),
    order_status: 'CheckedOut',
    hotel_id:user?.assignedHotel[0],
  });
// console.log(restaurantSalesToday,"todaysale")






// filtered data
  const { data:restaurantSalesHistory, error, isLoading } = useGetDailyDataQuery({
    ...searchParams,
    cp: currentPage,
    fromDate: searchParams?.fromDate,
    toDate: searchParams?.toDate,
    managerId:user?._id,
    limit: formik.values.entries,
    filter:formik.values.filter,
  });

  console.log(restaurantSalesHistory?.data,"dailyData ")

  useEffect(() => {
    if (restaurantSalesHistory) setPageCount(restaurantSalesHistory?.data?.totalPages);
  }, [restaurantSalesHistory]);



  const pressEnter = (e) => {
    if (e.key === "Enter" || e.search === 13) {
      formik.handleSubmit();
    }
  };


  const [todayItem, setTodayItem] = useState([]);

  useEffect(() => {
    const todayItems = restaurantSalesToday?.data?.map((obj) => obj?.items).flat();
    setTodayItem(todayItems);
  }, [restaurantSalesToday]);
  
  


  // pagination setup for today's expenses
const itemsPerPage = 10;
const [currentPageItem, setCurrentPageItem] = useState(0);


const handlePageChange = ({ selected }) => {
  setCurrentPageItem(selected);
};


const totalPage =
todayItem && Math.ceil(todayItem?.length / itemsPerPage);

const indexOfLastItem = (currentPageItem + 1) * itemsPerPage;

const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentItems = todayItem?.slice(
indexOfFirstItem,
indexOfLastItem
);

const handleScrollToTop = () => {
// Scroll to the top of the page
window.scrollTo({ top: 0, behavior: 'smooth' });
};

// console.log(currentItems,"currenttem")

const totalPrice = currentItems?.reduce((total, item) => total + item.price, 0);

  return (
    <div className={`space-y-5`}>
      <div className={`bg-white p-4 rounded`}>
        <div className="mb-10">
          <Link to={`/dashboard `}>
            <button
              type="button"
              className="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
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
            <h3
              className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}
            >
              Today's Sales
            </h3>
          </div>

          <div className="flex justify-end">
              {PDF?.length ? (
                <PDFDownloadLink
                  document={
                    <ExpensesHistoryReport
                      date={hotelExpenses?.docs[0]?.date}
                      values={filteredExpenses?.docs}
                      header={{
                        title: "DAK Hospitality LTD",
                        name: "Restaurant Expenses History",
                      }}
                    />
                  }
                  fileName={`${new Date().toLocaleDateString()}.pdf`}
                  className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded  uppercase"
                >
                  <BsFileEarmarkPdfFill />
                  PDF
                </PDFDownloadLink>
              ) : null}
            </div>
          {/* <div className={`flex justify-end mb-5`}>
            <button className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
              {" "}
              <FaRegFilePdf /> 
              PDF
            </button>
          </div> */}

        <div className="overflow-x-auto">
           {currentItems && currentItems.length? <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Item</th>
                  <th>Surveyor Quantity</th>
                  <th>Quantity</th>
                  <th>Price</th>

                </tr>
              </thead>
              <tbody>
                {restaurantSalesToday&& currentItems?.map((item, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{item?.item}</td>
                      <td>{item?.serveyor_quantity}</td> 
                      <td>{item?.quantity}</td> 
                      <td>{item?.price}</td> 
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className={`text-[1.2rem] font-bold`}>
                <tr>
                  <td colSpan={4} className={`text-end text-md font-bold`}>
                    Total :
                  </td>
                  <td>
                    <div className="flex">
                      <div>
                        <FaRupeeSign />
                      </div>
                      <div>
                        {" "}
                        {totalPrice}
                        {/* {totalItemPrice} */}
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>: <p className="flex justify-center items-center my-48">
                    No Expenses Today
                  </p>}
          </div>
        </div>
        <div onClick={handleScrollToTop} className="flex justify-center ">
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
        </div>

        {/* Restaurant Expenses */}

        <div className={`mb-10 mt-10`}>
          <div>
            <h3
              className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}
            >
              Restaurant sales
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
        <div className={`flex flex-col md:flex-row gap-4 `}>
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
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurantSalesHistory && restaurantSalesHistory?.data?.docs?.map((item, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{new Date(item?.date).toLocaleDateString()}</td>
                      <td>
                        <div className="flex">
                          <div>
                            <FaRupeeSign />
                          </div>
                          <div>
                            <span>{item?.today_restaurant_income}</span>
                          </div>
                        </div>
                      </td>
                      <td className={`space-x-1.5`}>
                        <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                          onClick={() =>
                            navigate(`/dashboard/show-all-sell-details?date=${item?.date}`)
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
               forcePage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAllSell;
