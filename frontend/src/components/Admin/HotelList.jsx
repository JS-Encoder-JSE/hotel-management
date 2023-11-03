import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const HotelList = () => {
  const [hotelsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  return (
    <div className="card w-full bg-white shadow-xl">
      <div className="card-body">
        <h1 className="text-2xl text-center ">Hotel List</h1>
        <div className="overflow-x-auto mt-10">
          <table className="table border">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Hotel Name</th>
                <th>Hotel Email</th>
                <th>Hotel Branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => {
                return (
                  <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                    <th> {++idx}</th>
                    <td>Sonargaon Pacific</td>
                    <td>sg.pacific@gmail.com</td>
                    <td>Mohakhali</td>
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

export default HotelList;
