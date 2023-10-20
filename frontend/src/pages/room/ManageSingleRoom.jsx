import React, { useState } from "react";
import RoomThumbsSlider from "../../components/room/RoomThumbsSlider.jsx";
import CheckInForm from "../../components/room/CheckInForm.jsx";
import RoomTabs from "../../components/room/RoomTabs.jsx";

const ManageSingleRoom = () => {
  const [isCheckIn, setCheckIn] = useState(false);

  return (
    <div className={`bg-white max-w-6xl mx-auto rounded-3xl p-10 space-y-10`}>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10`}>
        <RoomThumbsSlider />
        <div className={`lg:col-span-2`}>
          <h2 className="card-title">Room</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            asperiores beatae commodi cumque eligendi est illo ipsam iusto
            praesentium quibusdam.
          </p>
          <div className={`mt-5`}>
            {!isCheckIn ? (
              <div className="flex items-center space-x-1.5">
                <button
                  className="btn btn-sm min-w-[8rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                  onClick={() => setCheckIn(true)}
                >
                  Check In
                </button>
                <h3 className={`text-2xl font-semibold`}>$100</h3>
              </div>
            ) : (
              <CheckInForm setCheckIn={setCheckIn} />
            )}
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
