import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


// form validation
const validationSchema = yup.object({
  name: yup.string().required("Manager Name is required"),
  address: yup.string().required("Manager Address is required"),
  email: yup.string().required("Manager Email is required"),
  phoneNumber: yup.string().required("Manager Phone Number size is required"),
  salary: yup.string().required("Manager Salary is required"),
});

const ManagerEdit = () => {
  const navigate =useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber:"",
      salary: "",
     
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={`space-y-10`}>
      <div className="card bg-white shadow-xl">
    <div className="card-body p-4">
    <div>
       
       <span
          className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </span>
       </div>
    <h2 className={`text-3xl text-center`}>Edit Manager</h2>
        <hr className={`my-5`} />
      </div>

      <div className="max-auto">
        <form
          className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
          onSubmit={formik.handleSubmit}
        >
          {/* manager Name box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Manager Name"
              name="name"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && Boolean(formik.errors.name) ? (
              <small className="text-red-600">
                {formik.touched.name && formik.errors.name}
              </small>
            ) : null}
          </div>
          {/* Manager Address box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Manager Address "
              name="address"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.address && Boolean(formik.errors.address) ? (
              <small className="text-red-600">
                {formik.touched.address && formik.errors.address}
              </small>
            ) : null}
          </div>
          {/*Manager Email box */}
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Manager Email "
              name="email"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && Boolean(formik.errors.email) ? (
              <small className="text-red-600">
                {formik.touched.email && formik.errors.email}
              </small>
            ) : null}
          </div>

            {/*Manager Phone Number  box */}
            <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Manager Phone Number"
              name="phoneNumber"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber) ? (
              <small className="text-red-600">
                {formik.touched.phoneNumber && formik.errors.phoneNumber}
              </small>
            ) : null}
          </div>

          {/*Manager salary  box */}
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Manager Salary"
              name="salary"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
              value={formik.values.license}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.salary && Boolean(formik.errors.salary) ? (
              <small className="text-red-600">
                {formik.touched.salary && formik.errors.salary}
              </small>
            ) : null}
          </div>
       
       
          {/* submit button */}
          <div className=" col-span-full text-end mb-5 ">
            <button
              type="submit"
              className=" btn btn-sm  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case max-w-xs px-9 h-auto md:me-12"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ManagerEdit;
