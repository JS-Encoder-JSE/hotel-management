import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TbReplaceFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  designation: yup.string().required("Designation is required"),
  shift: yup.string().required("Shift is required"),
  salary: yup.string().required("Salary is required"),
  street: yup.string().required("Street address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("Zip is required"),
});

const EditEmployee = () => {
  const [userImgPrev, setUserImgPrev] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      phone: "",
      shift: "",
      salary: "",
      street: "",
      state: "",
      city: "",
      zip: "",
      userImg: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (formik.values.userImg) {
      const reader = new FileReader();

      reader.onload = () => setUserImgPrev(reader.result);
      reader.readAsDataURL(formik.values.userImg);
    } else {
      setUserImgPrev(null);
    }
  }, [formik.values.userImg]);

  return (
    <div className={`space-y-10`}>
      <div
        className={`flex justify-between bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded`}
      >
        <h3 className={`flex text-2xl text-white space-x-1.5`}>
          <FaPencil />
          <span>Edit Employee</span>
        </h3>
        <div
          className={`flex hover:text-white hover:bg-transparent border border-white items-center space-x-1.5 bg-white text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
      </div>
      <form autoComplete="off"
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className={`col-span-full relative rounded overflow-hidden`}>
          <div className={`absolute top-3 right-3`}>
            <label className="relative btn btn-md p-2 h-auto bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-gray-500/50 focus:border-green-slimy normal-case">
              <TbReplaceFilled />
              <input
                type="file"
                name="userImg"
                className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("userImg", e.currentTarget.files[0])
                }
                onBlur={formik.handleBlur}
              />
            </label>
          </div>
          <img
            src={userImgPrev || "https://daisyui.com/tailwind-css-component-profile-2@56w.png"}
            alt=""
            className={`w-full h-96 object-cover`}
          />
        </div>
        {/* name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-md p-2 h-auto input-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
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
        {/* designation box */}
        <div className="flex flex-col gap-3">
          <select
            name="designation"
            className="select select-md p-2 h-auto select-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Designation
            </option>
            <option value="waiter">Waiter</option>
            <option value="housekeeper">House Keeper</option>
          </select>
          {formik.touched.designation && Boolean(formik.errors.designation) ? (
            <small className="text-red-600">
              {formik.touched.designation && formik.errors.designation}
            </small>
          ) : null}
        </div>
        {/* shift box */}
        <div className="flex flex-col gap-3">
          <select
            name="shift"
            className="select select-md p-2 h-auto select-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.shift}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Shift
            </option>
            <option value="day">Day</option>
            <option value="night">Night</option>
          </select>
          {formik.touched.shift && Boolean(formik.errors.shift) ? (
            <small className="text-red-600">
              {formik.touched.shift && formik.errors.shift}
            </small>
          ) : null}
        </div>
        {/* salary box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Salary"
            name="salary"
            className="input input-md p-2 h-auto input-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.salary && Boolean(formik.errors.salary) ? (
            <small className="text-red-600">
              {formik.touched.salary && formik.errors.salary}
            </small>
          ) : null}
        </div>
        {/* street box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Street address"
            name="street"
            className="input input-md p-2 h-auto input-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.street && Boolean(formik.errors.street) ? (
            <small className="text-red-600">
              {formik.touched.street && formik.errors.street}
            </small>
          ) : null}
        </div>
        {/* state box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="State"
            name="state"
            className="input input-md p-2 h-auto input-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.state && Boolean(formik.errors.state) ? (
            <small className="text-red-600">
              {formik.touched.state && formik.errors.state}
            </small>
          ) : null}
        </div>
        {/* city box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="City"
            name="city"
            className="input input-md p-2 h-auto input-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && Boolean(formik.errors.city) ? (
            <small className="text-red-600">
              {formik.touched.city && formik.errors.city}
            </small>
          ) : null}
        </div>
        {/* zip box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Zip"
            name="zip"
            className="input input-md p-2 h-auto input-bordered border-gray-500/50 focus:border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.zip && Boolean(formik.errors.zip) ? (
            <small className="text-red-600">
              {formik.touched.zip && formik.errors.zip}
            </small>
          ) : null}
        </div>
        {/* update button */}
        <button
          type="submit"
          className="col-span-full btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
