import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UserDashBoard from "../../components/UserDashBoard/UserDashBoard";

const MonitorFinance = () => {
  const animatedComponents = makeAnimated();

  // This portion will come from api. and After fetching api needs a state [roomList, setRoomList]
  const hotelList = [
    // { value: '', label: 'Room Select' },
    { value: "Hotel - 1", label: "Hotel - 1" },
    { value: "Hotel - 2", label: "Hotel - 2" },
    { value: "Hotel - 3", label: "Hotel - 3" },
    { value: "Hotel - 4", label: "Hotel - 4" },
    { value: "Hotel - 5", label: "Hotel - 5" },
    { value: "Hotel - 6", label: "Hotel - 6" },
    { value: "Hotel - 7", label: "Hotel - 7" },
    { value: "Hotel - 8", label: "Hotel - 8" },
    { value: "Hotel - 9", label: "Hotel - 9" },
    { value: "Hotel - 10", label: "Hotel - 10" },
    { value: "Hotel - 11", label: "Hotel - 11" },
    { value: "Hotel - 12", label: "Hotel - 12" },
  ];

  const handleSearchHotel = (e) => {
    console.log(e.value);

    // Here it will get the value and pass a state props to match hotel id and show that particular dashboard data.
  };
  
  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-20">
      {/* Select Room Section */}
      <section className="max-w-3xl mx-auto flex gap-5 items-center">
        <p className="whitespace-nowrap">Hotel Name :</p>
        <div className="w-[353px]">
          <Select
            components={animatedComponents}
            options={hotelList}
            placeholder="Search with hotel name"
            onChange={(e) => handleSearchHotel(e)}
            className="custom-scroll-bar"
            onKeyDown={handleKeyDown}
          />
        </div>
      </section>

      <section>
        <UserDashBoard></UserDashBoard>
      </section>
    </div>
  );
};

export default MonitorFinance;
