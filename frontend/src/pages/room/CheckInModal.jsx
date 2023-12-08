import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import {
  useAddBookingMutation,
  useGetHotelByIdQuery,
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
import { fromDateIsoConverter, toDateIsoConverter } from "../../utils/utils.js";
import { convertedFromDate, convertedToDate } from "../../utils/timeZone.js";

// form validation
const validationSchema = yup.object({
  // room_arr: yup.array().required("Room IDs are required"),
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
  // children: yup.number().when([], {
  //   is: (children) => children && children.length > 0,
  //   then: yup
  //     .number()
  //     .positive("Children must be a positive number")
  //     .integer("Children must be an integer"),
  // }),
  paymentMethod: yup.string().required("Payment method is required"),

  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "Cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),

  // trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
  //   if (paymentMethod !== "cash")
  //     return schema.required("Transaction ID is required");
  //   else return schema;
  // }),
  from: yup.string().required("From Date is required"),
  to: yup.string().required("To Date is required"),
  amount: yup.number(),
  nationality: yup.string().required("Nationality is required"),
  documentsType: yup.string().required("Documents type is required"),
  doc_number: yup.string().required("Document number is required"),
  documents: yup.string().required("Documents is required"),
});

const CheckInModal = ({ room }) => {
  // current Date
  const [currentDate, setCurrentDate] = useState(new Date());

  const closeRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [upload] = useUploadMutation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [addBooking] = useAddBookingMutation();

  // handleadvanceAmount
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
      documents: null,
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);
      const obj = {
        ...values,
        from: convertedFromDate(values.from),
        to: convertedToDate(values.to),
      };

      if (!obj.discount) obj.discount = 0;

      let room_ids = [];
      if (room) {
        room_ids.push(room?.data?._id);
      }

      // const room_ids = obj.room_arr.map((elem) => elem.value);
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

      for (let i = 0; i < obj.documents.length; i++) {
        const photoName = obj.documents[i].name.substring(
          0,
          obj.documents[i].name.lastIndexOf(".")
        );

        formData.append(photoName, obj.documents[i]);
      }

      await upload(formData).then(
        (result) => (tempImg = result.data?.imageUrls)
      );

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
        closeRef?.current?.click();
        setSelectedImages([]);
        toast.success(response.data.message);
      }

      setLoading(false);
    },
  });

  const handleDelete = (idx) => {
    const tempImgs = [
      ...selectedImages.slice(0, idx),
      ...selectedImages.slice(idx + 1),
    ];

    const dataTransfer = new DataTransfer();

    for (const file of tempImgs) {
      dataTransfer.items.add(file);
    }

    formik.setFieldValue("documents", dataTransfer.files);
    setSelectedImages(tempImgs);
  };

  const handleChange = (idx, newFile) => {
    const updatedImages = [...selectedImages];
    updatedImages[idx] = newFile;

    const dataTransfer = new DataTransfer();

    for (const file of updatedImages) {
      dataTransfer.items.add(file);
    }

    formik.setFieldValue("documents", dataTransfer.files);
    setSelectedImages(updatedImages);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };
  const { data: hotel } = useGetHotelByIdQuery(room?.data?.hotel_id);

  // useEffect(() => {
  //   if (room?.data) {
  //     formik.setValues({
  //       room_arr: [
  //         {
  //           label: `${room.data.roomNumber} - ${room.data.category}`,
  //           value: room.data._id,
  //           price: room.data.price,
  //         },
  //       ],
  //       hotel_id: room.data.hotel_id,
  //     });
  //   }
  // }, [room?.data]);

  useEffect(() => {
    if (formik.values.documents) {
      const selectedImagesArray = Array.from(formik.values.documents);
      setSelectedImages(selectedImagesArray);
    }
  }, [formik.values.documents]);

  return (
    <>
      <form autoComplete="off" method="dialog">
        <button
          ref={closeRef}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => formik.handleReset()}
        >
          ✕
        </button>
      </form>
      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Check In</h3>
        <hr />
        <form
          autoComplete="off"
          className="form-control grid grid-cols-1 gap-4 mt-5"
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
          {/*<div className="flex flex-col gap-3">*/}
          {/*  <select*/}
          {/*    name="hotel_id"*/}
          {/*    className="select select-md select-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"*/}
          {/*    value={formik.values.hotel_id}*/}
          {/*    onChange={formik.handleChange}*/}
          {/*    onBlur={formik.handleBlur}*/}
          {/*  >*/}
          {/*    <option value="" selected disabled>*/}
          {/*      {hotel?.name}*/}
          {/*    </option>*/}
          {/*  </select>*/}
          {/*  /!*{formik.touched.hotel_id && Boolean(formik.errors.hotel_id) ? (*!/*/}
          {/*  /!*  <small className="text-red-600">*!/*/}
          {/*  /!*    {formik.touched.hotel_id && formik.errors.hotel_id}*!/*/}
          {/*  /!*  </small>*!/*/}
          {/*  /!*) : null}*!/*/}
          {/*</div>*/}

          <div className="flex flex-col gap-3">
            <select
              name="room_arr"
              className="select select-md select-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.room_arr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                {room.data.roomNumber + " - " + room.data.category}
              </option>
            </select>
            {/*{formik.touched.room_arr && Boolean(formik.errors.room_arr) ? (*/}
            {/*  <small className="text-red-600">*/}
            {/*    {formik.touched.room_arr && formik.errors.room_arr}*/}
            {/*  </small>*/}
            {/*) : null}*/}
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
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/*{formik.touched.discount && Boolean(formik.errors.discount) ? (*/}
            {/*  <small className="text-red-600">*/}
            {/*    {formik.touched.discount && formik.errors.discount}*/}
            {/*  </small>*/}
            {/*) : null}*/}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-3">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="from"
              placeholderText={`From`}
              selected={formik.values.from}
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
                    {formik.values.documents ? (
                      <span>{formik.values.documents.length + " files"}</span>
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
                      onChange={(e) =>
                        formik.setFieldValue("documents", e.currentTarget.files)
                      }
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
          <div className={`flex justify-between`}>
            <button
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

export default CheckInModal;
