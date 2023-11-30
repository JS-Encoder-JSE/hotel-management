import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import CustomerInfoSection from "./CustomerInfoSection";
import RoomDetailsSection from "./RoomDetailsSection";
import BillingSection from "./BillingSection";
import PaymentSection from "./PaymentSection";
import { BiReset } from "react-icons/bi";
import {
  useAddCheckoutMutation,
  useGetCOInfoQuery,
  useGetCheckoutMutation,
  useGetHotelByManagerIdQuery,
  useGetRoomsAndHotelsQuery,
  useRoomNumbersQuery,
  useRoomsQuery,
} from "../../../redux/room/roomAPI";
import { useFormik, yupToFormErrors } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CheckOutPrint from "./CheckOutPrint";
import { useDispatch, useSelector } from "react-redux";
import { updateSubTotal } from "../../../redux/checkoutInfoCal/checkoutInfoCalSlice";
import { FaArrowLeft } from "react-icons/fa";
import * as yup from "yup";
import { getISOStringDate } from "../../../utils/utils";

const CheckOut = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomFromQuery = searchParams.get("room");
  const [addCheckout, { isLoading }] = useAddCheckoutMutation();
  const [showRooms, setShowRooms] = useState(false);
  const [totalBilling, setTotalBilling] = useState(0);
  const [fetch, setFetch] = useState(null);
  const [pBill, setPBill] = useState(0);
  // const {
  //   data: checkout,
  //   isLoading: checkoutLoading,
  //   isSuccess,
  // } = useGetCOInfoQuery(fetch);
  const [getCheckout, { data: checkout, isSuccess }] = useGetCheckoutMutation();
  const [paymentList, setPaymentList] = useState([
    { method: "", amount: "", trx: "", date: "" },
  ]);
  console.log("data :", checkout);
  console.log("pBillpBillpBill :", pBill);
  const handleResetCheckout = () => {
    setShowRooms(false);
  };

  // this is use for Print
  const componentRef = useRef();

  // dispatch
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      hotel_id: "",
      roomNumber: "",
    },
    onSubmit: async () => {
      const room_numbers = checkout?.data?.booking_info?.room_ids?.map(
        (i) => i?.roomNumber
      );

      const paidAmount =
        checkout?.data?.booking_info?.paid_amount <= pBill
          ? Number(paymentList[0].amount)
          : pBill;
      const payableAmount =
        checkout?.data?.booking_info?.paid_amount <= pBill
          ? Number(paymentList[0].amount)
          : pBill;

      const unpaid =
        checkout?.data?.booking_info?.total_payable_amount -
        (checkout?.data?.booking_info?.paid_amount + paidAmount);
      const response = await addCheckout({
        hotel_id: "6551df3ac2c94ba179b05977",
        // hotel_id: checkout?.data?.booking_info?.hotel_id,
        booking_ids: ["6567b9fbd02d69c3004babd0"],
        // booking_ids: checkout?.data?.booking_info?.booking_ids,
        guestName: "John Doe",
        // guestName: checkout?.data?.booking_info?.[0]?.guestName,
        room_numbers: ["Room1", "Room2"],
        payment_method: "Card",
        // payment_method: paymentList[0].method,
        checked_in: "2023-01-01T12:00:00Z",
        checked_out: "2023-01-02T12:00:00Z",
        payable_amount: 100,
        paid_amount: 80,
        unpaid_amount: 20,
      });
      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Checkout Successful");
        // navigate("/dashboard/checkout");
      }
    },
  });
  console.log("total checkout", checkout);
  const { isUserLoading, user } = useSelector((store) => store.authSlice);

  console.log(user._id);

  const {
    data: hotelInfo,
    isLoading: isHotelLoading,
    isSuccess: isHotelSuccess,
  } = useGetHotelByManagerIdQuery(user?._id);
  console.log(hotelInfo);

  const { data: rooms } = useRoomsQuery({
    cp: "0",
    filter: "",
    search: "",
    limit: 1000000,
  });

  const handleGetRooms = () => {
    getCheckout({ room_ids: formik.values.roomNumber });
    setFetch(formik.values.roomNumber);
    setShowRooms(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };
  const transformedRooms = rooms?.data?.docs
    ?.filter((room) => room.status === "CheckedIn")
    ?.map((room) => ({
      value: room._id,
      label: `${room.roomNumber} - ${room.category}`,
    }));
  useEffect(() => {
    if (roomFromQuery?.length) {
      getCheckout({ room_ids: roomFromQuery });
      setShowRooms(true);
    }
  }, [roomFromQuery]);

  // set subtotal amount
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSubTotal(0));
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="mb-7">
        <Link to={`/dashboard `}>
          <button
            type="button"
            class="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
          >
            <dfn>
              <abbr title="Back">
                <FaArrowLeft />
              </abbr>
            </dfn>

            <span className="tracking-wider font-semibold text-[1rem]"></span>
          </button>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto flex gap-5 items-center justify-center">
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
        <button
          onClick={handleResetCheckout}
          className={`btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case ${
            !formik.values.roomNumber ? "btn-disabled" : ""
          }`}
        >
          {" "}
          <BiReset className="text-xl text-white mb-1" /> Reset
        </button>
      </div>

      {/* Customer Info and Set them to default */}
      {showRooms && checkout && isHotelSuccess ? (
        <>
          <div>
            <CustomerInfoSection data={checkout?.data?.booking_info} />
            {checkout?.data?.room_bookings?.length
              ? checkout?.data?.room_bookings?.map((roomInfo, i) => (
                  <RoomDetailsSection
                    roomData={roomInfo}
                    data={roomInfo}
                    key={i}
                  />
                ))
              : null}
            <div className="my-5">
              <BillingSection
                data={checkout?.data}
                totalBilling={totalBilling}
                setTotalBilling={setTotalBilling}
                setPBill={setPBill}
              />
            </div>
            <PaymentSection
              data={checkout?.data?.booking_info}
              paymentList={paymentList}
              setPaymentList={setPaymentList}
              pBill={pBill}
              formik={formik}
              hotelInfo={hotelInfo}
              isHotelSuccess={isHotelSuccess}
              roomData={checkout?.data?.room_bookings}
            />
          </div>
        </>
      ) : (
        <p className="hidden lg:flex absolute top-[50%] left-[54%]">
          {" "}
          "Please select the room"
        </p>
      )}
    </div>
  );
};

export default CheckOut;
