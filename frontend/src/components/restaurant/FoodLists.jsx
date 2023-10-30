import React, { useState } from "react";
import { FaEye, FaFileInvoice, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setOrderCalc } from "../../redux/add-order/addOrderSlice.js";
import FoodList from "./FoodList.jsx";
import ReactPaginate from "react-paginate";

const FoodLists = ({ foods }) => {
  const { order } = useSelector((store) => store.addOrderSlice);
  const dispatch = useDispatch();
  const [foodsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const handleOrder = (item) => {
    const tempOrder = { ...order };

    const tempFoods = [...tempOrder.foods];
    tempFoods.push({ ...item, quantity: 1 });

    const newOrder = { ...tempOrder, foods: tempFoods };
    dispatch(setOrder(newOrder));
    dispatch(setOrderCalc());
  };

  return (
    <div>
    <div className="overflow-x-auto border">
      <table className="table">
        <thead>
          <tr className={`text-lg`}>
            <th>Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, idx) => (
            <FoodList
              key={idx}
              idx={idx}
              food={food}
              handleOrder={handleOrder}
            />
          ))}
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
        />
      </div>
    </div>
  );
};

export default FoodLists;
