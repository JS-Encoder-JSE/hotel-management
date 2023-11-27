import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaRegEdit, FaRegFilePdf, FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import EditExpensesView from "./EditExpensesView";
import ReactPaginate from "react-paginate";
import { useGetExpenseByIdQuery } from "../../redux/room/roomAPI";
import { getformatDateTime } from "../../utils/utils";
import FoodCheckoutPrint from "../../pages/restaurant/FoodCheckoutPrint";
import ReactToPrint from "react-to-print";
import ShowAllExpenseViewPrint from "./ShowAllExpenseViewPrint";
import { FaPrint } from "react-icons/fa6";

const ShowAllExpenseView = () => {


const componentRef= useRef()

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const {id }= useParams()
  console.log(id,"expense by id")


  const {data:itemExpense}= useGetExpenseByIdQuery(id)

  console.log(itemExpense,"Nissan")

  function calculateTotalPrice(items) {
    // Ensure items is not null or undefined
    if (!items) {
      return 0;
    }
  
    // Use the reduce function to sum up the prices
    const totalPrice = items.reduce((total, item) => {
      // Ensure each item has a price property
      if (item && item.price) {
        return total + item.price;
      }
      // If item or price is missing, return total without adding anything
      return total;
    }, 0);
  
    return totalPrice;
  }
  
  let totalItemsAmount = calculateTotalPrice(itemExpense?.items)

 const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();

  return (
    <div className={`bg-white p-10 rounded-2xl space-y-8`}>
      <div className={`flex justify-between `}>
        <div
          className={`inline-flex bg-green-slimy text-white border border-green-slimy items-center space-x-1.5 hover:bg-transparent hover:text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
       {/* Pdf */}
       <div className={`flex gap-4 justify-end mt-4`}>
        <div style={{display:"none"}} >
          <div className="p-4" ref={componentRef}>
           <ShowAllExpenseViewPrint itemExpense={itemExpense} totalItemsAmount={totalItemsAmount} />
          </div>   
        </div>
        </div>
      <ReactToPrint
          trigger={() => (
            <button
              title="please select payment method"
              className="bg-green-slimy text-white px-2 rounded-sm"
            >
             <FaPrint className="inline"/> Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div>
          <h1 className={`text-2xl text-center`}> Expenses Information</h1>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Items Name</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Remark</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemExpense?.items.map((item, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{getformatDateTime(itemExpense?.date)}</td>
                      <td>{item?.name}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.description}</td>
                      <td>
                          <FaRupeeSign className="inline" />
                            <span>{item?.price}</span>
                      </td>
                      <td>Remark</td>
                      <td>
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
                            <EditExpensesView />
                          </div>
                        </dialog>
                      </td>
                     
                    </tr>
                  );
                })}
              </tbody>
              
            </table>
           <div className="flex justify-end max-w-[73%]">
           <div className={`flex gap-2`}>
            <h1>Grand Total :</h1>
           <div className="flex">
                          <div>
                          <FaRupeeSign />
                          </div>
                          <div>
                            <span>{totalItemsAmount}</span>
                          </div>
                        </div>
           </div>
           </div>
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
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
            />
          </div>

     
    </div>
  );
};

export default ShowAllExpenseView;
