import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaUpload } from "react-icons/fa";
import imgPlaceHolder from "../../assets/img-placeholder.jpg";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Manager Name is required"),
  userName: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
  address: yup.string().required("Manager Address is required"),
  email: yup.string().required("Manager Email is required"),
  phoneNumber: yup.string().required("Manager Phone Number size is required"),
  salary: yup.string().required("Manager Salary is required"),
  joiningdate: yup.string().required("Manager Joining Date is required"),
  documents: yup.string().required("Status is required"),
  drivingL: yup.string().when(["documents"], ([documents], schema) => {
    if (documents == "drivingL")
      return schema.required("Branch Name is required");
    else return schema;
  }),
  nid: yup.string().when(["documents"], ([documents], schema) => {
    if (documents == "nid")
      return schema.required("Branch Name is required");
    else return schema;
  }),
  passport: yup.string().when(["documents"], ([documents], schema) => {
    if (documents == "passport")
      return schema.required("Branch Name is required");
    else return schema;
  }),
});

const AddManager = () => {
  const [userImgPrev, setUserImgPrev] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      password: "",
      address: "",
      email: "",
      phoneNumber: "",
      salary: "",
      joiningdate: "",
      userImg: null,
      drivingImg: null,
      nidImg: null,
      passportImg: null,
      documents: "",
      
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
      <div className="card bg-white shadow-xl">
        <div className="card-body p-4">
          <h2 className={`text-3xl`}>Add Manager</h2>
          <hr className={`my-5`} />
        </div>

        <div className="max-auto">
          <form
            className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
            onSubmit={formik.handleSubmit}
          >
            {/* image */}
            <div className={`col-span-full`}>
              <img
                src={userImgPrev || imgPlaceHolder}
                className={`h-96 w-full object-cover rounded`}
                alt=""
              />
            </div>
            
            {/* manager Name box */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
            {/* User Name box */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="User Name"
                name="userName"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userName && Boolean(formik.errors.userName) ? (
                <small className="text-red-600">
                  {formik.touched.userName && formik.errors.userName}
                </small>
              ) : null}
            </div>
            {/* User Password box */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Password"
                name="password"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && Boolean(formik.errors.password) ? (
                <small className="text-red-600">
                  {formik.touched.password && formik.errors.password}
                </small>
              ) : null}
            </div>
            {/* Manager Address box */}
            <div className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Address "
                name="address"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
            {/*Manager Email box */}
            <div className="flex flex-col gap-3">
            
              <input
                type="email"
                placeholder=" Email "
                name="email"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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

            {/*Manager Phone Number  box */}
            <div className="flex flex-col gap-3">
          
              <input
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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

            {/*Manager salary  box */}
            <div className="flex flex-col gap-3">
            
              <input
                type="number"
                placeholder="Salary"
                name="salary"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
            {/*Manager Joining Date  box */}
            <div className="flex flex-col gap-3">
            
              <input
                type="text"
                placeholder="Joining Date"
                name="joiningdate"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                value={formik.values.joiningdate}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  e.target.type = "text";
                  formik.handleBlur;
                }}
                onFocus={(e) => (e.target.type = "date")}
              />
              {formik.touched.joiningdate &&
              Boolean(formik.errors.joiningdate) ? (
                <small className="text-red-600">
                  {formik.touched.joiningdate && formik.errors.joiningdate}
                </small>
              ) : null}
            </div>

{/* documents */}

