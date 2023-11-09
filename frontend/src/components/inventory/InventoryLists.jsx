import React, { useEffect, useState } from "react";
import { FaEye, FaFileInvoice, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../redux/inventory/inventorySlice.js";
import ReactPaginate from "react-paginate";
import { useFoodsQuery } from "../../redux/restaurant/foodAPI.js";
import InventoryList from "./InventoryList.jsx";

const lists = {
  docs: [
    {
      _id: 1,
      name: "Item 1",
      status: "Available",
    },
    {
      _id: 2,
      name: "Item 2",
      status: "Available",
    },
    {
      _id: 3,
      name: "Item 3",
      status: "Available",
    },
    {
      _id: 4,
      name: "Item 4",
      status: "Available",
    },
  ],
};

const InventoryLists = () => {
  const { order } = useSelector((store) => store.inventorySlice);
  const { user } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [foodsPerPage] = useState(10);
  // const { isLoading, data: foods } = useFoodsQuery({
  //   id: user?.assignedHotel[0],
  //   cp: currentPage,
  //   pp: foodsPerPage,
  // });
  const [pageCount, setPageCount] = useState(1);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const handleOrder = (item) => {
    const tempOrder = { ...order };

    const tempItems = [...tempOrder.items];
    tempItems.push({ ...item });

    const newOrder = { ...tempOrder, items: tempItems };
    dispatch(setOrder(newOrder));
  };
  //
  // useEffect(() => {
  //   if (foods) setPageCount(foods.data.totalPages);
  // }, [foods]);

  return (
    <div>
      <div className="overflow-x-auto border">
        <table className="table">
          <thead>
            <tr className={`text-lg`}>
              <th>Name</th>
              <th>Status</th>
              <th className={`text-center`}>
                Add / Remove <br /> Item
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lists?.docs?.map((list, idx) => (
              <InventoryList
                key={list._id}
                idx={idx}
                list={list}
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

export default InventoryLists;
