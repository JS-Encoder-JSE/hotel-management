import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegEdit, FaRegFilePdf, FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import EditExpensesView from "./EditExpensesView";
import ReactPaginate from "react-paginate";
import { useGetExpenseByIdQuery } from "../../redux/room/roomAPI";
import { getformatDateTime } from "../../utils/utils";

const ShowAllExpenseView = () => {


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
        <div className={`flex`}>
        <button className="btn btn-sm min-w-[5rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
          {" "}
          <FaRegFilePdf />
          PDF
        </button>
      </div>
       
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
           <div className={`flex justify-end mr-0  md:mr-[22rem] md:ms-[20rem] mt-4 gap-2`}>
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
