import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import {
  useAddBookingMutation,
  useGetAvailableRoomsByDateQuery,
  useGetRoomsAndHotelsQuery,
  useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import DatePicker from "react-datepicker";
import store from "../../redux/store.js";
import toast from "react-hot-toast";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TbReplaceFilled } from "react-icons/tb";
import { FaTrash, FaUpload } from "react-icons/fa";
import { useUploadMutation } from "../../redux/baseAPI.js";
import {
  customFilterOption,
  fromDateIsoConverter,
  toDateIsoConverter,
} from "../../utils/utils.js";
import {
  convertedEndDate,
  convertedStartDate,
  getEndDateOfBookingIst,
  getStartDateOFBookingIST,
} from "../../utils/timeZone.js";
import { useSelector } from "react-redux";

// form validation
const validationSchema = yup.object({
  room_arr: yup.array().required("Room IDs are required"),
  // hotel_id: yup.string().required("Hotel ID is required"),
  guestName: yup.string().required("Guest name is required"),
  address: yup.string().required("Address is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  emergency_contact: yup.string().required("Emergency contact is required"),
  adult: yup
    .number()
    .required("Adult is required")
    .positive("Adult must be a positive number")
    .integer("Adult must be an integer"),

  children: yup.number(),
  discount: yup.number(),
  paymentMethod: yup.string().when(["amount"], (amount, schema) => {
    if (amount.length > 1 || (amount > 0 && amount !== undefined)) {
      return schema.required("Payment method is required");
    } else {
      return schema;
    }
  }),
  amount: yup.number(),
  trxID: yup.string().when(["paymentMethod"], (paymentMethod, schema) => {
    console.log(paymentMethod);
    if (
      paymentMethod.includes("Card") ||
      paymentMethod.includes("Mobile_Banking")
    ) {
      return schema.required("Transaction ID is required");
    } else {
      return schema;
    }
  }),
  from: yup.string().required("From Date is required"),
  to: yup.string().required("To Date is required"),
  nationality: yup.string().required("Nationality is required"),
  documentsType: yup.string().required("Documents type is required"),
  doc_number: yup
    .number()
    .required("Doc number is required")
    .positive("Doc number must be a positive number")
    .integer("Doc number must be an integer"),
  documents: yup.array().test("fileCount", "Documents is required", (value) => {
    return value && value.length > 0;
  }),
});

const ManageCheckinModal = () => {
  const closeRef = useRef(null);
  // current date
  const [currentDate, setCurrentDate] = useState(new Date());

  const [isLoading, setLoading] = useState(false);
  const [upload, { isError, error }] = useUploadMutation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [addBooking] = useAddBookingMutation();
  const [selectorValue, setSelectorValue] = useState([]);
  // handleAmount
  const handleAmount = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.amount;
    if (inputValue >= 0) {
      // Update the Formik state
      formik.handleChange(e);
    } else if (inputValue === "") {
      e.target.value = 0;
      formik.handleChange(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      room_arr: [],
      hotel_id: "",
      guestName: "",
      address: "",
      mobileNumber: "",
      emergency_contact: "",
      adult: "",
      children: "",
      paymentMethod: "",
      trxID: "",
      from: currentDate,
      to: "",
      amount: "",
      discount: "",
      nationality: "",
      documentsType: "",
      doc_number: "",
      documents: [],
    },

    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);
      const obj = {
        ...values,
        from: getStartDateOFBookingIST(values.from),
        to: getEndDateOfBookingIst(values.to),
      };

      if (!obj.discount) obj.discount = 0;

      const room_ids = obj.room_arr.map((elem) => elem.value);
      const no_of_days = Math.ceil(
        Math.abs(new Date(obj.to) - new Date(obj.from)) / (24 * 60 * 60 * 1000)
      );
      const rent_per_day = obj.room_arr.reduce(
        (init, current) => init + current.price,
        0
      );
      const total_rent = no_of_days * rent_per_day;
      const discount = (total_rent * obj.discount) / 100;
      const amount_after_dis = total_rent - discount;
      let title;
      let tempImg;

      switch (obj.documentsType) {
        case "Aadhar Card":
          title = "nid";
          break;
        case "Passport":
          title = "passport";
          break;
        case "Driving Licence":
          title = "driving_lic_img";
      }

      const formData = new FormData();

      for (let i = 0; i < selectedImages.length; i++) {
        const photoName = selectedImages[i].name.substring(
          0,
          selectedImages[i].name.lastIndexOf(".")
        );

        formData.append(photoName, selectedImages[i]);
      }

      await upload(formData).then(
        (result) => (tempImg = result.data.imageUrls)
      );
      if (!isError) {
        const response = await addBooking({
          hotel_id: obj.hotel_id,
          room_ids,
          guestName: obj.guestName,
          address: obj.address,
          mobileNumber: obj.mobileNumber,
          emergency_contact: obj.emergency_contact,
          adult: obj.adult,
          children: obj.children,
          paymentMethod: obj.paymentMethod,
          transection_id: obj.trxID,
          from: obj.from,
          to: obj.to,
          checkin_date: new Date().toISOString(),
          no_of_days,
          // rent_per_day,
          total_rent,
          room_discount: obj.discount,
          // amount_after_dis,
          paid_amount: typeof obj.amount === "number" ? obj.amount : 0,
          // total_unpaid_amount: amount_after_dis - obj.amount,
          nationality: obj.nationality,
          doc_number: obj.doc_number,
          doc_images: {
            [title]: tempImg,
          },
          remark: "advancePaymentForCheckIn",
          status: "CheckedIn",
        });

        if (response?.error) {
          toast.error(response.error.data.message);
        } else {
          formikHelpers.resetForm();
          closeRef.current.click();
          setSelectedImages([]);
          setSelectorValue([]);
          toast.success("Successfully check in");
        }
      } else {
        toast.error("Image is not uploaded");
      }

      setLoading(false);
      formReset();
    },
  });

  const handleDelete = (idx) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(idx, 1);

    formik.setFieldValue("documents", updatedImages);
    setSelectedImages(updatedImages);
  };

  const handleChange = (idx, newFile) => {
    const updatedImages = [...selectedImages];
    updatedImages[idx] = newFile;
    formik.setFieldValue("documents", updatedImages);
    setSelectedImages(updatedImages);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };
  const { data: rooms } = useRoomsQuery({
    id: formik.values.hotel_id,
    limit: 1000000,
  });

  const { data: hotelsList } = useGetRoomsAndHotelsQuery();

  const handleChildrenCheckIn = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.children;
    if (inputValue >= 0) {
      // Update the Formik state
      formik.handleChange(e);
    } else if (inputValue === "") {
      e.target.value = 0;
      formik.handleChange(e);
    }
  };
  const handleDiscount = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.discount;
    if (inputValue >= 0) {
      // Update the Formik state
      formik.handleChange(e);
    } else if (inputValue === "") {
      e.target.value = 0;
      formik.handleChange(e);
    }
  };

  const { isUserLoading, user } = useSelector((store) => store.authSlice);

  const {
    data: availableRooms,
    isSuccess,
    isLoading: availableRoomsLoading,
  } = useGetAvailableRoomsByDateQuery(
    {
      hotel_id: user?.assignedHotel[0],
      fromDate: formik.values.from
        ? getStartDateOFBookingIST(formik.values.from)
        : "",
      toDate: formik.values.to ? getEndDateOfBookingIst(formik.values.to) : "",
    },
    { skip: !formik.values.to }
  );

  const availableRoomsByDate = availableRooms?.data.map((room) => ({
    label: `${room.roomNumber} - ${room.category}`,
    value: room._id,
  }));


  const [roomError, setRoomError] = useState("");

  const handleErrorForAvailableRooms = () => {
    if (!formik.values.to) {
      setRoomError("Please select booking date");
    }
    if (formik.values.to) {
      setRoomError("");
    }
  };

  useEffect(() => {
    if (formik.values.to) {
      setRoomError("");
    }
  }, [formik.values.to]);

  return (
    <>
      <form autoComplete="off" method="dialog">
        <button
          onClick={() => {
            setSelectedImages([]);
            closeRef.current.click();
            formik.resetForm();
          }}
          ref={closeRef}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <div className={`max-w-xl sm:max-w-full rounded-2xl mx-auto p-8 `}>
        <h3 className={`text-2xl font-semibold mb-3`}>Check In</h3>
        <hr />
        <form
          autoComplete="off"
          className="form-control grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 "
          onSubmit={formik.handleSubmit}
        >
          {selectedImages?.length ? (
            <div className={`relative col-span-full`}>
              <div className="swiper-controller absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-between w-full px-4 z-10">
                <div className="swiper-er-button-prev flex justify-center items-center bg-green-slimy text-white w-6 h-6 rounded-full cursor-pointer">
                  <MdOutlineKeyboardArrowLeft />
                </div>
                <div className="swiper-er-button-next flex justify-center items-center bg-green-slimy text-white w-6 h-6 rounded-full cursor-pointer">
                  <MdOutlineKeyboardArrowRight />
                </div>
              </div>
              <Swiper
                modules={[Navigation]}
                navigation={{
                  enabled: true,
                  prevEl: ".swiper-er-button-prev",
                  nextEl: ".swiper-er-button-next",
                  disabledClass: "swiper-er-button-disabled",
                }}
                slidesPerView={1}
                spaceBetween={50}
              >
                {selectedImages.length
                  ? selectedImages.map((image, idx) => (
                      <SwiperSlide>
                        <div className={`relative`}>
                          <div className={`absolute top-3 right-3 space-x-1.5`}>
                            <label className="relative btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case rounded">
                              <TbReplaceFilled />
                              <input
                                type="file"
                                className="absolute left-0 top-0  overflow-hidden h-0"
                                onChange={(e) =>
                                  handleChange(idx, e.currentTarget.files[0])
                                }
                              />
                            </label>
                            <button
                              className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                              onClick={() => handleDelete(idx)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                          <img
                            key={idx}
                            src={URL.createObjectURL(image)}
                            alt=""
                            className={`w-full h-96 object-cover rounded`}
                          />
                        </div>
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
            </div>
          ) : null}
          {/* Date */}
          <div className="flex flex-col gap-3">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="from"
              placeholderText={`From`}
              selected={formik.values.from}
              maxDate={new Date()}
              className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
              onChange={(date) => formik.setFieldValue("from", date)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.from && Boolean(formik.errors.from) ? (
              <small className="text-red-600">
                {formik.touched.from && formik.errors.from}
              </small>
            ) : null}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-3">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="to"
              placeholderText={`To`}
              minDate={new Date()}
              selected={formik.values.to}
              className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
              onChange={(date) => formik.setFieldValue("to", date)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.to && Boolean(formik.errors.to) ? (
              <small className="text-red-600">
                {formik.touched.to && formik.errors.to}
              </small>
            ) : null}
          </div>
          <div
            onClick={handleErrorForAvailableRooms}
            className="flex flex-col gap-3"
          >
            <Select
              placeholder="Select Rooms"
              defaultValue={formik.values.room_arr}
              value={selectorValue}
              options={availableRoomsByDate}
              filterOption={customFilterOption}
              isMulti
              isSearchable
              isDisabled={
                availableRoomsLoading ||
                !formik.values.from ||
                !formik.values.to
              }
              closeMenuOnSelect={false}
              // onKeyDown={handleKeyDown}
              onChange={(e) => {
                setSelectorValue(e);
                formik.setFieldValue("room_arr", e);
              }}
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
            {roomError && (
              <small className="text-red-600 text-small">{roomError}</small>
            )}
            {formik.touched.room_arr && Boolean(formik.errors.room_arr) ? (
              <small className="text-red-600">
                {formik.touched.room_arr && formik.errors.room_arr}
              </small>
            ) : null}
          </div>

          {/* Guest box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Guest name"
              name="guestName"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.guestName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.guestName && Boolean(formik.errors.guestName) ? (
              <small className="text-red-600">
                {formik.touched.guestName && formik.errors.guestName}
              </small>
            ) : null}
          </div>
          {/* Address box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && Boolean(formik.errors.address) ? (
              <small className="text-red-600">
                {formik.touched.address && formik.errors.address}
              </small>
            ) : null}
          </div>
          {/* mobileNumber box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Mobile number"
              name="mobileNumber"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobileNumber &&
            Boolean(formik.errors.mobileNumber) ? (
              <small className="text-red-600">
                {formik.touched.mobileNumber && formik.errors.mobileNumber}
              </small>
            ) : null}
          </div>
          {/* emergency  box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Emergency Number"
              name="emergency_contact"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.emergency_contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.emergency_contact &&
            Boolean(formik.errors.emergency_contact) ? (
              <small className="text-red-600">
                {formik.touched.emergency_contact &&
                  formik.errors.emergency_contact}
              </small>
            ) : null}
          </div>

          {/* adult box */}
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Adult"
              name="adult"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.adult}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.adult && Boolean(formik.errors.adult) ? (
              <small className="text-red-600">
                {formik.touched.adult && formik.errors.adult}
              </small>
            ) : null}
          </div>

          {/* children box */}
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Children"
              name="children"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.children}
              onChange={handleChildrenCheckIn}
              onBlur={formik.handleBlur}
            />
            {formik.touched.children && Boolean(formik.errors.children) ? (
              <small className="text-red-600">
                {formik.touched.children && formik.errors.children}
              </small>
            ) : null}
          </div>

          {/* advanced amount */}
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Advanced Amount"
              name="amount"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.amount}
              onChange={handleAmount}
              onBlur={formik.handleBlur}
            />
            {formik.touched.amount && Boolean(formik.errors.amount) ? (
              <small className="text-red-600">
                {formik.touched.amount && formik.errors.amount}
              </small>
            ) : null}
          </div>

          {/* payment method box */}
          <div className="flex flex-col gap-3">
            <select
              name="paymentMethod"
              className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Payment Method
              </option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Mobile_Banking">Mobile Banking</option>
            </select>
            {formik.touched.paymentMethod &&
            Boolean(formik.errors.paymentMethod) ? (
              <small className="text-red-600">
                {formik.touched.paymentMethod && formik.errors.paymentMethod}
              </small>
            ) : null}
          </div>
          {formik.values.paymentMethod &&
          formik.values.paymentMethod !== "Cash" ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Transaction ID"
                name="trxID"
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
                value={formik.values.trxID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.trxID && Boolean(formik.errors.trxID) ? (
                <small className="text-red-600">
                  {formik.touched.trxID && formik.errors.trxID}
                </small>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Discount"
              name="discount"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.discount}
              onChange={handleDiscount}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* Nationality box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nationality"
              name="nationality"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nationality &&
            Boolean(formik.errors.nationality) ? (
              <small className="text-red-600">
                {formik.touched.nationality && formik.errors.nationality}
              </small>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <select
              name="documentsType"
              className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
              value={formik.values.documentsType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Type Of Documents
              </option>
              <option value="Aadhar Card">Aadhar Card / ID</option>
              <option value="Passport">Passport</option>
              <option value="Driving Licence">Driving Licence</option>
            </select>
            {formik.touched.documentsType &&
            Boolean(formik.errors.documentsType) ? (
              <small className="text-red-600">
                {formik.touched.documentsType && formik.errors.documentsType}
              </small>
            ) : null}
          </div>
          {formik.values.documentsType ? (
            <>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Document Number"
                  name="doc_number"
                  className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
                  value={formik.values.doc_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.doc_number &&
                Boolean(formik.errors.doc_number) ? (
                  <small className="text-red-600">
                    {formik.touched.doc_number && formik.errors.doc_number}
                  </small>
                ) : null}
              </div>
              <div className={`flex space-x-1.5`}>
                <div className="flex flex-col gap-3 w-full">
                  <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
                    {selectedImages.length ? (
                      <span>{selectedImages.length + " files"}</span>
                    ) : (
                      <span className={`flex items-baseline space-x-1.5`}>
                        <FaUpload />
                        <span>Choose documents</span>
                      </span>
                    )}
                    <input
                      type="file"
                      multiple
                      name="documents"
                      className="absolute left-0 top-0  overflow-hidden h-0"
                      onChange={(e) => {
                        const selectedImagesArray = Array.from(
                          e.currentTarget.files
                        );
                        formik.setFieldValue("documents", [
                          ...formik.values.documents,
                          ...selectedImagesArray,
                        ]);
                        setSelectedImages([
                          ...selectedImages,
                          ...selectedImagesArray,
                        ]);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                  {formik.touched.documents &&
                  Boolean(formik.errors.documents) ? (
                    <small className="text-red-600">
                      {formik.touched.documents && formik.errors.documents}
                    </small>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}

          {/* button */}
          <div className={`flex justify-between sm:col-span-2`}>
            <button
              disabled={isLoading}
              type={"submit"}
              className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              Confirm
              {isLoading ? (
                <span
                  className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                  role="status"
                ></span>
              ) : null}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageCheckinModal;
