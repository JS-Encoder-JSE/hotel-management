import React, { useState } from "react";
import Select from "react-select";
import { useRoomsQuery } from "../../redux/room/roomAPI.js";
import UserDashBoard from "../../components/UserDashBoard/UserDashBoard";
import { useSelector } from "react-redux";
import { useHotelsQuery } from "../../redux/Owner/hotelsAPI.js";
import { Rings } from "react-loader-spinner";

const MonitorFinance = () => {
  const { user } = useSelector((store) => store.authSlice);
  const {
    isLoading,
    data: hotels,
    isError,
  } = useHotelsQuery({
    uid: user._id,
    pid: "",
    filter: "Active",
  });
  const [selectedHotel, setselectedHotel] = useState([]);
  console.log("selectedHotel", selectedHotel);
  console.log("hotels", hotels);
  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };
  const transformedHotel = hotels?.docs?.map((hotel) => ({
    value: hotel?.manager_acc?._id,
    label: `${hotel.name} - ${hotel.branch_name}`,
  }));
  if (isLoading || isError) {
    return (
      <Rings
        width="50"
        height="50"
        color="#37a000"
        wrapperClass="justify-center"
      />
    );
  }
  return (
    <div className="space-y-20">
      {/* Select Room Section */}
      <section className="max-w-3xl mx-auto flex gap-5 items-center">
        <p className="whitespace-nowrap">Hotel Name :</p>
        <div className="w-[353px]">
          <Select
            placeholder="Search with hotel name"
            defaultValue={selectedHotel}
            options={transformedHotel}
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            onKeyDown={handleKeyDown}
            onChange={setselectedHotel}
            noOptionsMessage={() => "No Hotel available"}
            classNames={{
              control: (state) =>
                `!input !input-md !min-h-[3rem] !h-auto !input-bordered !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none ${
                  state.isFocused ? "!shadow-none" : ""
                }`,
              valueContainer: () => "!p-0",
              placeholder: () => "!m-0",
            }}
          />
        </div>
      </section>

      <section>
        {selectedHotel?.length ? (
          <UserDashBoard managerId={selectedHotel[0]?.value}></UserDashBoard>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default MonitorFinance;
