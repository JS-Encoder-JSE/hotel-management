import React, { useState } from "react";
import Select from "react-select";
import CustomerInfoSection from "./CustomerInfoSection";
import RoomDetailsSection from "./RoomDetailsSection";
import BillingSection from "./BillingSection";
import PaymentSection from "./PaymentSection";
import {
  useGetCOInfoQuery,
  useGetRoomsAndHotelsQuery,
  useRoomNumbersQuery,
  useRoomsQuery,
} from "../../../redux/room/roomAPI";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const CheckOut = () => {
  const [showRooms, setShowRooms] = useState(false);
  const [totalBilling, setTotalBilling] = useState(0);
  const [fetch, setFetch] = useState(null);

  const formik = useFormik({
    initialValues: {
      hotel_id: "",
      room: [],
      // itemName: "",

      // packagePrice: "",
    },
  });

  const { data: checkout } = useGetCOInfoQuery(fetch?.[0]);
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const { isLoading, data: rooms } = useRoomsQuery({
    id: formik.values.hotel_id,
    cp: "0",
    filter: "",
    search: "",
  });

  const handleGetRooms = () => {
    const arr = formik.values.room.map((elem) => elem.value);

    setFetch(arr);
    setShowRooms(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const transformedRooms = rooms?.data?.docs
    ?.filter((room) => room.status === "Booked" || room.status === "CheckedIn")
    ?.map((room) => ({
      value: room._id,
      label: `${room.roomNumber} - ${room.category}`,
    }));

  const { data: hotelsList } = useGetRoomsAndHotelsQuery();

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto flex gap-5 items-center justify-start">
        <div className="flex flex-col gap-3">
          <select
            name="hotel_id"
            className="select select-md bg-transparent select-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.hotel_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Choose Hotel
            </option>

            {hotelList?.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <Select
            placeholder="Select room"
            name={`room`}
            defaultValue={formik.values.room}
            options={transformedRooms}
            isSearchable
            isMulti
            closeMenuOnSelect={false}
            onChange={(e) => {
              formik.setFieldValue("room", e);
            }}
            noOptionsMessage={() => "No room available"}
            classNames={{
              control: (state) =>
                `!input !input-md !h-auto !min-h-[3rem] min-w-[20rem] !input-bordered !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none ${
                  state.isFocused ? "!shadow-none" : ""
                }`,
              valueContainer: () => "!p-0",
              placeholder: () => "!m-0",
            }}
          />
        </div>
        <button
          onClick={handleGetRooms}
          disabled={formik.values.room.length === 0}
          className="btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        >
          Go
        </button>
      </div>

      {/* Customer Info and Set them to default */}
      {showRooms && (
        <>
          <CustomerInfoSection />
          <RoomDetailsSection selectedRooms={formik.values.room} />
          <BillingSection setTotalBilling={setTotalBilling} />
          <PaymentSection />
        </>
      )}
    </div>
  );
};

export default CheckOut;
