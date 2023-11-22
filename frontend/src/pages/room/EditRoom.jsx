import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft, FaTrash, FaUpload } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TbReplaceFilled } from "react-icons/tb";
import { Rings } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as yup from "yup";
import { useUploadSingleMutation } from "../../redux/baseAPI.js";
import {
  useRoomQuery,
  useUpdateRoomMutation,
} from "../../redux/room/roomAPI.js";

// form validation
const validationSchema = yup.object({
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description at least 20 characters length"),
});

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoading, data: room } = useRoomQuery(id);
  const [selectedImages, setSelectedImages] = useState([]);
  const [updateRoom] = useUpdateRoomMutation();
  const [uploadSingle] = useUploadSingleMutation();

  const formik = useFormik({
    initialValues: {
      category: "",
      type: "",
      capacity: "",
      price: "",
      floorNumber: "",
      bedSize: "",
      photos: null,
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const obj = { ...values };
      const images = [...selectedImages];

      for (let i = 0; i < images.length; i++) {
        if (typeof images[i] !== "string") {
          const formData = new FormData();
          const photoName = images[i].name.substring(
            0,
            images[i].name.lastIndexOf("."),
          );

          formData.append(photoName, images[i]);
          await uploadSingle(formData).then((result) =>
            images.splice(i, 1, result.data.imageUrl),
          );
        }
      }

      obj.images = images;
      obj.air_conditioned = obj.ac;
      delete obj.ac;
      delete obj.photos;

      const response = await updateRoom({ id, data: obj });

      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
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
      if (typeof file !== "string") {
        dataTransfer.items.add(file);
      }
    }

    setSelectedImages(tempImgs);
  };

  const handleChange = (idx, newFile) => {
    const updatedImages = [...selectedImages];
    updatedImages[idx] = newFile;

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(updatedImages[idx]);
    updatedImages.splice(idx, 1, dataTransfer.files[0]);

    setSelectedImages(updatedImages);
  };

  useEffect(() => {
    if (formik.values.photos) {
      const selectedImagesArray = Array.from(formik.values.photos);
      setSelectedImages([...selectedImages, ...selectedImagesArray]);
    }
  }, [formik.values.photos]);

  useEffect(() => {
    if (room) {
      formik.setValues({
        category: room?.data?.category,
        type: room?.data?.type,
        capacity: room?.data?.capacity,
        price: room?.data?.price,
        bedSize: room?.data?.bedSize,
        floorNumber: room?.data?.floorNumber,
        ac: room?.data?.air_conditioned,
        description: room?.data?.description,
      });

      setSelectedImages(room?.data?.images);
    }
  }, [room]);

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
      {!isLoading ? (
        <form
          autoComplete="off"
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
              {selectedImages?.map((image, idx) => (
                <SwiperSlide key={idx}>
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
                    {typeof image === "string" ? (
                      <img
                        key={idx}
                        src={image}
                        alt=""
                        className={`w-full h-96 object-cover rounded`}
                      />
                    ) : (
                      <img
                        key={idx}
                        src={URL.createObjectURL(image)}
                        alt=""
                        className={`w-full h-96 object-cover rounded`}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="President Suite">President Suite</option>
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
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Twin">Twin</option>
            </select>
            {formik.touched.type && Boolean(formik.errors.type) ? (
              <small className="text-red-600">
                {formik.touched.type && formik.errors.type}
              </small>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <label className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy space-x-1.5 flex items-center">
              <input
                type="checkbox"
                name="ac"
                className="checkbox checkbox-sm"
                checked={formik.values.ac}
                onChange={formik.handleChange}
              />
              <span className="label-text">AC?</span>
            </label>
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
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="King">King</option>
            </select>
            {formik.touched.bedSize && Boolean(formik.errors.bedSize) ? (
              <small className="text-red-600">
                {formik.touched.bedSize && formik.errors.bedSize}
              </small>
            ) : null}
          </div>
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
            {formik.touched.floorNumber &&
            Boolean(formik.errors.floorNumber) ? (
              <small className="text-red-600">
                {formik.touched.floorNumber && formik.errors.floorNumber}
              </small>
            ) : null}
          </div>
          {/* room photos */}
          <div className={`flex space-x-1.5`}>
            <div className="flex flex-col gap-3 w-full">
              <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
                {selectedImages?.length ? (
                  <span>{selectedImages?.length + " files"}</span>
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
            {formik.touched.description &&
            Boolean(formik.errors.description) ? (
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
              <span>Update</span>
              {loading ? (
                <span
                  className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                  role="status"
                ></span>
              ) : null}
            </button>
          </div>
        </form>
      ) : (
        <Rings
          width="50"
          height="50"
          color="#37a000"
          wrapperClass="justify-center"
        />
      )}
    </div>
  );
};

export default EditRoom;
