import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { useFormik } from "formik";
import { useHotelsQuery } from "../../redux/Owner/hotelsAPI.js";

const HotelList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotelsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const { isLoading, data: hotels } = useHotelsQuery({
    uid: id,
    pid: "",
    cp: currentPage,
    search: "",
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (hotels) setPageCount(hotels.totalPages);
  }, [hotels]);

  return (
    <div className="card w-full bg-white shadow-xl">
      <div className="card-body">
        <h1 className="text-2xl text-center ">Hotel List</h1>
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
                    {[...hotels?.docs]?.sort((a, b) => a.name - b.name)?.map((hotel, idx) => {
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
                                navigate(`/dashboard/adminowner-view/${idx}`)
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
            <h3 className={`text-center mt-10`}>No data found!</h3>
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

export default HotelList;
