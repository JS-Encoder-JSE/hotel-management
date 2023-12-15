import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegEdit, FaRegFilePdf, FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
// import EditExpensesView from "./EditExpensesView";
import ReactPaginate from "react-paginate";
import EditHotelSales from "./EditHotelSales";
import { useGetOrdersByDateQuery } from "../../redux/room/roomAPI";
import { fromDateIsoConverterForAddExpenses } from "../../utils/utils";
import { useGetReportsByDateQuery } from "../../redux/expensesAndSales/expensesAndSalesApi";
import { current } from "@reduxjs/toolkit";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import HotelSalesTodayReport from "../report/HotelSalesTodayReport";

const HotelSalesView = () => {

  const [pageCount, setPageCount] = useState(0);
  const [currentPage,setCurrentPage]=useState(0)

  const [searchParams] = useSearchParams();
  const [PDF, setPdf] = useState([]);


  const dateParam = searchParams.get('date');
  const hotelId = searchParams.get("hotel")
console.log(hotelId,dateParam)



// query by searchParams
  const { data:orderedDataByDate, error:orderError, isLoading:orderItemSuccess } = useGetReportsByDateQuery({
    cp:currentPage,
    date: new Date(dateParam).toLocaleDateString(),
    hotelId:hotelId,
  });

console.log(orderedDataByDate,"hotel")



 const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

    const formik = useFormik({
        initialValues: {
          startDate: "",
          endDate: "",
        },
      });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PDF Data:", orderedDataByDate?.data);
    setPdf(orderedDataByDate?.data.docs);
  }, [orderedDataByDate]);

  return (
    <div className={`bg-white p-10 rounded-2xl space-y-8`}>
      <div className={`flex justify-between `}>

      <div
          className="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
      
       
      </div>
      <div>
          <h1 className="text-center text-2xl bg-green-slimy w-[17rem] mx-auto text-white p-1 rounded-md"> Hotel Sales Information</h1>
        </div>
        <div>
        <div className={`flex justify-end mb-5 mr-5`}>
                {PDF?.length ? (
                  <PDFDownloadLink
                    document={
                      <HotelSalesTodayReport
                      date={orderedDataByDate?.data?.docs}
                      values={orderedDataByDate?.data?.docs}
                        header={{
                          title: "DAK Hospitality LTD",
                          name: "Hotel Sales Information ",
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
        </div>
        <div className=" overflow-x-auto ">
                {orderedDataByDate && orderedDataByDate?.data?.docs?.length ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Guest Name</th>
                        <th>CheckIn Date</th>
                        <th>Checkout Date</th>
                        <th>Paid Amount</th>
                        <th>Payable Amount</th>
                        <th>Payment Method</th>
                        <th>Room Numbers</th>
                        <th>Unpaid Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderedDataByDate &&
                        orderedDataByDate?.data?.docs?.map((item, idx) => {
                          return (
                            <tr
                              className={
                                idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                              }
                            >
                              <th>{++idx}</th>
                              <td>{item?.guestName}</td>
                              <td>{new Date(item?.checked_in).toLocaleDateString()}</td>
                              <td>{new Date(item?.checked_out).toLocaleDateString()} </td>
                              <td>{item?.paid_amount}</td>
                              <td>{item?.payable_amount}</td>
                              <td>{item?.payment_method}</td>
                              <td>{item?.room_numbers?.map((roomNum)=> roomNum)}</td>
                              <td>{item?.unpaid_amount}</td>           
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center py-14"> No Sales Today</p>
                )}
              </div>
          {/* pagination */}
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
              pageCount={orderedDataByDate?.data?.totalPages}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
            />
          </div>

     
    </div>
  );
};

export default HotelSalesView;
