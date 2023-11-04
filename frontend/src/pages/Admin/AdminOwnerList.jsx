import React, { useEffect, useState } from "react";
import { FaEye, FaRegEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Modal from "../../components/Modal.jsx";
import OwnerSettings from "../../components/Admin/OwnerSettings.jsx";
import ReactPaginate from "react-paginate";
import { useOwnerListQuery } from "../../redux/admin/ownerlist/ownerListAPI.js";
import { Rings } from "react-loader-spinner";

const AdminOwnerList = () => {
  const [keyword, setKeyword] = useState(null);
  const formik = useFormik({
    initialValues: {
      search: "",
      filter: "",
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });

  const navigate = useNavigate();
  const [ownersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [owner, setOwner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, data: owners } = useOwnerListQuery({
    cp: currentPage,
    filter: formik.values.filter,
    search: keyword,
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (owners) setPageCount(owners.totalPages);
  }, [owners]);

  useEffect(() => {
    if (owner) {
      window.ol_modal.showModal();
    }
  }, [modalOpen]);

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
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactivate</option>
              <option value="Suspended">Suspend</option>
              <option value="Expired">Expired</option>
              <option value="Deleted">Deleted</option>
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
                      <th>Username</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Duration</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owners?.docs?.map((owner, idx) => {
                      return (
                        <tr
                          className={
                            idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                          }
                        >
                          <th>{++idx}</th>
                          <td>{owner?.username}</td>
                          <td>{owner?.name}</td>
                          <td>{owner?.email}</td>
                          <td>{owner?.status}</td>
                          <td>
                            {`${new Date(
                              owner?.bill_from,
                            ).toLocaleDateString()} - ${new Date(
                              owner?.bill_to,
                            ).toLocaleDateString()}`}
                          </td>
                          <td className={`space-x-1.5`}>
                            <span
                              className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                              onClick={() =>
                                navigate(
                                  `/dashboard/adminowner-view/${owner?._id}`,
                                )
                              }
                            >
                              <FaEye />
                            </span>
                            <Link
                              to={`/dashboard/owner-profile/${owner?._id}/edit`}
                            >
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
                              onClick={() => {
                                setOwner({
                                  id: owner?._id,
                                  status: owner?.status,
                                });
                                setModalOpen(!modalOpen);
                              }}
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
              <Modal id={`ol_modal`}>
                <OwnerSettings
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  owner={owner}
                />
              </Modal>
            </>
          ) : (
            <h3>No data!</h3>
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
    </div>
  );
};

export default AdminOwnerList;
