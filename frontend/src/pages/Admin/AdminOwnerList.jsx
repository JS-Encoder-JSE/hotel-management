import React, { useState } from "react";
import { FaEye, FaRegEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Modal from "../../components/Modal.jsx";
import OwnerSettings from "../../components/Admin/OwnerSettings.jsx";
import ReactPaginate from "react-paginate";

const AdminOwnerList = () => {
  const navigate = useNavigate();
  const [ownersPerPage] = useState(10);
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
    <div>
      <div className={`space-y-8 bg-white p-10 rounded-2xl`}>
        <div className={`flex justify-between gap-4`}>
          <div>
            <select
              name="filter"
              className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.filter}
              onChange={formik.handleChange}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Deactivate">Deactivate</option>
              <option value="Suspend">Suspend</option>
            </select>
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
                <th>Sl</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => {
                return (
                  <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                    <th> {++idx}</th>
                    <td className="font-bold">Jon Doe</td>
                    <td>jondoe@gmail.com</td>
                    <td>{idx % 2 === 0 ? "Active" : "Deactivate"}</td>
                    <td>12-10-2023</td>
                    <td className={`space-x-1.5`}>
                      <span
                        className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                        onClick={() =>
                          navigate(`/dashboard/adminowner-view/${idx}`)
                        }
                      >
                        <FaEye />
                      </span>
                      <Link to={`/dashboard/owner-profile/${idx}`}>
                        <span
                            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                        >
                          <FaRegEdit />
                        </span>
                      </Link>
                      <span
                        className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case`}
                      >
                        <FaTrash />
                      </span>
                      <span
                          className={`btn btn-sm bg-green-slimy hover:bg-transparent hover:text-green-slimy text-white !border-green-slimy rounded normal-case`}
                          onClick={() => window.ol_modal.showModal()}
                      >
                        <AiFillSetting />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal id={`ol_modal`}>
          <OwnerSettings />
        </Modal>
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

export default AdminOwnerList;
