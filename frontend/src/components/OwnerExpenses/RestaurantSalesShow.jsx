import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaEye,
  FaRegEdit,
  FaRegFilePdf,
  FaRupeeSign,
} from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { MdCurrencyRupee } from "react-icons/md";
import EditTodaysales from "./EditTodaysales";
import {
  useGetDailyDataQuery,
  useGetOrdersByDateQuery,
} from "../../redux/room/roomAPI";
import { fromDateIsoConverterForAddExpenses, getISOStringDate } from "../../utils/utils";
import RestaurantExpenseReport from "../../pages/report/RestaurantExpenseReport";
import RestaurantSales from "../../pages/OwnerExpenses/RestaurantSales";
import RestaurantSalesHistory from "../../pages/report/RestaurantSalesHistory";
import RestaurantSalesReport from "../../pages/report/RestaurantSalesReport";

const RestaurantSalesShow = ({ hotelId,managerID }) => {
  // console.log('------hotelId',hotelId);
  const navigate = useNavigate();
  const [managersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [forcePage, setForcePage] = useState(null);
  const [PDF, setPdf] = useState([]);
  const [searchParams, setSearchParams] = useState({
    fromDate: "",
    toDate: "",
  });

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    onSubmit: (values) => {
      setSearchParams((p) => ({
        ...p,
        toDate: p? new Date(values.endDate).toLocaleDateString():"",
        fromDate: p? new Date(values.startDate).toLocaleDateString():"",
      }));
    },
    onReset: (values) => {
      setCurrentPage(0);
      setForcePage(0);
      setSearchParams("")
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

  // / query by searchParams
  const {
    data: restaurantSalesToday,
    error: restaurantSaleEx,
    isLoading: dataLoading,
  } = useGetOrdersByDateQuery({
    date: new Date().toLocaleDateString(),
    order_status: "CheckedOut",
    hotel_id: hotelId,
  });





  // History
  const {
    data: restaurantSalesHistory,
    error,
    isLoading,
  } = useGetDailyDataQuery({
    ...searchParams,
    cp: currentPage,
    fromDate: searchParams?.fromDate,
    toDate: searchParams?.toDate,
    managerId: managerID,
    limit: formik.values.entries,
  });

  console.log("restaurantSalesHistory",restaurantSalesHistory)



  useEffect(() => {
    if (restaurantSalesHistory)
      setPageCount(restaurantSalesHistory?.data?.totalPages);
  }, [restaurantSalesHistory]);


  const arrayOfObjects = restaurantSalesToday?.data || [];

// Use flatMap to extract the items arrays into one array
const allItemsArray = arrayOfObjects.flatMap((obj) => obj.items || []);

console.log(allItemsArray);



  // pagination setup for today's expenses
  const itemsPerPage = 10;
  const [currentPageItem, setCurrentPageItem] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPageItem(selected);
  };

  const totalPage = restaurantSalesToday?.data && Math.ceil(allItemsArray.length / itemsPerPage);

  const indexOfLastItem = (currentPageItem + 1) * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = allItemsArray?.slice(indexOfFirstItem, indexOfLastItem);

  const handleScrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPrice = currentItems?.reduce(
    (total, item) => total + item.price,
    0
  );


console.log(currentItems)

useEffect(() => {
  console.log("PDF Data:", currentItems);
  setPdf(currentItems);
}, [currentItems]);



  return (
    <div className={`space-y-5`}>
      <div className={`bg-white p-4 rounded`}>
        <div>
          <div>
            <div>
              <h3
                className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}
              >
                Today Sales
              </h3>
            </div>
            <div>
            <div className={`flex justify-end mb-5 mr-5`}>
                {PDF?.length ? (
                  <PDFDownloadLink
                    document={
                      <RestaurantSalesHistory
                        date={currentItems}
                        values={currentItems}
                        header={{
                          title: "DAK Hospitality LTD",
                          name: "Today's Sales ",
                        }}
                      />
                    }
                    fileName={`${new Date().toLocaleDateString()}.pdf`}
                    className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                    onError={(error) => console.error("PDF Error", error)}
                  >
                    <BsFileEarmarkPdfFill />
                    PDF
                  </PDFDownloadLink>
                ) : null}
              </div>

              <div className=" h-64 overflow-x-auto overflow-y-auto">
                {restaurantSalesToday && restaurantSalesToday?.data.length ? (
                  <table className="table">
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
                    {restaurantSalesToday &&
                      currentItems?.map((item, idx) => {
                        return (
                          <tr
                            className={
                              idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                            }
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
                </table>
                ) : (
                  <p className="text-center py-14"> No Sales Today</p>
                )}
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
                pageCount={totalPage}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>

        {/* Restaurant Expenses */}

        <div className={`mb-10 mt-20`}>
          <div>
            <h3
              className={` bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}
            >
              Restaurant sales
            </h3>
          </div>
          <div className="flex justify-end">
            {PDF?.length ? (
              <PDFDownloadLink
                document={
                  <RestaurantSalesReport
                  date={restaurantSalesToday?.data?.docs?.date}
                  values={restaurantSalesHistory?.data?.docs}
                    header={{
                      title: "DAK Hospitality LTD",
                      name: "Restaurant sales",
                    }}
                  />
                }
                fileName={`${new Date().toLocaleDateString()}.pdf`}
                className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
              >
                <BsFileEarmarkPdfFill />
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
                {restaurantSalesHistory &&
                  restaurantSalesHistory?.data?.docs?.map((item, idx) => {
                    return (
                      <tr
                      key={idx}
                        className={
                          idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                        }
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
                              navigate(
                                `/dashboard/restaurant-sales-details?date=${item?.date}&hotelId=${hotelId}`
                              )
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

export default RestaurantSalesShow;
