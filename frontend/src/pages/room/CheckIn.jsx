import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaTrash, FaUpload } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TbReplaceFilled } from "react-icons/tb";
import imgPlaceHolder from "../../assets/img-placeholder.jpg";
import Select from "react-select";
import { useRoomsQuery } from "../../redux/room/roomAPI.js";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  mobile: yup.string().required("Mobile number is required"),
  emergencyNumber: yup.string().required("Emergency Number number is required"),
  address: yup.string().required("Address Number number is required"),
  // age: yup
  //   .number()
  //   .required("Age is required")
  //   .positive("Age must be a positive number")
  //   .integer("Age must be an integer"),
  adult: yup
    .number()
    .required("Adult is required")
    .positive("Adult must be a positive number")
    .integer("Adult must be an integer"),
  // children: yup.number().when(["children"], ([children], schema) => {
  //   if (children)
  //     return schema
  //       .positive("Children must be a positive number")
  //       .integer("Children must be an integer");
  //   else return schema;
  // }),
  paymentMethod: yup.string().required("Payment method is required"),
  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),
  // discount: yup.number().when(["discount"], ([discount], schema) => {
  //   if (discount)
  //     return schema
  //       .positive("Discount must be a positive number")
  //       .integer("Discount must be an integer");
  //   else return schema;
  // }),
  documents: yup.mixed().required("Documents are required"),
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  nationality: yup.string().required("Nationality is required"),
});

const CheckIn = () => {
  const { isLoading, data: rooms } = useRoomsQuery();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      adult: "",
      children: "",
      paymentMethod: "",
      trxID: "",
      discount: "",
      fromDate: "",
      toDate: "",
      nationality: "",
      documents: null,
      emergencyNumber: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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

  const transformedRooms = rooms?.data?.map((room) => ({
    value: room.roomNumber,
    label: `${room.roomNumber} - ${room.category}`,
  }));

  useEffect(() => {
    if (formik.values.documents) {
      const selectedImagesArray = Array.from(formik.values.documents);
      setSelectedImages(selectedImagesArray);
    }
  }, [formik.values.documents]);

  return (
    <div className={`max-w-xl bg-white rounded-2xl mx-auto p-8`}>
      <h3 className={`text-2xl font-semibold mb-3`}>Check In</h3>
      <hr />
      <form
        className="form-control grid grid-cols-1 gap-4 mt-5"
        onSubmit={formik.handleSubmit}
      >
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
            {selectedImages.length ? (
              selectedImages.map((image, idx) => (
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
            ) : (
              <img
                src={imgPlaceHolder}
                alt=""
                className={`w-full h-96 object-cover rounded`}
              />
            )}
          </Swiper>
        </div>
        <div className="flex flex-col gap-3">
          <Select
            placeholder="Room Select"
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
        {/* name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Guest name"
            name="name"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && Boolean(formik.errors.name) ? (
            <small className="text-red-600">
              {formik.touched.name && formik.errors.name}
            </small>
          ) : null}
        </div>
        {/* mobile box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Mobile number"
            name="mobile"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobile && Boolean(formik.errors.mobile) ? (
            <small className="text-red-600">
              {formik.touched.mobile && formik.errors.mobile}
            </small>
          ) : null}
        </div>
        {/* emergency Number  box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Emergency Number"
            name="emergencyNumber"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.emergencyNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.emergencyNumber && Boolean(formik.errors.emergencyNumber) ? (
            <small className="text-red-600">
              {formik.touched.emergencyNumber && formik.errors.emergencyNumber}
            </small>
          ) : null}
        </div>
        {/* Address   box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Address"
            name="address"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
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
        {/* adult box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Adult"
            name="adult"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
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
            type="text"
            placeholder="Children"
            name="children"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
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
        {/* payment method box */}
        <div className="flex flex-col gap-3">
          <select
            name="paymentMethod"
            className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Payment Method
            </option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mfs">Mobile Banking</option>
          </select>
          {formik.touched.paymentMethod &&
          Boolean(formik.errors.paymentMethod) ? (
            <small className="text-red-600">
              {formik.touched.paymentMethod && formik.errors.paymentMethod}
            </small>
          ) : null}
        </div>
        {formik.values.paymentMethod &&
        formik.values.paymentMethod !== "cash" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Transaction ID"
              name="trxID"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
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
            type="text"
            placeholder="Discount"
            name="discount"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.discount && Boolean(formik.errors.discount) ? (
            <small className="text-red-600">
              {formik.touched.discount && formik.errors.discount}
            </small>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="From  MM/DD/YYY"
            name="fromDate"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            onBlur={(e) => {
              e.target.type = "text";
              formik.handleBlur;
            }}
            onFocus={(e) => (e.target.type = "date")}
          />
          {formik.touched.fromDate && Boolean(formik.errors.fromDate) ? (
            <small className="text-red-600">
              {formik.touched.fromDate && formik.errors.fromDate}
            </small>
          ) : null}
        </div>
        {/*Billing To box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="To  MM/DD/YYY"
            name="toDate"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.toDate}
            onChange={formik.handleChange}
            onBlur={(e) => {
              e.target.type = "text";
              formik.handleBlur;
            }}
            onFocus={(e) => (e.target.type = "date")}
          />
          {formik.touched.toDate && Boolean(formik.errors.toDate) ? (
            <small className="text-red-600">
              {formik.touched.toDate && formik.errors.toDate}
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
            {formik.touched.nationality && Boolean(formik.errors.nationality) ? (
              <small className="text-red-600">
                {formik.touched.nationality && formik.errors.nationality}
              </small>
            ) : null}
          </div>
        {/* documents */}
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
            {formik.touched.documents && Boolean(formik.errors.documents) ? (
              <small className="text-red-600">
                {formik.touched.documents && formik.errors.documents}
              </small>
            ) : null}
          </div>
        </div>
        {/* button */}
        <div className={`flex justify-between`}>
          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckIn;
