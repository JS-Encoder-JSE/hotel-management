import React, {useEffect, useState} from "react";
import { FaEye, FaRegEdit, FaSearch } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import {Link, useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {useUpdateLicenseStatusMutation} from "../../redux/admin/sls/slsAPI.js";
import {useOwnerListQuery} from "../../redux/admin/ownerlist/ownerListAPI.js";
import {useGetUsersQuery} from "../../redux/admin/subadmin/subadminAPI.js";

const SubAdminList = () => {
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
  const [updateLicenseStatus] = useUpdateLicenseStatusMutation();

  const navigate = useNavigate();
  const [subAdminPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [owner, setOwner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, data: subadmins } = useGetUsersQuery({
    cp: currentPage,
    filter: formik.values.filter,
    search: keyword,
    role: "subadmin"
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (subadmins) setPageCount(subadmins.totalPages);
  }, [subadmins]);

  return (
    <div className={`px-5 space-y-5`}>
      <div className={`bg-white px-10 py-5 rounded`}>
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-5`}>
          <h3 className={`text-xl font-semibold text-center`}>
            Sub Admin List
          </h3>
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
        <hr className={`my-5`} />
        <div className={`space-y-10`}>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  {/* <th>Sub Admin Address</th> */}
                  <th>Email</th>
                  <th>Phone Number</th>
                  {/* <th>Salary</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subadmins?.docs?.map((sa, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{sa?.name}</td>
                      <td>{sa?.email}</td>
                      <td>{sa?.phone_no}</td>
                      <td className={`space-x-1.5`}>
                        <Link to={`/dashboard/sub-admin-list-view/${sa?._id}`}>
                          <span
                            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                          >
                            <FaEye />
                          </span>
                        </Link>
                        <Link to={`/dashboard/sub-admin-profile/${sa?._id}/edit`}>
                          <span
                            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
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

export default SubAdminList;
