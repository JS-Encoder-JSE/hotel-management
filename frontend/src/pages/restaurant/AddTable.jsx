import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
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
  number: yup.string().required("Table number is required"),
});

const AddTable = () => {
  const [isLoading, setLoading] = useState(false);
  const [addFood] = useAddFoodMutation();
  const [upload] = useUploadMutation();
  const [selectedImages, setSelectedImages] = useState([]);
  const { user } = useSelector((store) => store.authSlice);
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      number: "",
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
        className={`flex justify-between bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded `}
      >
        <h3 className={`flex text-2xl text-white space-x-1.5 `}>
          <FaPlus />
          <span>Add Table</span>
        </h3>
      </div>
      <form
        autoComplete="off"
        className="form-control grid grid-cols-1 gap-4 mt-5"
        onSubmit={formik.handleSubmit}
      >
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
        {/* Price box */}
        <div className="flex flex-col gap-3 mt-6 mb-6">
          <input
            type="text"
            placeholder="Table number"
            name="number"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.number && Boolean(formik.errors.number) ? (
            <small className="text-red-600">
              {formik.touched.number && formik.errors.number}
            </small>
          ) : null}
        </div>
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

export default AddTable;
