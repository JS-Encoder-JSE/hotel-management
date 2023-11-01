import React, { useState } from "react";
import Select from "react-select";
import { useRoomsQuery } from "../../redux/room/roomAPI.js";
import UserDashBoard from "../../components/UserDashBoard/UserDashBoard";

const MonitorFinance = () => {
  const { isLoading, data: rooms } = useRoomsQuery();
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const transformedRooms = rooms?.data?.map((room) => ({
    value: room.roomNumber,
    label: `${room.roomNumber} - ${room.category}`,
  }));

  return (
    <div className="space-y-20">
      {/* Select Room Section */}
      <section className="max-w-3xl mx-auto flex gap-5 items-center">
        <p className="whitespace-nowrap">Hotel Name :</p>
        <div className="w-[353px]">
          <Select
            placeholder="Search with hotel name"
            defaultValue={selectedRooms}
            options={transformedRooms}
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            onKeyDown={handleKeyDown}
            onChange={setSelectedRooms}
            noOptionsMessage={() => "No room available"}
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
        <UserDashBoard></UserDashBoard>
      </section>
    </div>
  );
};

export default MonitorFinance;
