import React from "react";
import { useFormik } from "formik";
import BookingLists from "../../components/room/BookingLists.jsx";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
import AddBooking from "../../components/room/AddBooking.jsx";
import { useGetRoomsAndHotelsQuery } from "../../redux/room/roomAPI.js";

const ManageBooking = () => {
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
      chooseHotels:''
    },
  });
  const {data:hotelsList}= useGetRoomsAndHotelsQuery()
  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl`}>
      <div className={`flex justify-between gap-4`}>

      
        {/* filter by hotels  */}
        <div>
					<select
						name="chooseHotels"
						className="input input-md h-8 bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
						value={formik.values.chooseHotels}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}>
						<option value="" selected disabled>
							Choose Hotels
						</option>

						{hotelsList?.map((i) => (
							<option key={i._id} value={i._id}>
								{i.name}
							</option>
						))}
					</select>
				</div>


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
        <div className={`flex gap-1.5 `}>
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
            />
            <button
              type="button"
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <BookingLists />
      <Modal id={`ab_modal`}>
        <AddBooking />
      </Modal>
    </div>
  );
};

export default ManageBooking;
