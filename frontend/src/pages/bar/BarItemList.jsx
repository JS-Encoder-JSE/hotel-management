import React, { useState } from "react";
import { FaWineGlass } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdOutlineAutorenew } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";


const BarItemList = () => {
  const navigate = useNavigate();
  const [renewPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  return (
    <div className={`space-y-8 bg-white p-10 rounded-2xl`}>
      <div className={`text-2xl text-center`}>
    Renew List
      </div>
      <div className="overflow-x-auto">
        <table className="table border">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Item Name</th>
              <th>Item Quantity</th>
              <th>Price</th>
              <th>Item Pack</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <th>{++idx}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                      </div>
                      <div>
                        <div className="font-bold">votkha</div>
                      </div>
                    </div>
                  </td>
                  <td>2 ML</td>
                  <td>2000</td>
                  <td>2</td>
                  <td className={`space-x-1.5`}>
                    <span
                     className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case mb-2 ms-2`}
                      onClick={() => navigate(`/dashboard/renew-view/${idx}`)}
                    >
                      <GrView />
                    </span>
                    <span
                      className={`btn btn-sm bg-green-600 hover:bg-transparent text-white hover:text-green-600 !border-green-600 rounded normal-case`}
                      onClick={() => navigate(`/dashboard/edit-renew/${idx}`)}
                    >
                      <FaWineGlass />
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

export default BarItemList;
