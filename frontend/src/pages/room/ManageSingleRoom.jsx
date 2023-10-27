import React, { useState } from "react";
import RoomThumbsSlider from "../../components/room/RoomThumbsSlider.jsx";
import RoomTabs from "../../components/room/RoomTabs.jsx";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
import RoomBookingEdit from "../../components/room/RoomBookingEdit.jsx";
import RoomEdit from "./../../components/room/RoomEdit";

const ManageSingleRoom = () => {
  const navigate = useNavigate();

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
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 !mt-5`}>
        <RoomThumbsSlider />
        <div className={`lg:col-span-2`}>
          <h2 className="card-title">Room 101</h2>

          {/* Room Table */}
          <div className={`mt-4`}>
            <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-500 ">
              <h6>Category </h6>
              <h6 className=" border-l px-2  border-gray-600"> Delux</h6>
            </div>
            <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
              <h6>Type </h6>
              <h6 className="border-l px-2 border-gray-600"> AC</h6>
            </div>

            <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
              <h6 className="">Capacity </h6>
              <h6 className="border-l px-2 border-gray-600"> 04</h6>
            </div>
            <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
              <h6 className="">Bed Size </h6>
              <h6 className="border-l px-2 border-gray-600"> Sm</h6>
            </div>
            <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
              <h6 className="">Floor Number </h6>
              <h6 className="border-l px-2 border-gray-600">F-1</h6>
            </div>
            <div className="grid grid-cols-2 w-80  px-2 border-t border-l border-r border-gray-600">
              <h6 className="">Room Number </h6>
              <h6 className=" border-l px-2 border-gray-600"> 101</h6>
            </div>
            <div className="grid grid-cols-2 w-80  px-2 border-b border-t border-l border-r border-gray-600">
              <h6 className="">Status </h6>
              <h6 className=" border-l px-2 border-gray-600"> Available</h6>
            </div>
          </div>

          {/* Button room  */}
          <div
            className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))] gap-2.5 mt-6`}
          >
            <button
              className={`btn btn-md bg-green-slimy hover:bg-transparent text-white font-bold hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[2rem] `}
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
<button  className={`btn btn-md bg-green-slimy hover:bg-transparent text-white font-bold hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[2rem] `} onClick={()=>document.getElementById('my_modal_3').showModal()}>Edit</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
<RoomEdit/>
  </div>
</dialog>
          </div>

          <div className={`mt-5`}></div>
        </div>
      </div>
      <div>
        <RoomTabs />
      </div>
    </div>
  );
};

export default ManageSingleRoom;
