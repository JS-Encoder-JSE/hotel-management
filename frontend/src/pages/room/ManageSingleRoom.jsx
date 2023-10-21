import React, { useState } from "react";
import RoomThumbsSlider from "../../components/room/RoomThumbsSlider.jsx";
import RoomTabs from "../../components/room/RoomTabs.jsx";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ManageSingleRoom = () => {
  const navigate = useNavigate();

  return (
    <div className={`bg-white max-w-6xl mx-auto rounded-3xl p-10 space-y-10`}>
      <div>
        <span
          className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`} onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </span>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 !mt-5`}>
        <RoomThumbsSlider />
        <div className={`lg:col-span-2`}>
          <h2 className="card-title">Room</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            asperiores beatae commodi cumque eligendi est illo ipsam iusto
            praesentium quibusdam.
          </p>
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
