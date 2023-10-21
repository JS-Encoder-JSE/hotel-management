import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaArrowLeft, FaTrash, FaUpload } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TbReplaceFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

// form validation
const validationSchema = yup.object({
  category: yup.string().required("Category is required"),
  type: yup.string().required("Type is required"),
  capacity: yup.string().required("Capacity is required"),
  price: yup.string().required("Price is required"),
  bedSize: yup.string().required("Bed size is required"),
  floorNumber: yup.string().required("Floor number is required"),
  roomNumber: yup.string().required("Room number is required"),
});

const EditRoom = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      category: "",
      type: "",
      capacity: "",
      price: "",
      bedSize: "",
      floorNumber: "",
      roomNumber: "",
      photos: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`space-y-10 bg-white p-10 rounded-2xl`}>
      <div
        className={`flex justify-between bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded`}
      >
        <h3 className={`flex text-2xl text-white space-x-1.5`}>
          <FaPencil />
          <span>Edit Room</span>
        </h3>
        <div
          className={`flex hover:text-white hover:bg-transparent border border-white items-center space-x-1.5 bg-white text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
      </div>
      <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
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
            <SwiperSlide>
              <div className={`relative`}>
                <div className={`absolute top-3 right-3 space-x-1.5`}>
                  <button className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case">
                    <TbReplaceFilled />
                  </button>
                  <button className="btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy normal-case">
                    <FaTrash />
                  </button>
                </div>
                <img
                  src="/temp/room-1.jpeg"
                  alt=""
                  className={`w-auto h-auto rounded`}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`relative`}>
                <div className={`absolute top-3 right-3 space-x-1.5`}>
                  <button className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case">
                    <TbReplaceFilled />
                  </button>
                  <button className="btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy normal-case">
                    <FaTrash />
                  </button>
                </div>
                <img
                  src="/temp/room-2.jpeg"
                  alt=""
                  className={`w-auto h-auto rounded`}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`relative`}>
                <div className={`absolute top-3 right-3 space-x-1.5`}>
                  <button className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case">
                    <TbReplaceFilled />
                  </button>
                  <button className="btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy normal-case">
                    <FaTrash />
                  </button>
                </div>
                <img
                  src="/temp/room-3.jpeg"
                  alt=""
                  className={`w-auto h-auto rounded`}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* category box */}
        <div className="flex flex-col gap-3">
          <select
            name="category"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Category
            </option>
            <option value="general">General</option>
            <option value="deluxe">Deluxe</option>
          </select>
          {formik.touched.category && Boolean(formik.errors.category) ? (
            <small className="text-red-600">
              {formik.touched.category && formik.errors.category}
            </small>
          ) : null}
        </div>
        {/* type box */}
        <div className="flex flex-col gap-3">
          <select
            name="type"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Type
            </option>
            <option value="ac">AC</option>
            <option value="non-ac">Non AC</option>
          </select>
          {formik.touched.type && Boolean(formik.errors.type) ? (
            <small className="text-red-600">
              {formik.touched.type && formik.errors.type}
            </small>
          ) : null}
        </div>
        {/* capacity box */}
        <div className="flex flex-col gap-3">
          <select
            name="capacity"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Capacity
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
          {formik.touched.capacity && Boolean(formik.errors.capacity) ? (
            <small className="text-red-600">
              {formik.touched.capacity && formik.errors.capacity}
            </small>
          ) : null}
        </div>
        {/* price box */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Price"
            name="price"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && Boolean(formik.errors.price) ? (
            <small className="text-red-600">
              {formik.touched.price && formik.errors.price}
            </small>
          ) : null}
        </div>
        {/* bed size box */}
        <div className="flex flex-col gap-3">
          <select
            name="bedSize"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.bedSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Bed Size
            </option>
            <option value="sm">SM</option>
            <option value="lg">LG</option>
            <option value="xl">XL</option>
          </select>
          {formik.touched.bedSize && Boolean(formik.errors.bedSize) ? (
            <small className="text-red-600">
              {formik.touched.bedSize && formik.errors.bedSize}
            </small>
          ) : null}
        </div>
        {/* floor number box */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Floor Number"
            name="floorNumber"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.floorNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.floorNumber && Boolean(formik.errors.floorNumber) ? (
            <small className="text-red-600">
              {formik.touched.floorNumber && formik.errors.floorNumber}
            </small>
          ) : null}
        </div>
        {/* room number box */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Room Number"
            name="roomNumber"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.roomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.roomNumber && Boolean(formik.errors.roomNumber) ? (
            <small className="text-red-600">
              {formik.touched.roomNumber && formik.errors.roomNumber}
            </small>
          ) : null}
        </div>
        {/* room photos */}
        <div className="flex flex-col gap-3 ">
          <label className="relative input input-sm input-bordered border-gray-500/50 rounded  focus:outline-none p-2 h-auto bg-transparent">
            {formik.values.photos ? (
              <span>{formik.values.photos.length + " files"}</span>
            ) : (
              <span className={`flex items-baseline space-x-1.5 `}>
                <FaUpload />
                <span>Choose photos</span>
              </span>
            )}
            <input
              type="file"
              multiple
              name="photos"
              className="absolute left-0 top-0  overflow-hidden h-0"
              onChange={(e) =>
                formik.setFieldValue("photos", e.currentTarget.files)
              }
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.photos && Boolean(formik.errors.photos) ? (
            <small className="text-red-600">
              {formik.touched.photos && formik.errors.photos}
            </small>
          ) : null}
        </div>
        {/* submit button */}
        <div className=" col-span-full text-end mt-5 ">
          <button
            type="submit"
            className=" btn btn-sm  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case w-[90px] p-4 h-auto"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
