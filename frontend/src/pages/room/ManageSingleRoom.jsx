import React from "react";
import RoomThumbsSlider from "../../components/room/RoomThumbsSlider.jsx";
import RoomTabs from "../../components/room/RoomTabs.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
import RoomBookingEdit from "../../components/room/RoomBookingEdit.jsx";
import { useRoomQuery } from "../../redux/room/roomAPI.js";
import { Rings } from "react-loader-spinner";

const ManageSingleRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: room } = useRoomQuery(id);

  return (
    <div className={`bg-white max-w-6xl mx-auto rounded-3xl p-10 space-y-10`}>
      <div>
        <span
          className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </span>
      </div>
      {!isLoading ? (
        <>
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 !mt-5`}>
            <RoomThumbsSlider images={room?.data?.images} />
            <div className={`lg:col-span-2`}>
              <h2 className="card-title">{room?.data?.roomNumber}</h2>

              {/* Room Table */}
              <div className={`mt-4`}>
                <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-500 ">
                  <h6>Category </h6>
                  <h6 className=" border-l px-2  border-gray-600">
                    {room?.data?.category}
                  </h6>
                </div>
                <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
                  <h6>Type </h6>
                  <h6 className="border-l px-2 border-gray-600">
                    {room?.data?.type}
                  </h6>
                </div>

                <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
                  <h6 className="">Capacity </h6>
                  <h6 className="border-l px-2 border-gray-600">
                    {room?.data?.capacity}
                  </h6>
                </div>
                <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
                  <h6 className="">Bed Size </h6>
                  <h6 className="border-l px-2 border-gray-600">
                    {room?.data?.bedSize}
                  </h6>
                </div>
                <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
                  <h6 className="">Floor Number </h6>
                  <h6 className="border-l px-2 border-gray-600">
                    {room?.data?.floorNumber}
                  </h6>
                </div>
                <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
                  <h6 className="">Room Number </h6>
                  <h6 className=" border-l px-2 border-gray-600">
                    {" "}
                    {room?.data?.roomNumber}
                  </h6>
                </div>
                <div className="grid grid-cols-2 w-80  px-2 border-b border-t border-l border-r border-gray-600">
                  <h6 className="">Status </h6>
                  <h6 className=" border-l px-2 border-gray-600">
                    {room?.data?.status}
                  </h6>
                </div>
              </div>

              {/* Button room  */}

              {/* {user.status === "chekedin" ? (
                  <AdminSBItems handleSBItems={handleSBItems} />
                ) : user.status === "chekedin" ? (
                  <OwnerSBItems handleSBItems={handleSBItems} />
                ) : (
                  <ManagerSBItems handleSBItems={handleSBItems} />
                )} */}
              <div
                className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-2.5 mt-6`}
              >
                <button
                  className={`btn btn-md bg-green-slimy hover:bg-transparent text-white font-bold hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[2rem] `}
                  onClick={() => navigate("/dashboard/checkin")}
                >
                  CheckIn
                </button>
                <button
                  className={`btn btn-md bg-yellow-400 hover:bg-yellow-300 text-black font-bold hover:text-black-300 !border-yellow-400 rounded normal-case min-w-[2rem]`}
                >
                  CheckOut
                </button>
                <button
                  className={`btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[2rem]`}
                  onClick={() => window.ab_modal.showModal()}
                >
                  Booking
                </button>

                {/* Modal Booking */}
                <Modal id={`ab_modal`}>
                  <RoomBookingEdit />
                </Modal>

                {/* Modal Edit  */}
                <button
                  className={`btn btn-md bg-green-slimy hover:bg-transparent text-white font-bold hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[2rem] `}
                  onClick={() => navigate(`/dashboard/edit-room/${room?.data?._id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div>
            <RoomTabs description={room?.data?.description} />
          </div>
        </>
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

export default ManageSingleRoom;
