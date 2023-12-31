import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import BookingLists from "../../components/room/BookingLists.jsx";
import { FaArrowLeft, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
import AddBooking from "../../components/room/AddBooking.jsx";
import {
  useGetRoomsAndHotelsQuery,
  useGetBookingsByHotelQuery,
} from "../../redux/room/roomAPI.js";
import { Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";

const ManageBooking = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
      // hotel_id: "",
    },
    onSubmit: (values) => {
      setSearch(values.search);
      setCurrentPage(0);
    },
  });

  const { data: bookingList, isLoading } = useGetBookingsByHotelQuery({
    hotel_id: formik.values.hotel_id,
    search: formik.values.search,
    page: currentPage,
    filter: "Active",
  });

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      formik.handleSubmit();
    }
  };
  const { data: hotelsList } = useGetRoomsAndHotelsQuery();
  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl`}>
      <div className="flex justify-between" >
      <div>
              <Link to={`/dashboard `}>
                <button
                  type="button"
                  class="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
                >
                    <dfn>
                      <abbr title="Back"><FaArrowLeft /></abbr>
                    </dfn>
                 
                  <span className="tracking-wider font-semibold text-[1rem]"></span>
                </button>
              </Link>
            </div>
        {/* filter by hotels  */}
        {/*<div className="flex items-center gap-2">*/}
        {/*  /!* <p>Please choose a hotel : </p> *!/*/}
        {/*  <select*/}
        {/*    name="hotel_id"*/}
        {/*    className="input input-md h-8 bg-transparent input-bordered border-green-slimy rounded focus:outline-none focus:border-green-slimy"*/}
        {/*    value={formik.values.hotel_id}*/}
        {/*    onChange={formik.handleChange}*/}
        {/*    onBlur={formik.handleBlur}*/}
        {/*  >*/}
        {/*    <option value="" selected disabled>*/}
        {/*      Choose Hotel*/}
        {/*    </option>*/}

        {/*    {hotelsList?.map((i) => (*/}
        {/*      <option key={i._id} value={i._id}>*/}
        {/*        {i.name}*/}
        {/*      </option>*/}
        {/*    ))}*/}
        {/*  </select>*/}
        {/*</div>*/}

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
        <div className={`flex gap-3 `}>
          <button
            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
            onClick={() => window.ab_modal.showModal()}
          >
            <FaPlus />
            <span>Add Booking</span>
          </button>
          <div className={`relative sm:min-w-[20rem]`}>
            <input
              type="text"
              placeholder="Search by phone number..."
              name="search"
              className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.search}
              onChange={formik.handleChange}
              onKeyDown={(e) => pressEnter(e)}
            />
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      {!isLoading ? (
        bookingList?.data?.docs?.length ? (
          <BookingLists
            bookingList={bookingList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
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
      <Modal id={`ab_modal`}>
        <AddBooking />
      </Modal>
    </div>
  );
};

export default ManageBooking;
