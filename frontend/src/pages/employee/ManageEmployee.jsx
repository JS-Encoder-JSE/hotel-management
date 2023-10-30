import React, { useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";

const ManageEmployee = () => {
  const navigate = useNavigate()
  const [employeesPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: {
      search: "",
      filter: "",
    },
  });

  return (
    <div className={`space-y-8 bg-white p-10 rounded-2xl`}>
      <div className={`flex justify-between gap-4`}>
        <div>
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="all">All</option>
            <option value="available">Waiter</option>
            <option value="booked">Housekeeper</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            name="search"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Shift</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_,idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">Waiter</div>
                      </div>
                    </div>
                  </td>
                  <td>Day</td>
                  <td>20000</td>
                  <td>Mugda, Dhaka 1203</td>
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                      onClick={() => navigate(`/dashboard/edit-employee/${idx}`)}
                    >
                      <FaEdit />
                    </span>
                    <span
                      className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
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

export default ManageEmployee;
