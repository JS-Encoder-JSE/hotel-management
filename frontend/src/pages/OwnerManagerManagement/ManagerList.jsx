import React, { useState } from "react";
import { FaEye, FaRegEdit, FaStreetView } from "react-icons/fa";
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
        <h3 className={`text-xl font-semibold text-center`}>Manager List </h3>
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
                  <th>Status</th>
                  {/* <th>Salary</th> */}
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
                      {/* <td>Kolkata</td> */}
                      <td>jondoe@gmail.com</td>
                      <td>+99801111</td>
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
