import React, { useState } from "react";
import {
  FaDoorOpen,
  FaEdit,
  FaEye,
  FaFileInvoice,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";

const InventoryLists = () => {
  const navigate = useNavigate()
  const [itemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  return (
    <div>
    <div className="overflow-x-auto border">
      <table className="table">
        <thead>
          <tr className={`text-lg`}>
            <th>Name</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Use</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, idx) => {
            return (
              <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                    </div>
                  </div>
                </td>
                <td>20</td>
                <td>12</td>
                <td>8</td>
                <td className={`space-x-1.5`}>
                  <span
                    className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                    title={`Edit`}
                    onClick={() => navigate(`/dashboard/edit-inventory/${idx}`)}
                  >
                    <FaEdit />
                  </span>
                  <span
                    className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                    title={`Delete`}
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
    </div>
  );
};

export default InventoryLists;
