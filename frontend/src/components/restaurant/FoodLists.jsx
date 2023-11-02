import React, {useEffect, useState} from "react";
import { FaEye, FaFileInvoice, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setOrderCalc } from "../../redux/add-order/addOrderSlice.js";
import FoodList from "./FoodList.jsx";
import ReactPaginate from "react-paginate";
import {useFoodsQuery} from "../../redux/restaurant/foodAPI.js";

const FoodLists = () => {
  const { order } = useSelector((store) => store.addOrderSlice);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [foodsPerPage] = useState(10);
  const { isLoading, data: foods } = useFoodsQuery({
    cp: currentPage,
    pp: foodsPerPage,
  });
  const [pageCount, setPageCount] = useState(1);

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

  useEffect(() => {
    if (foods) setPageCount(foods.pagination.totalPages);
  }, [foods]);

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
          {foods?.data?.map((food, idx) => (
            <FoodList
              key={food._id}
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