<div className="flex flex-col gap-3">
          <select
            name="documents"
            className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
            value={formik.values.documents}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected >
              Type Of Documents
            </option>
            <option value="drivingL">Driving License</option>
            <option value="nid">NID</option>
            <option value="passport">Passport</option>
          </select>
          {formik.touched.documents &&
          Boolean(formik.errors.documents) ? (
            <small className="text-red-600">
              {formik.touched.documents && formik.errors.documents}
            </small>
          ) : null}
        </div>

        {/* Driving License photo */}
        {formik.values.documents &&
        formik.values.documents == "drivingL" ? (
          <div className="flex flex-col gap-3">
          <label className="relative input input-md input-bordered border-gray-500/50 rounded  focus:outline-none bg-transparent flex items-center justify-center">
            {formik.values.drivingImg ? (
              formik.values.drivingImg.name.substring(
                0,
                formik.values.drivingImg.name.lastIndexOf(".")
              )
            ) : (
              <span
                className={`flex justify-center items-baseline space-x-1.5`}
              >
                <FaUpload />
                <span>Driving License</span>
              </span>
            )}
            <input
              type="file"
              name="drivingImg"
              className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("drivingImg", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
             
            />
          </label>
          {formik.touched.drivingImg && Boolean(formik.errors.drivingImg) ? (
            <small className="text-red-600">
              {formik.touched.drivingImg && formik.errors.drivingImg}
            </small>
          ) : null}
        </div>
        ) : null}

        {/* NID photo */}
        {formik.values.documents &&
        formik.values.documents == "nid" ? (
          <div className=" flex flex-col gap-3">
          <label className="relative input input-md input-bordered border-gray-500/50 rounded  focus:outline-none bg-transparent flex items-center justify-center">
            {formik.values.nidImg ? (
              formik.values.nidImg.name.substring(
                0,
                formik.values.nidImg.name.lastIndexOf(".")
              )
            ) : (
              <span
                className={`flex justify-center items-baseline space-x-1.5`}
              >
                <FaUpload />
                <span>NID</span>
              </span>
            )}
            <input
              type="file"
              name="nidImg"
              className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("nidImg", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
             
            />
          </label>
          {formik.touched.nidImg && Boolean(formik.errors.nidImg) ? (
            <small className="text-red-600">
              {formik.touched.nidImg && formik.errors.nidImg}
            </small>
          ) : null}
        </div>
        ) : null}
        {/* passport */}
        {formik.values.documents &&
        formik.values.documents == "passport" ? (
          <div className=" flex flex-col gap-3">
          <label className="relative input input-md input-bordered border-gray-500/50 rounded  focus:outline-none bg-transparent flex items-center justify-center">
            {formik.values.passportImg ? (
              formik.values.passportImg.name.substring(
                0,
                formik.values.passportImg.name.lastIndexOf(".")
              )
            ) : (
              <span
                className={`flex justify-center items-baseline space-x-1.5`}
              >
                <FaUpload />
                <span>Passport</span>
              </span>
            )}
            <input
              type="file"
              name="passportImg"
              className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("passportImg", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
             
            />
          </label>
          {formik.touched.passportImg && Boolean(formik.errors.passportImg) ? (
            <small className="text-red-600">
              {formik.touched.passportImg && formik.errors.passportImg}
            </small>
          ) : null}
        </div>
        ) : null}


            {/* user image box */}
            <div className="col-span-full flex flex-col gap-3">
              <label className="relative input input-md input-bordered border-gray-500/50 rounded  focus:outline-none bg-transparent flex items-center justify-center">
                {formik.values.userImg ? (
                  formik.values.userImg.name.substring(
                    0,
                    formik.values.userImg.name.lastIndexOf(".")
                  )
                ) : (
                  <span
                    className={`flex justify-center items-baseline space-x-1.5`}
                  >
                    <FaUpload />
                    <span>Choose profile Photo</span>
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
              {/* <div className={`flex space-x-1.5`}>
          <div className="flex flex-col gap-3 w-full">
            <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
              {formik.values.utility ? (
                <span>{formik.values.utility.length + " files"}</span>
              ) : (
                <span className={`flex items-baseline space-x-1.5`}>
                  <FaUpload />
                  <span>Choose Utilities</span>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                name="utility"
                className="absolute left-0 top-0  overflow-hidden h-0"
                onChange={(e) =>
                  formik.setFieldValue("utility", e.currentTarget.files)
                }
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.utility && Boolean(formik.errors.utility) ? (
              <small className="text-red-600">
                {formik.touched.utility && formik.errors.utility}
              </small>
            ) : null}
          </div>
        </div> */}

            {/* submit button */}
            <div className=" col-span-full text-end mb-5 ">
              <button
                type="submit"
                className=" btn btn-md  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddManager;
