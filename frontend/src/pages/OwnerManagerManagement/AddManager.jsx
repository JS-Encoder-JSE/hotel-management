import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaUpload } from "react-icons/fa";
import imgPlaceHolder from "../../assets/img-placeholder.jpg";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Manager Name is required"),
  address: yup.string().required("Manager Address is required"),
  email: yup.string().required("Manager Email is required"),
  phoneNumber: yup.string().required("Manager Phone Number size is required"),
  salary: yup.string().required("Manager Salary is required"),
  joinningdate: yup.string().required("Manager Joining Date is required"),
});

const AddManager = () => {
  const [userImgPrev, setUserImgPrev] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      salary: "",
      joinningdate: "",
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
            <div className={`col-span-full`}>
              <img
                src={userImgPrev || imgPlaceHolder}
                className={`h-96 w-full object-cover rounded`}
                alt=""
              />
            </div>
            {/* manager Name box */}
            <div className="flex flex-col gap-3">
              <label>
                {" "}
                Manager Name <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Manager Name"
                name="name"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
              <label>
                {" "}
                Manager Address <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Manager Address "
                name="address"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
              <label>
                {" "}
                Manager Email <span>*</span>
              </label>
              <input
                type="email"
                placeholder="Manager Email @ "
                name="email"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
              <label>
                {" "}
                Manager Phone Number <span>*</span>
              </label>
              <input
                type="number"
                placeholder="Manager Phone Number #"
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
              <label>
                {" "}
                Manager Salary <span>*</span>
              </label>
              <input
                type="number"
                placeholder="Manager Salary"
                name="salary"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                value={formik.values.joinningdate}
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
              <label>
                {" "}
                Joining Date <span>*</span>
              </label>
              <input
                type="date"
                placeholder="Manager Joining"
                name="joinningdate"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                value={formik.values.joinningdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.joinningdate &&
              Boolean(formik.errors.joinningdate) ? (
                <small className="text-red-600">
                  {formik.touched.joinningdate && formik.errors.joinningdate}
                </small>
              ) : null}
            </div>
            {/* user image box */}
            <div className="col-span-full flex flex-col gap-3">
              <label className="relative input input-md input-bordered border-gray-500/50 rounded  focus:outline-none bg-transparent flex items-center justify-center">
                {formik.values.userImg ? (
                  formik.values.userImg.name.substring(
                    0,
                    formik.values.userImg.name.lastIndexOf("."),
                  )
                ) : (
                  <span
                    className={`flex justify-center items-baseline space-x-1.5`}
                  >
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
