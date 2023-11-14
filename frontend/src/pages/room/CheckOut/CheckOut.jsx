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
  const [pBill, setPBill] = useState(0);

  const formik = useFormik({
    initialValues: {
      hotel_id: "",
      roomNumber: "",
      // itemName: "",

      // packagePrice: "",
    },
  });

  const { data: checkout } = useGetCOInfoQuery(fetch);
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const { isLoading, data: rooms } = useRoomsQuery({
    id: formik.values.hotel_id,
    cp: "0",
    filter: "",
    search: "",
    limit: 1000000,
  });

  const handleGetRooms = () => {
    setFetch(formik.values.roomNumber);
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
            name={`roomNumber`}
            defaultValue={formik.values.roomNumber}
            options={transformedRooms}
            isSearchable
            onChange={(e) => formik.setFieldValue("roomNumber", e.value)}
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
          className={`btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case ${
            !formik.values.roomNumber ? "btn-disabled" : ""
          }`}
        >
          Go
        </button>
      </div>

      {/* Customer Info and Set them to default */}
      {showRooms && (
        <>
          <CustomerInfoSection data={checkout?.data?.booking_info} />
          <RoomDetailsSection data={checkout?.data?.booking_info} />
          <BillingSection
            data={checkout?.data}
            totalBilling={totalBilling}
            setTotalBilling={setTotalBilling}
            setPBill={setPBill}
          />
          <PaymentSection pBill={pBill} />
        </>
      )}
    </div>
  );
};

export default CheckOut;
