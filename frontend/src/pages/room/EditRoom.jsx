import React, { useEffect, useState } from "react";
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
import Select from "react-select";
import makeAnimated from "react-select/animated";

// form validation
const validationSchema = yup.object({
  category: yup.string().required("Category is required"),
  type: yup.string().required("Type is required"),
  capacity: yup.string().required("Capacity is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
  bedSize: yup.string().required("Bed size is required"),
  floorNumber: yup
    .number()
    .required("Floor number is required")
    .positive("Floor number must be a positive")
    .integer("Floor number must be an integer"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description at least 20 characters length"),
});

const EditRoom = () => {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const animatedComponents = makeAnimated();

  // This portion will come from api. and After fetching api needs a state [roomList, setRoomList]
  const roomList = [
    // { value: '', label: 'Room Select' },
    { value: "1 - Chocolate", label: "1 - Chocolate" },
    { value: "2 - Strawberry", label: "2 - Strawberry" },
    { value: "3 - Shake", label: "3 - Shake" },
    { value: "4 - AC", label: "4 - AC" },
    { value: "5 - None AC", label: "5 - None AC" },
    { value: "6 - Fan", label: "6 - Fan" },
    { value: "7 - Deluxe", label: "7 - Deluxe" },
    { value: "8 - None-Deluxe", label: "8 - None-Deluxe" },
    { value: "9 - Couple", label: "9 - Couple" },
    { value: "10 - Anniversary", label: "10 - Anniversary" },
    { value: "11 - Official", label: "11 - Official" },
    { value: "12 - VIP", label: "12 - VIP" },
  ];

  const handleSearchRoom = (e) => {
    const rooms = e.map((i) => i.value);
    setSelectedRooms(rooms);
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      type: "",
      capacity: "",
      price: "",
      bedSize: "",
      floorNumber: "",
      photos: null,
      description: "",
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

    formik.setFieldValue("photos", dataTransfer.files);
    setSelectedImages(tempImgs);
  };

  const handleChange = (idx, newFile) => {
    const updatedImages = [...selectedImages];
    updatedImages[idx] = newFile;

    const dataTransfer = new DataTransfer();

    for (const file of updatedImages) {
      dataTransfer.items.add(file);
    }

    formik.setFieldValue("photos", dataTransfer.files);
    setSelectedImages(updatedImages);
  };

  useEffect(() => {
    if (formik.values.photos) {
      const selectedImagesArray = Array.from(formik.values.photos);
      setSelectedImages(selectedImagesArray);
    }
  }, [formik.values.photos]);

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
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full mx-auto"
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
                      <label className="relative btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case">
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
                src="/temp/room-1.jpeg"
                alt=""
                className={`w-full h-96 object-cover rounded`}
              />
            )}
          </Swiper>
        </div>
        {/* category box */}
        <div className="flex flex-col gap-3">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={roomList}
            placeholder="Room Select"
            onChange={(e) => handleSearchRoom(e)}
          />
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
            type="text"
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
            type="text"
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
            type="text"
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
        <div className={`flex space-x-1.5`}>
          <div className="flex flex-col gap-3 w-full">
            <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
              {formik.values.photos ? (
                <span>{formik.values.photos.length + " files"}</span>
              ) : (
                <span className={`flex items-baseline space-x-1.5`}>
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
        </div>
        <div className="col-span-full flex flex-col gap-3">
          <textarea
            placeholder="Description"
            name="description"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && Boolean(formik.errors.description) ? (
            <small className="text-red-600">
              {formik.touched.description && formik.errors.description}
            </small>
          ) : null}
        </div>
        {/* submit button */}
        <div className=" col-span-full text-end mt-5">
          <button
            type="submit"
            className=" btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
