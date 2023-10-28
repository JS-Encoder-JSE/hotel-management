import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaArrowLeft, FaPlusCircle, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Hotel Name is required"),
  address: yup.string().required("Hotel Address is required"),
  email: yup.string().required("Hotel Email is required"),
  phoneNumber: yup.string().required("Phone Number size is required"),
  // license: yup.string().required("License Number is required"),
  branchName: yup.string().required("Branch Name is required"),
  manager: yup.string().required("Manager Name is required"),
});

const HotelEdit = () => {
  const navigate =useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber:"",
      // license: "",
      branchName:"",
      manager:"",
     
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
    <h2 className={`text-3xl text-center`}>Hotels Update</h2>
        <hr className={`my-5`} />
      </div>

      <div className="max-auto">
        <form
          className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
          onSubmit={formik.handleSubmit}
        >
          {/* Hotel Name box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Hotel Name"
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
          {/* Hotel Address box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Hotel Address "
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
          {/* Email box */}
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Hotel Email "
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

            {/*Phone Number  box */}
            <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Hotel Phone Number"
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

          {/*license  box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Hotel License Number"
              name="license"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
              value={formik.values.license}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInitialValid={false}
              readOnly
          
            />
            {formik.touched.license && Boolean(formik.errors.license) ? (
              <small className="text-red-600">
                {formik.touched.license && formik.errors.license}
              </small>
            ) : null}
          </div>
          {/*Hotel Branch box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Hotel Branch Name"
              name="branchName"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
              value={formik.values.branchName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.branchName && Boolean(formik.errors.branchName) ? (
              <small className="text-red-600">
                {formik.touched.branchName && formik.errors.branchName}
              </small>
            ) : null}
          </div>

                 {/* Manager box */}
                 <div className="flex flex-col gap-3">
                <select
                  name="manager"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
                  value={formik.values.manager}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" selected disabled>
                    Manager
                  </option>
                  <option value="manager1">Manager 1</option>
                  <option value="manager2">Manager 2</option>
                  <option value="manager3">Manager 3</option>
                  <option value="manager4">Manager 4</option>
                </select>
                {formik.touched.manager && Boolean(formik.errors.manager) ? (
                  <small className="text-red-600">
                    {formik.touched.manager && formik.errors.manager}
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

export default HotelEdit;
