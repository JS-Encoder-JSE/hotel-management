import React, { useState } from "react";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const FoodInventory = () => {
  const navigate = useNavigate();
  const [foodsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      search: "",
      entries: "",
    },
  });

  return (
    <div className={`space-y-8 bg-white p-10 rounded-2xl`}>
      <div className={`flex justify-between`}>
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
        <div className={`relative sm:min-w-[20rem]`}>
          <input
            type="text"
            placeholder="Search by name..."
            name="search"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
          <button
            type="button"
            className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Sell</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(+formik.values.entries || 10)].map((_, idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                      </div>
                    </div>
                  </td>
                  <td>Available</td>
                  <td>30</td>
                  <td>$10</td>
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                      onClick={() => navigate(`/dashboard/edit-food/${idx}`)}
                      title={`Edit`}
                    >
                      <FaEdit />
                    </span>
                    <span
                      className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                      title={`Delete`}
                    >
                      <FaTrash />
                    </span>
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
        />
      </div>
    </div>
  );
};

export default FoodInventory;
