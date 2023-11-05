import React, { useState } from "react";
import { FaEye, FaRegEdit, FaSearch, FaStreetView } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AiFillSetting, AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "../../components/Modal.jsx";
import StatusSettings from "./StatusSettings.jsx";

const ManagerList = () => {
  const navigate = useNavigate()
  const [managersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const formik = useFormik({
    initialValues: {
      entries: "",
      search: "",
      filter: "",
      startDate: "",
      endDate: "",
    },
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  return (
    <div className={`px-5 space-y-5`}>
      <div className={`bg-white px-10 py-5 rounded`}>
        <h3 className={`text-xl font-semibold text-center mb-5`}>Manager List </h3>
       
        <div className={`flex justify-between space-x-1.5`}>
        <div className="flex flex-col gap-3">
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="all">All</option>
            <option value="induty">In Duty</option>
            <option value="transfer">Transfer</option>
            <option value="resign">Resign</option>
          </select>
          {formik.touched.filter && Boolean(formik.errors.filter) ? (
            <small className="text-red-600">
              {formik.touched.filter && formik.errors.filter}
            </small>
          ) : null}
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
        <hr className={`my-5`} />
        <div className={`space-y-10`}>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Manager Name</th>
                  {/* <th>Manager Address</th> */}
                  <th>Manager Email</th>
                  <th>Phone Number</th>
                  <th>Branch Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(+formik.values.entries || 5)].map((_, idx) => {
                  // < key={idx} manager={idx}></>
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>Jon Doe</td>
                      <td>jondoe@gmail.com</td>
                      <td>+99801111</td>
                      <td>Kolkata</td>
                      <td>Active</td>
                      {/* <td>$25000</td> */}
                      <td className={`space-x-1.5`}>
                        <span
                          className={`btn btn-sm bg-green-slimy hover:bg-transparent hover:text-green-slimy text-white !border-green-slimy rounded normal-case ms-2`}
                          onClick={() => window.ol_modal.showModal()}
                        >
                          <AiFillSetting />
                        </span>
                        <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                          onClick={() =>
                            navigate(`/dashboard/managerList-view/${idx}`)
                          }
                        >
                          <FaEye />
                        </span>
                        <Link to={`/dashboard/manager-edit/${idx}`}>
                          <span
                            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case md:mb-2 mb-2 ms-2`}
                          >
                            <FaRegEdit />
                          </span>
                        </Link>
                        <span
                          className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case`}
                        >
                          <AiTwotoneDelete />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Modal id={`ol_modal`}>
              <StatusSettings />
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
      </div>
    </div>
  );
};

export default ManagerList;
