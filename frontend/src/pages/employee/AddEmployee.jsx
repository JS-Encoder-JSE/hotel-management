import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlusCircle, FaUpload } from "react-icons/fa";
import * as yup from "yup";
import imgPlaceHolder from "../../assets/img-placeholder.jpg";
import { useUploadSingleMutation } from "../../redux/baseAPI.js";

import { useAddEmployeeMutation } from "../../redux/employee/employeeAPI.js";

// form validation
const validationSchema = yup.object({
  username: yup.string().required("Userame is required"),
  name: yup.string().required("Name is required"),
  userName: yup.string().required("User Name is required"),
  designation: yup.string().required("Designation is required"),
  shift: yup.string().required("Shift is required"),
  salary: yup.string().required("Salary is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("Zip is required"),
  userImg: yup.mixed().required("Image is required"),
});

const AddEmployee = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [addEmployee] = useAddEmployeeMutation();
  const [uploadSingle] = useUploadSingleMutation();
  const [userImgPrev, setUserImgPrev] = useState(null);

  const formik = useFormik({
    initialValues: {
      username:'',
      name: "",
      userName: "",
      designation: "",
      phone: "",
      shift: "",
      salary: "",
      address: "",
      userImg: null,
      documentsType: "",
      documents: null,
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);

      const obj = { ...values };
      const formData = new FormData();
      const photoName = values.userImg.name.substring(
        0,
        values.userImg.name.lastIndexOf("."),
      );

      formData.append(photoName, values.userImg);

      delete obj.userImg;
      await uploadSingle(formData).then(
        (result) => (obj.images = result.data.imageUrl),
      );

      const response = await addEmployee(obj);
      console.log(response);
      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success(response.data.message);
        formikHelpers.resetForm();
        setUserImgPrev(null);
      }

      setLoading(false);
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
    <div className={`space-y-10 bg-white p-10 rounded-2xl`}>
      <h3
        className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
      >
        <FaPlusCircle />
        <span>Add Employee</span>
      </h3>
      <form
        autoComplete="off"
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

             {/* username box */}
             <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && Boolean(formik.errors.username) ? (
            <small className="text-red-600">
              {formik.touched.username && formik.errors.username}
            </small>
          ) : null}
        </div>

        {/* name box */}
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
        
        {/*user name box */}
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
        {/* designation box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Designation"
            name="designation"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
            className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none focus:border-green-slimy"
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
        
           {/* user image box */}
           <div className=" flex flex-col gap-3">
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
                <span>Choose Profile Photo</span>
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


        {/* street box */}
        <div className="col-span-full flex flex-col gap-3">
          <textarea
            placeholder="Address"
            name="address"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
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
     
        
     
        {/* submit button */}
        <button
          type="submit"
          className="col-span-full btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        >
          <span>Add</span>
          {isLoading ? (
            <span
              className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
              role="status"
            ></span>
          ) : null}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
