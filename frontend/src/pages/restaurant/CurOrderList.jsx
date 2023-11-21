import React, { useState } from "react";
import {
  FaDoorOpen,
  FaEye,
  FaPrint,
  FaRegEdit,
  FaSearch,
  FaStreetView,
} from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { GrPowerReset, GrView } from "react-icons/gr";
import { AiFillSetting, AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "../../components/Modal.jsx";
import {
  useDeleteOrderMutation,
  useFoodsQuery,
  useOrdersQuery,
} from "../../redux/restaurant/foodAPI.js";
import { useGetRoomsAndHotelsQuery } from "../../redux/room/roomAPI.js";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";
import { MdCancel } from "react-icons/md";
import DatePicker from "react-datepicker";
// import StatusSettings from "./StatusSettings.jsx";

const CurOrderList = () => {
  const navigate = useNavigate();
  const [ordersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [search, setSearch] = useState("");
  const [searchTable, setSearchTable] = useState("");

  const formik = useFormik({
    initialValues: {
      entries: "",
      search: "",
      startDate: "",
      endDate: "",
      tableNumber: "",
      // chooseHotel: "",
    },
    onSubmit: (values) => {
      setSearch(values.search);
      setSearchTable(values.tableNumber);
      setCurrentPage(0);
    },
  });
  const { isLoading, data: orders } = useOrdersQuery({
    unique_id: search,
    current_order: true,
    cp: currentPage,
    pp: ordersPerPage,
    table_number: searchTable,
  });
  const modifiedData = orders?.data?.docs?.map((order) => ({
    ...order,
    grand_total: order.items.reduce((total, item) => total + item.total, 0),
  }));
  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Order will be cancel.",
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
          deleteOrder(id);
        });
      }
    });
  };

  return (
    <div className={`px-5 space-y-5`}>
      <div className={`bg-white px-10 py-5 rounded`}>
        <h3 className={`text-2xl font-semibold text-center`}>
          Current Order List
        </h3>
        <div className={`flex justify-end mt-5 gap-3`}>
          <div className={`relative max-w-xs w-full `}>
            <input
              type="text"
              placeholder="Search by Table number..."
              name="tableNumber"
              className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.tableNumber}
              onChange={formik.handleChange}
              onKeyUp={(e) => {
                e.target.value === "" ? formik.handleSubmit() : null;
              }}
              onKeyDown={(e) => pressEnter(e)}
            />
            <button
              onClick={formik.handleSubmit}
              type="button"
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>

          <div className={`relative max-w-xs w-full`}>
            <input
              type="text"
              placeholder="Search by invoice number..."
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
              onClick={formik.handleSubmit}
              type="button"
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        {/*<div className={`flex `}>*/}
        {/*  <div className="flex flex-col gap-3">*/}
        {/*    <select*/}
        {/*      name="chooseHotel"*/}
        {/*      className="input input-md h-8 bg-transparent input-bordered border-green-slimy rounded focus:outline-none focus:border-green-slimy"*/}
        {/*      value={formik.values.chooseHotel}*/}
        {/*      onChange={formik.handleChange}*/}
        {/*      onBlur={formik.handleBlur}*/}
        {/*    >*/}
        {/*      <option value="" selected disabled>*/}
        {/*        Choose Hotel*/}
        {/*      </option>*/}
        {/*      {hotelList?.map((i) => (*/}
        {/*        <option key={i._id} value={i._id}>*/}
        {/*          {i.name}*/}
        {/*        </option>*/}
        {/*      ))}*/}
        {/*    </select>*/}
        {/*    {formik.touched.chooseHotel &&*/}
        {/*    Boolean(formik.errors.chooseHotel) ? (*/}
        {/*      <small className="text-red-600">*/}
        {/*        {formik.touched.chooseHotel && formik.errors.chooseHotel}*/}
        {/*      </small>*/}
        {/*    ) : null}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <hr className={`my-5`} />
        <div className={`space-y-10`}>
          {!isLoading ? (
            orders?.data?.docs?.length ? (
              <>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Invoice No</th>
                        <th>Date</th>
                        <th>Table Number</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modifiedData?.map((order, idx) => {
                        return (
                          <tr
                            className={
                              idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                            }
                          >
                            <th>{++idx}</th>
                            <td>{order?.unique_id}</td>
                            <td>
                              {new Date(order?.createdAt).toLocaleString()}
                            </td>
                            <td>{order?.table_id?.table_number}</td>
                            <td>{order?.grand_total}</td>
                            <td className={`flex gap-1.5`}>
                              <Link
                                to={`/dashboard/single-checkout/${order?._id}`}
                                title={`Checkout`}
                                className={`btn btn-md hover:bg-green-slimy bg-transparent hover:text-white text-green-slimy !border-green-slimy rounded normal-case`}
                              >
                                <MdShoppingCartCheckout size={20} />
                              </Link>
                              <span
                                onClick={() => handleDelete(order?._id)}
                                title={`Cancel`}
                                className={`btn btn-md hover:bg-red-500 bg-transparent hover:text-white text-red-500 !border-red-500 rounded normal-case`}
                              >
                                <MdCancel size={20} />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Modal id={`ol_modal`}>{/* <StatusSettings /> */}</Modal>
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
              <h3 className={`text-center`}>No data found!</h3>
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
    </div>
  );
};

export default CurOrderList;
