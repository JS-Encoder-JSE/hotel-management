import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import BookingLists from "../../components/room/BookingLists.jsx";
import { FaArrowLeft, FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
import AddBooking from "../../components/room/AddBooking.jsx";
import {
  useGetRoomsAndHotelsQuery,
  useGetBookingsByHotelQuery,
  useMakePaymentMutation,
} from "../../redux/room/roomAPI.js";
import { Rings } from "react-loader-spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckinList from "../../components/room/CheckinList.jsx";
import { MdOutlineHail } from "react-icons/md";
import ReactPaginate from "react-paginate";

const TodaysCheckinList = () => {
  const [search, setSearch] = useState("");
  const [pageCount,setPageCount]=useState(1)
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();


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

  const {
    data: checkinList,
    isLoading,
    refetch,
  } = useGetBookingsByHotelQuery({
    search: formik.values.search,
    page: currentPage,
    filter: "CheckedIn",
  });

  useEffect(()=>{
if(checkinList) setPageCount(checkinList?.data?.totalPages)
  },[checkinList])

  const handlePageClick =({selected:page})=>{
    setCurrentPage(page)
  }



  // refetch()
  const path = useLocation();
  console.log(path.pathname);
  useEffect(() => {
    refetch();
  }, [path.pathname]);

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      formik.handleSubmit();
    }
  };
  const { data: hotelsList } = useGetRoomsAndHotelsQuery();
  return (
    <div className={`space-y-10 bg-white p-4 rounded-2xl`}>
         <h1 className="bg-green-slimy text-center text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7">Today's Check In </h1>
      <div>
        <Link to={`/dashboard `}>
          <button
            type="button"
            className="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
          >
            <dfn>
              <abbr title="Back">
                <FaArrowLeft />
              </abbr>
            </dfn>

            <span className="tracking-wider font-semibold text-[1rem]"></span>
          </button>
        </Link>
      </div>
      <div className="flex justify-end">
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
             <button
                      className={`btn btn-md bg-green-slimy hover:bg-transparent text-white font-bold hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[2rem] `}
                      onClick={() => window.ci_modal.showModal()}
                    >
                      CheckIn
                    </button>
          </select>
        </div> */}
        <div className={`flex flex-col md:flex-row gap-4 `}>
        
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
        checkinList?.data?.docs?.length ? (
            <div>
            <div className="overflow-x-auto border">
              <table className="table">
                <thead>
                  <tr className={`text-lg`}>
                    <th>
                      Guest <br /> Name
                    </th>
                    <th>
                      Room <br />
                      Number
                    </th>
                    <th>
                      Phone <br />
                      Number
                    </th>
                    {/* <th>Booking <br />Date
                    </th> */}
                    <th>From</th>
                    <th>To</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
              {checkinList?.data?.docs?.map((item,idx)=>{
                  return (
                      <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">{item.guestName}</div>
                              {/* <div className="text-sm opacity-50">
                                Rooms: {item?.room_ids?.map((i) => i.roomNumber)}
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td>{item?.room_id?.roomNumber}</td>
                        <td>{item?.mobileNumber}</td>
                        {/* <td>{item?.paid_amount}</td> */}
                        {/* <td>{new Date(item?.createdAt).toLocaleString()}</td> */}
                        <td>{new Date(item?.from).toLocaleDateString()}</td>
                        <td>{new Date(item?.to).toLocaleDateString()}</td>
      
                        <td className={`flex flex-wrap gap-1.5`}>
                          <span
                            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                            title={`View`}
                            onClick={() => navigate(`/dashboard/manage-checkin/${item._id}`)}
                          >
                            <FaEye />
                          </span>
      
                          <Link
                            onClick={()=> navigate(`/dashboard/checkout?room=${item?.room_id?._id}`)}
                            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                          >
                            <MdOutlineHail />
                          </Link>
                          {/* <span
                            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                          >
                            <FaEdit />
                          </span> */}
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
            {/* <Modal id={`eb_modal`}>
              {editBookedData && <EditBooking data={editBookedData} />}
            </Modal>
            <Modal id={`ci_modal`}>
              <CheckInDyn data={data} />
            </Modal> */}
          </div>
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
  );
};

export default TodaysCheckinList;