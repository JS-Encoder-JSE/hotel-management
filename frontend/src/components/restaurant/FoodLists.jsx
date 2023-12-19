import React, { useEffect, useState } from "react";
import { FaEye, FaFileInvoice, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setOrderCalc } from "../../redux/add-order/addOrderSlice.js";
import FoodList from "./FoodList.jsx";
import ReactPaginate from "react-paginate";
import { useFoodsQuery } from "../../redux/restaurant/foodAPI.js";
import { Rings } from "react-loader-spinner";

const FoodLists = ({ formik, keyword, roomOrTable, reset, setReset }) => {
  const { order } = useSelector((store) => store.addOrderSlice);
  const { user } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [foodsPerPage] = useState(10);
  const { isLoading, data: foods } = useFoodsQuery({
    cp: currentPage,
    pp: foodsPerPage,
    search: formik.values.search,
  });
  const [pageCount, setPageCount] = useState(1);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const handleOrder = ({ food: item, input: quantity }) => {
    const tempOrder = { ...order };

    const tempFoods = [...tempOrder.foods];
    tempFoods.push({ ...item, quantity });

    // const newOrder = { ...tempOrder, foods: tempFoods };
    dispatch(setOrder(tempFoods));
    dispatch(setOrderCalc());
  };

  useEffect(() => {
    if (foods) setPageCount(foods.data.totalPages);
  }, [foods]);

  return !isLoading ? (
    foods?.data?.docs?.length ? (
      <div>
        <div className="overflow-x-auto border">
          <table className="table">
            <thead>
              <tr className={`text-lg`}>
                <th>Name</th>
                <th>Status</th>
                <th>
                  Surveyor <br /> Quantity
                </th>
                <th>Price</th>
                <th>Quantity</th>
                <th className={`text-center`}>
                  Add / Remove <br /> Food
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {foods?.data?.docs?.map((food, idx) => (
                <FoodList
                  key={food._id}
                  idx={idx}
                  food={food}
                  handleOrder={handleOrder}
                  reset={reset}
                  setReset={setReset}
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
    ) : (
      <h3 className={`text-center`}>No data found!</h3>
    )
  ) : (
    <Rings
      width="50"
      height="50"
      color="#37a000"
      wrapperClass="justify-center"
    />
  );
};

export default FoodLists;
