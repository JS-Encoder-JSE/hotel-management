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
import {
  clearCheckoutCalSlice,
  setBookingInfo,
  setRefundAmount,
  updateSubTotal,
} from "../../../redux/checkoutInfoCal/checkoutInfoCalSlice";
import { FaArrowLeft } from "react-icons/fa";
import * as yup from "yup";
import { getISOStringDate } from "../../../utils/utils";
import { clearAddOrderSlice } from "../../../redux/add-order/addOrderSlice";
import Modal from "../../../components/Modal";
import RefundPaymentModal from "./RefundPaymentModal";

const CheckOut = () => {
  const [getCheckout, { data: checkout, isSuccess, isLoading }] =
    useGetCheckoutMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomFromQuery = searchParams.get("room");
  const [addCheckout, { isLoading: addCheckOutLoading }] =
    useAddCheckoutMutation();
  const [showRooms, setShowRooms] = useState(false);
  const [totalBilling, setTotalBilling] = useState(0);
  const [fetch, setFetch] = useState(null);
  const [pBill, setPBill] = useState(0);
  const { isUserLoading, user } = useSelector((store) => store.authSlice);
  const { bookingId } = useSelector((store) => store.addOrderSlice);
  const { refundAmount, additionalCharge, serviceCharge, texAmount } =
    useSelector((state) => state.checkoutInfoCalSlice);
  const totalRefund =
    refundAmount - (additionalCharge + serviceCharge + texAmount);
  const totalPayableAmount =
    checkout?.data?.booking_info?.total_payable_amount +
    additionalCharge +
    serviceCharge +
    texAmount;
  // const {
  //   data: checkout,
  //   isLoading: checkoutLoading,
  //   isSuccess,
  // } = useGetCOInfoQuery(fetch);

  console.log("checkout :", checkout);
  const [paymentList, setPaymentList] = useState([
    { method: "", amount: "", trx: "", date: "" },
  ]);
  const handleResetCheckout = () => {
    setShowRooms(false);
  };

  // this is use for Print
  const componentRef = useRef();
  console.log({ pBill });
  // dispatch
  const dispatch = useDispatch();
  // console.log({ pBill });
  const formik = useFormik({
    initialValues: {
      hotel_id: "",
      roomNumber: "",
    },
    onSubmit: async () => {
      const room_numbers = checkout?.data?.room_bookings?.map(
        (i) => i?.room_id?.roomNumber
      );
      const initialPaidAmount =
        checkout?.data?.booking_info?.paid_amount +
        Number(paymentList[0].amount);
      const initialUnpaidAmount = totalPayableAmount - initialPaidAmount;

      console.log();
      const response = await addCheckout({
        hotel_id: checkout?.data?.booking_info?.hotel_id,
        new_total_payable_amount: totalPayableAmount,
        new_total_paid_amount:
          totalRefund > pBill
            ? checkout?.data?.booking_info?.paid_amount
            : initialPaidAmount,
        new_total_unpaid_amount:
          totalRefund > 0 ? totalRefund * -1 : initialUnpaidAmount,
        new_total_tax: checkout?.data?.booking_info?.total_tax + texAmount,
        new_total_additional_charges:
          checkout?.data?.booking_info?.total_additional_charges +
          additionalCharge,
        new_total_service_charges:
          checkout?.data?.booking_info?.total_service_charges + serviceCharge,
        guestName: checkout?.data?.booking_info?.guestName,
        room_numbers,
        payment_method: paymentList[0].method ? paymentList[0].method : "Cash",
        booking_ids: [bookingId],
        tran_id: paymentList[0].trx ? paymentList[0].trx : "",
        checked_in: checkout?.data?.room_bookings[0]?.from,
        checked_out: checkout?.data?.room_bookings[0]?.to,
        paid_amount: totalRefund > pBill ? 0 : Number(paymentList[0].amount),
        total_checkout_bills: pBill,
      });
      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Checkout Successful");
        // navigate("/dashboard/checkout");
        if (
          totalRefund > 0 &&
          checkout?.data?.booking_info?.room_ids?.length === 1
        ) {
          window.refundPayment.showModal();
        }
      }
    },
  });

  const {
    data: hotelInfo,
    isLoading: isHotelLoading,
    isSuccess: isHotelSuccess,
  } = useGetHotelByManagerIdQuery(user?._id);

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
  useEffect(() => {
    dispatch(clearAddOrderSlice());
    dispatch(clearCheckoutCalSlice());
  }, [fetch]);
  // set subtotal amount
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSubTotal(totalBilling));
      dispatch(setBookingInfo(checkout?.data?.booking_info));
      dispatch(
        setRefundAmount(
          checkout?.data?.booking_info?.total_unpaid_amount < 1
            ? Math.ceil(
                checkout?.data?.booking_info?.paid_amount -
                  checkout?.data?.booking_info?.total_payable_amount
              )
            : 0
        )
      );
    }
  }, [checkout, hotelInfo]);

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
      <div className="max-w-3xl mx-auto gap-5 items-center justify-center flex flex-col md:flex-row">
        <div className="">
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
          {isLoading ? (
            <span
              className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
              role="status"
            ></span>
          ) : null}
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
                    bookingInfo={checkout?.data?.booking_info}
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
              addCheckOutLoading={addCheckOutLoading}
              totalPayableAmount={totalPayableAmount}
              totalRefund={totalRefund}
            />
            <Modal id={`refundPayment`}>
              <RefundPaymentModal data={checkout?.data?.booking_info} />
            </Modal>
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
