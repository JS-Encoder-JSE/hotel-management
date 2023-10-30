import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Sub Admin Name is required"),
  address: yup.string().required("Sub Admin Address is required"),
  email: yup.string().required("Sub Admin Email is required"),
  phoneNumber: yup.string().required("Sub Admin Phone Number size is required"),
  salary: yup.string().required("Sub Admin Salary size is required"),
});

const SubAdminProfile = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      salary: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div
      className={`relative max-w-xl bg-white rounded-2xl mx-auto p-8 pt-10 mt-20`}
    >
      <div>
        <div className="absolute -top-16 inset-x-1/2 -translate-x-1/2 border-4 border-green-slimy rounded-full h-32 w-32">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt=""
              className="object-cover object-top h-full w-full rounded-full"
            />
          ) : (
            <img
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
              alt=""
              className="object-cover h-full w-full rounded-full"
            />
          )}
        </div>
        <div className={`text-end`}>
          <button
            type="button"
            className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded-md normal-case"
            onClick={() => navigate("edit")}
          >
            Edit
          </button>
        </div>
      </div>

      <form
        className="form-control grid grid-cols-1 gap-4 max-w-3xl mx-auto mt-14"
        onSubmit={formik.handleSubmit}
      >
        {/* name box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md">
          <label className={`min-w-[4rem]`}>Name: </label>
          <div className="flex flex-col w-full space-y-2">
            <input
              type="text"
              placeholder="Rion"
              name="name"
              className="input input-md bg-transparent w-full input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
        </div>
        {/* Email box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md">
          <label className={`min-w-[4rem]`}>Email: </label>
          <div className="flex flex-col w-full space-y-2">
            <input
              type="email"
              placeholder="rion@email.com"
              name="email"
              className="input input-md bg-transparent w-full input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && Boolean(formik.errors.email) ? (
              <small className="text-red-600">
                {formik.touched.email && formik.errors.email}
              </small>
            ) : null}
          </div>
        </div>
        {/* Phone box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md">
          <label className={`min-w-[4rem]`}>Phone: </label>
          <div className="flex flex-col w-full space-y-2">
            <input
              type="number"
              placeholder="0123324434435"
              name="phoneNumber"
              className="input input-md bg-transparent w-full input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber &&
            Boolean(formik.errors.phoneNumber) ? (
              <small className="text-red-600">
                {formik.touched.phoneNumber && formik.errors.phoneNumber}
              </small>
            ) : null}
          </div>
        </div>
        {/* Address box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md">
          <label className={`min-w-[4rem]`}>Address: </label>
          <div className="flex flex-col w-full space-y-2">
            <input
              type="text"
              placeholder="Dhaka, Banglamotor"
              name="address"
              className="input input-md bg-transparent w-full input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
        </div>
        {/* Salary box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md">
          <label className={`min-w-[4rem]`}>Salary : </label>
          <div className="flex flex-col w-full space-y-2">
            <input
              type="number"
              placeholder="20,000"
              name="salary"
              className="hide-number-arrow-input input input-md bg-transparent w-full input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
        </div>
        {/* Joining Date box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md">
          <label className={`min-w-[4rem]`}>Joining Date : </label>
          <div className="flex flex-col w-full space-y-2">
            <input
              type="text"
              name="salary"
              disabled
              className="hide-number-arrow-input input input-md bg-transparent w-full input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value="20/10/23"
            />
          </div>
        </div>
        {/* submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn w-fit bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case max-w-xs h-auto"
          >
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubAdminProfile;
