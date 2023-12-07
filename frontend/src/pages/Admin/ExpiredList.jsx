import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdAutorenew, MdOutlineAutorenew, MdUpdate } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import OwnerSettings from "../../components/Admin/OwnerSettings.jsx";
import Modal from "../../components/Modal.jsx";
import ExpiredSettings from "../../components/Admin/ExpiredSettings.jsx";
import { useFormik } from "formik";
import { useOwnerListQuery } from "../../redux/admin/ownerlist/ownerListAPI.js";
import { Rings } from "react-loader-spinner";
import store from "../../redux/store.js";
import {
  useGetOwnByAdminQuery,
  useGetUsersQuery,
} from "../../redux/admin/subadmin/subadminAPI.js";

const ExpiredList = () => {
  const navigate = useNavigate();
  const [renewPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [owner, setOwner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });

  const { user } = store.getState().authSlice;
  const { isLoading, data: owners } =
    user.role === "admin"
      ? useGetOwnByAdminQuery({
          cp: currentPage,
          filter: "Expired",
          search: keyword,
        })
      : useGetUsersQuery({
          cp: currentPage,
          filter: "Expired",
          search: keyword,
          role: "owner",
          parentId: user._id,
        });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (owners) setPageCount(owners.totalPages);
  }, [owners]);

  useEffect(() => {
    if (owner && modalOpen) {
      window.ol_modal.showModal();
      setModalOpen(false);
    }
  }, [modalOpen]);

  return (
    <div className={`space-y-8 bg-white p-4 rounded-2xl`}>
       <div>
          <Link to={`/dashboard `}>
            <button
              type="button"
              className="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
            >
              <dfn>
                <abbr title="Back">
                  <FaArrowLeft />
                </abbr>
              </dfn>

              <span className="tracking-wider font-semibold text-[1rem]"></span>
            </button>
          </Link>
        </div>
        <div className={`text-2xl text-center`}>Expired List</div>
      <div className={`flex justify-end flex-col sm:flex-row gap-5`}>
       
      
        <div className={`relative sm:min-w-[20rem]`}>
          <input
            type="text"
            placeholder="Search by name..."
            name="search"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.search}
            onChange={formik.handleChange}
            onKeyUp={(e) => {
              e.target.value === "" ? formik.handleSubmit() : null;
            }}
            onKeyDown={(e) => pressEnter(e)}
          />
          <button
            onClick={() => formik.handleSubmit()}
            type="button"
            className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      {!isLoading ? (
        owners.docs.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="table border">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Client Name</th>
                    <th>Client Username</th>
                    <th>Client Email</th>
                    <th>Client Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...owners?.docs]
                    ?.sort((a, b) =>
                      a.name.toLowerCase() > b.name.toLowerCase()
                        ? 1
                        : a.name.toLowerCase() < b.name.toLowerCase()
                        ? -1
                        : 0
                    )
                    ?.map((owner, idx) => {
                      return (
                        <tr
                          className={
                            idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                          }
                        >
                          <th>{++idx}</th>
                          <td>{owner?.name}</td>
                          <td>{owner?.username}</td>
                          <td>{owner?.email}</td>
                          <td>
                            {owner?.status === "Active" ? (
                              <div className="badge min-w-[7rem] bg-green-slimy border-green-slimy text-white">
                                Active
                              </div>
                            ) : owner?.status === "Deactive" ||
                              owner?.status === "Deleted" ? (
                              <div className="badge min-w-[7rem] bg-red-600 border-red-600 text-white">
                                Deactive
                              </div>
                            ) : owner?.status === "Suspended" ? (
                              <div className="badge min-w-[7rem] bg-red-500 border-red-500 text-white">
                                Suspended
                              </div>
                            ) : (
                              <div className="badge min-w-[7rem] bg-orange-600 border-orange-600 text-white">
                                Expired
                              </div>
                            )}
                          </td>
                          <td className={`space-x-1.5`}>
                            <span
                              className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case mb-2 ms-2`}
                              onClick={() =>
                                navigate(`/dashboard/edit-renew/${owner?._id}`)
                              }
                              title={`Active`}
                            >
                              <MdAutorenew />
                            </span>
                            <span
                              className={`btn btn-sm bg-transparent hover:bg-red-600 text-red-600 hover:text-white !border-red-600 rounded normal-case mb-2 ms-2`}
                              title={`Suspend`}
                              onClick={() => {
                                setOwner({
                                  id: owner?._id,
                                  status: owner?.status,
                                });
                                setModalOpen(true);
                              }}
                            >
                              <MdUpdate />
                            </span>
                            <span
                              className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case mb-2 ms-2`}
                              onClick={() =>
                                navigate(`/dashboard/renew-view/${owner?._id}`)
                              }
                            >
                              <FaEye />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Modal id={`ol_modal`}>
                <ExpiredSettings owner={owner} />
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
          </>
        ) : (
          <h3 className={`mt-10 text-center`}>No data found!</h3>
        )
      ) : (
        <Rings
          width="50"
          height="50"
          color="#37a000"
          wrapperClass="justify-center"
        />
      )}
    </div>
  );
};

export default ExpiredList;
