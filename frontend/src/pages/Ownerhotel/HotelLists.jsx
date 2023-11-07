import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useHotelsQuery } from "../../redux/Owner/hotelsAPI.js";
import { Rings } from "react-loader-spinner";
import {useSelector} from "react-redux";

const HotelLists = () => {
  const {user} = useSelector(store => store.authSlice)
  const navigate = useNavigate();
  const [hotelsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
  });

  const { isLoading, data: hotels } = useHotelsQuery({
    cp: currentPage,
    search: formik.values.search,
    uid: user._id,
    pid: ""
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
    if (hotels) setPageCount(hotels.totalPages);
  }, [hotels]);

  return (
    <div className={`space-y-10 bg-white rounded-2xl p-10`}>
      <div className={`flex justify-end gap-4`}>
        {/* <div>
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="deactive">deActive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div> */}
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
            type="button"
            onClick={() => formik.handleSubmit()}
            className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      {!isLoading ? (
        hotels?.docs?.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="table border">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Branch Name</th>
                    {/* <th> Address </th> */}
                    {/* <th className="text-center">Email</th> */}
                    <th>Phone Number</th>
                    {/* <th>License <br /> Number</th> */}
                    {/* <th> Manager</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels?.docs?.map((hotel, idx) => {
                    return (
                      <tr
                        className={
                          idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                        }
                      >
                        <th>{++idx}</th>
                        <td>{hotel?.name}</td>
                        <td>{hotel?.branch_name}</td>
                        {/* <td>Kolkata</td> */}
                        {/* <td>jondoe@gmail.com</td> */}
                        <td>{hotel?.phone_no}</td>
                        {/* <td>123456</td> */}
                        {/* <td>Manager 1</td> */}
                        <td className={`space-x-1.5`}>
                          <span
                            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                            onClick={() =>
                              navigate(
                                `/dashboard/hotelList-view/${hotel?._id}`,
                              )
                            }
                          >
                            <FaEye />
                          </span>
                          <span
                            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                            onClick={() =>
                              navigate(`/dashboard/hotel-edit/${hotel?._id}`)
                            }
                          >
                            <FaEdit />
                          </span>
                          <span
                            className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case mt-2`}
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
  );
};

export default HotelLists;
