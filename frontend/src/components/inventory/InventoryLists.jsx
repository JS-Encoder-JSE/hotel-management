import React, { useEffect, useState } from "react";
import {
  FaDoorOpen,
  FaEdit,
  FaEye,
  FaFileInvoice,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDeleteRoomMutation } from "../../redux/room/roomAPI.js";
import Swal from "sweetalert2";
import { useDeleteInventoryMutation } from "../../redux/inventory/inventoryAPI.js";

const InventoryLists = ({ setCurrentPage, lists }) => {
  const navigate = useNavigate();
  const [deleteInventory] = useDeleteInventoryMutation();
  const [itemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Item will be delete.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#35bef0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          deleteInventory(id);
        });
      }
    });
  };

  useEffect(() => {
    if (lists) setPageCount(lists.totalPages);
  }, [lists]);

  return (
    <div>
      <div className="overflow-x-auto border">
        <table className="table">
          <thead>
            <tr className={`text-lg`}>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lists?.docs?.map((list, idx) => {
              const { _id, name, description, quantity, stock, use } = list;

              return (
                <tr
                  key={_id}
                  className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{lists?.status === "Available" ? (
                              <div className="badge min-w-[7rem] bg-green-slimy border-green-slimy text-white">
                                Available
                              </div>
                          ) : (
                              <div className="badge min-w-[7rem] bg-red-600 border-red-600 text-white">
                                UnAvailable
                              </div>
                          )}</td>
                  {/* <td>Available</td> */}
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                      title={`Edit`}
                      onClick={() =>
                        navigate(`/dashboard/edit-inventory/${_id}`)
                      }
                    >
                      <FaEdit />
                    </span>
                    <span
                      className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                      title={`Delete`}
                      onClick={() => handleDelete(_id)}
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
