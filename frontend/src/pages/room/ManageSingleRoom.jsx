import React from "react";
import RoomThumbsSlider from "../../components/room/RoomThumbsSlider.jsx";
import RoomTabs from "../../components/room/RoomTabs.jsx";

const ManageSingleRoom = () => {
  return (
    <div className={`space-y-5`}>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4`}>
        <RoomThumbsSlider />
        <div className={`lg:col-span-2`}>
          <h2 className="card-title">Room</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            asperiores beatae commodi cumque eligendi est illo ipsam iusto
            praesentium quibusdam.
          </p>
          <div className="flex items-center mt-5 space-x-1.5">
            <button className="btn btn-sm min-w-[8rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case">
              Check In
            </button>
            <h3 className={`text-2xl font-semibold`}>$100</h3>
          </div>
        </div>
      </div>
      <div>
        <RoomTabs />
      </div>
    </div>
  );
};

export default ManageSingleRoom;
