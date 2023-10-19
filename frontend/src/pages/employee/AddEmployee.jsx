import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle, FaUpload } from "react-icons/fa";

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
  userImg: yup.string().required("Image is required"),
});

const AddEmployee = () => {
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
      userImg: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`space-y-10`}>
      <h3
        className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
      >
        <FaPlusCircle />
        <span>Add Employee</span>
      </h3>
      <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        {/* name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
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
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
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
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
            name="name"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
        {/* user image box */}
        <div className="col-span-full flex flex-col gap-3">
          <label className="relative input input-sm input-bordered border-green-slimy rounded w-full text-center cursor-pointer focus:outline-none">
            {formik.values.userImg ? (
              formik.values.userImg.name.substring(
                0,
                formik.values.userImg.name.lastIndexOf(".")
              )
            ) : (
              <span className={`flex justify-center items-baseline space-x-1.5`}>
                <FaUpload />
                <span>Choose photo</span>
              </span>
            )}
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
          {formik.touched.userImg && Boolean(formik.errors.userImg) ? (
            <small className="text-red-600">
              {formik.touched.userImg && formik.errors.userImg}
            </small>
          ) : null}
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="col-span-full btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;