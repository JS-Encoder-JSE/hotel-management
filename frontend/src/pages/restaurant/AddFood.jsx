import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TbReplaceFilled } from "react-icons/tb";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as yup from "yup";
import imgPlaceHolder from "../../assets/img-placeholder.jpg";
import { useUploadMutation } from "../../redux/baseAPI.js";
import { useAddFoodMutation } from "../../redux/restaurant/foodAPI.js";
import { useSelector } from "react-redux";
import { useGetRoomsAndHotelsQuery } from "../../redux/room/roomAPI.js";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  chooseHotel: yup.string().required("Hotel is required"),
  surveyorQuantity: yup.string().required("Surveyor quantity is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .integer("Price must be an integer"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description at least 20 characters length"),
  photos: yup.mixed().required("Images are required"),
});

const AddFood = () => {
  const [isLoading, setLoading] = useState(false);
  const [addFood] = useAddFoodMutation();
  const [upload] = useUploadMutation();
  const [selectedImages, setSelectedImages] = useState([]);
  const { user } = useSelector((store) => store.authSlice);
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      photos: null,
      surveyorQuantity: "",
      surveyorQuantityOthers: "",
      chooseHotel: "",
      category: "",
      categoryOthers: "",
      typeOfAlco: "",
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);

      const obj = { ...values };
      const {
        name: food_name,
        price,
        description,
        surveyorQuantity: serveyor_quantity,
        photos,
        chooseHotel: hotel_id,
      } = obj;

      const formData = new FormData();

      for (let i = 0; i < photos.length; i++) {
        const photoName = photos[i].name.substring(
          0,
          photos[i].name.lastIndexOf("."),
        );

        formData.append(photoName, photos[i]);
      }

      await upload(formData).then(
        (result) => (obj.images = result.data.imageUrls),
      );

      const response = await addFood({
        hotel_id,
        food_name,
        price,
        description,
        serveyor_quantity,
        images: obj.images,
      });

      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success(response.data.message);
        formikHelpers.resetForm();
        setSelectedImages([]);
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
    <div className={`max-w-xl bg-white rounded-2xl mx-auto p-8`}>
      <div
        className={`flex justify-between bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded`}
      >
        <h3 className={`flex text-2xl text-white space-x-1.5`}>
          <FaPlus />
          <span>Add Food / Beverage</span>
        </h3>
      </div>
      <form
        autoComplete="off"
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
              selectedImages?.map((image, idx) => (
                <SwiperSlide key={idx}>
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
        {/*<div className="flex flex-col gap-3">*/}
        {/*  <select*/}
        {/*    name="chooseHotel"*/}
        {/*    className="select select-md bg-transparent select-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"*/}
        {/*    value={formik.values.chooseHotel}*/}
        {/*    onChange={formik.handleChange}*/}
        {/*    onBlur={formik.handleBlur}*/}
        {/*  >*/}
        {/*    <option value="" selected disabled>*/}
        {/*      Choose Hotel*/}
        {/*    </option>*/}

        {/*    {hotelList?.map((i) => (*/}
        {/*      <option key={i._id} value={i._id}>*/}
        {/*        {i.name}*/}
        {/*      </option>*/}
        {/*    ))}*/}
        {/*  </select>*/}
        {/*  {formik.touched.chooseHotel && Boolean(formik.errors.chooseHotel) ? (*/}
        {/*      <small className="text-red-600">*/}
        {/*        {formik.touched.chooseHotel && formik.errors.chooseHotel}*/}
        {/*      </small>*/}
        {/*  ) : null}*/}
        {/*</div>*/}
        {/* name box */}
        <div className="flex flex-col gap-3">
          <select
            name="category"
            className="select select-md bg-transparent select-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Category
            </option>
            <option value="Liquor">Liquor</option>
            <option value="1">Kebab</option>
            <option value="2">Rice</option>
            <option value="3">Full Meal</option>
            <option value="4">Sneaks</option>
            <option value="5">Drinks</option>
            <option value="6">Deserts</option>
            <option value="7">Juices</option>
            <option value="8">Carries</option>
            <option value="9">Vegetarian Meals</option>
            <option value="Others">Others</option>
          </select>
          {formik.touched.category && Boolean(formik.errors.category) ? (
            <small className="text-red-600">
              {formik.touched.category && formik.errors.category}
            </small>
          ) : null}
        </div>
        {formik.values.category && formik.values.category === "Others" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Write your category"
              name="categoryOthers"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.categoryOthers}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.categoryOthers &&
            Boolean(formik.errors.categoryOthers) ? (
              <small className="text-red-600">
                {formik.touched.categoryOthers && formik.errors.categoryOthers}
              </small>
            ) : null}
          </div>
        ) : null}
        {/*{formik.values.category && formik.values.category === "Liquor" ? (*/}
        {/*  <div className="flex flex-col gap-3">*/}
        {/*    <input*/}
        {/*      type="text"*/}
        {/*      placeholder="Type of Alcohol"*/}
        {/*      name="typeOfAlco"*/}
        {/*      className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"*/}
        {/*      value={formik.values.typeOfAlco}*/}
        {/*      onChange={formik.handleChange}*/}
        {/*      onBlur={formik.handleBlur}*/}
        {/*    />*/}
        {/*    /!*{formik.touched.categoryOthers &&*!/*/}
        {/*    /!*Boolean(formik.errors.categoryOthers) ? (*!/*/}
        {/*    /!*    <small className="text-red-600">*!/*/}
        {/*    /!*      {formik.touched.categoryOthers && formik.errors.categoryOthers}*!/*/}
        {/*    /!*    </small>*!/*/}
        {/*    /!*) : null}*!/*/}
        {/*  </div>*/}
        {/*) : null}*/}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
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
        <div className="flex flex-col gap-3">
          {formik.values.category === "Liquor" ? (
            <select
              name="surveyorQuantity"
              className="select select-md bg-transparent select-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.surveyorQuantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Surveyor Quantity
              </option>
              <option value="">30 ML Peg</option>
              <option value="">60 ML Peg</option>
              <option value="">Quarter Bottle</option>
              <option value="">Half Bottle</option>
              <option value="">Full Bottle</option>
              <option value="Others">Others</option>
            </select>
          ) : (
            <input
              type="text"
              placeholder="Surveyor Quantity"
              name="surveyorQuantity"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.surveyorQuantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )}
          {formik.touched.surveyorQuantity &&
          Boolean(formik.errors.surveyorQuantity) ? (
            <small className="text-red-600">
              {formik.touched.surveyorQuantity &&
                formik.errors.surveyorQuantity}
            </small>
          ) : null}
        </div>
        {formik.values.surveyorQuantity &&
        formik.values.surveyorQuantity === "Others" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Write your surveyor quantity"
              name="surveyorQuantityOthers"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.surveyorQuantityOthers}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.surveyorQuantityOthers &&
            Boolean(formik.errors.surveyorQuantityOthers) ? (
              <small className="text-red-600">
                {formik.touched.surveyorQuantityOthers &&
                  formik.errors.surveyorQuantityOthers}
              </small>
            ) : null}
          </div>
        ) : null}
        {/* Price box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
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
        {/* photo box */}
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
        {/* Description */}
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
        {/* button */}
        <div className={`flex justify-between`}>
          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            <span>Add</span>
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
  );
};

export default AddFood;
