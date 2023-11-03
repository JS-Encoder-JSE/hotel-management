import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  FaEye,
  FaEyeSlash,
  FaPlusCircle,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TbReplaceFilled } from "react-icons/tb";
import imgPlaceHolder from "../../assets/img-placeholder.jpg";
import { useAddLicenseMutation } from "../../redux/admin/sls/slsAPI.js";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { useUploadMutation } from "../../redux/baseAPI.js";
import { useSelector } from "react-redux";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Client Name is required"),
  username: yup.string().required("Client username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  address: yup.string().required("Hotel Adress is required"),
  phoneNumber: yup.string().required("Client Phone Number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  billInformation: yup.string().required("Client Bill Information is required"),
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  status: yup.string().required("status is required"),
  numberOfHotel: yup
    .number()
    .required("Number Of Hotels are required")
    .positive("Number Of Hotels must be a positive number")
    .integer("Number Of Hotels must be an integer"),
  paymentMethod: yup.string().required("Payment method is required"),
  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .integer("Amount must be an integer"),
  utility: yup.mixed().required("Utilities are required"),
  tradeLicense: yup.mixed().required("Trade licenses are required"),
});

const AdminNewLicense = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [addLicense] = useAddLicenseMutation();
  const [upload] = useUploadMutation();
  const { user } = useSelector((store) => store.authSlice);
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
      billInformation: "",
      fromDate: "",
      toDate: "",
      status: "",
      numberOfHotel: "",
      paymentMethod: "",
      trxID: "",
      amount: "",
      utility: null,
      tradeLicense: null,
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);

      const obj = { ...values };
      const {
        name: owner_name,
        address,
        phoneNumber: phone_no,
        email,
        billInformation: bill_info,
        fromDate: from_date,
        toDate: to_date,
        status,
        numberOfHotel: hotel_limit,
        paymentMethod: payment_method,
        trxID: transection_id,
      } = obj;
      const formData = new FormData();
      const formData_2 = new FormData();

      for (let i = 0; i < values.utility.length; i++) {
        const photoName = values.utility[i].name.substring(
          0,
          values.utility[i].name.lastIndexOf("."),
        );

        formData.append(photoName, values.utility[i]);
      }

      await upload(formData).then(
        (result) => (obj.utilities_img = result.data.imageUrls),
      );

      for (let i = 0; i < values.tradeLicense.length; i++) {
        const photoName = values.tradeLicense[i].name.substring(
          0,
          values.tradeLicense[i].name.lastIndexOf("."),
        );

        formData_2.append(photoName, values.tradeLicense[i]);
      }

      await upload(formData_2).then(
        (result) => (obj.trade_license_img = result.data.imageUrls),
      );

      const response = await addLicense({
        owner_name,
        address,
        phone_no,
        email,
        bill_info,
        from_date,
        to_date,
        status,
        hotel_limit,
        payment_method,
        transection_id,
        utilities_img: obj.utilities_img,
        trade_license_img: obj.trade_license_img,
      });
      console.log(response);
      // if (response?.error) {
      //   toast.error(response.error.data.message);
      // } else {
      //   toast.success(response.data.message);
      //   formikHelpers.resetForm();
      //   setSelectedImages([]);
      // }

      setLoading(false);
    },
  });

  // image delete
  const handleDelete = (idx) => {
    const tempImgs = [
      ...selectedImages.slice(0, idx),
      ...selectedImages.slice(idx + 1),
    ];
    const dataTransfer = new DataTransfer();

    for (const file of tempImgs) {
      dataTransfer.items.add(file);
    }

    formik.setFieldValue("utility", dataTransfer.files);
    formik.setFieldValue("tradeLicense", dataTransfer.files);
    setSelectedImages(tempImgs);
  };

  // handle change
  const handleChange = (idx, newFile) => {
    const updatedImages = [...selectedImages];
    updatedImages[idx] = newFile;

    const dataTransfer = new DataTransfer();

    for (const file of updatedImages) {
      dataTransfer.items.add(file);
    }

    formik.setFieldValue("utility", dataTransfer.files);
    formik.setFieldValue("tradeLicense", dataTransfer.files);
    setSelectedImages(updatedImages);
  };

  useEffect(() => {
    if (formik.values.utility) {
      const selectedImagesArray = Array.from(formik.values.utility);
      setSelectedImages([...selectedImagesArray, ...selectedImages]);
    }
    if (formik.values.tradeLicense) {
      const selectedImagesArray = Array.from(formik.values.tradeLicense);
      setSelectedImages([...selectedImagesArray, ...selectedImages]);
    }
  }, [formik.values.utility, formik.values.tradeLicense]);

  return (
    <div className={`space-y-10 bg-white p-10 rounded-2xl`}>
      <h3
        className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
      >
        <FaPlusCircle />
        <span>New License</span>
      </h3>
      <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
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
              selectedImages.map((image, idx) => (
                <SwiperSlide>
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
        {/*Client name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Client Name"
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
        {/*Client username box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Client Username"
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
        {/*Phone Number box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Client Phone Number"
            name="phoneNumber"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
        {/*Email box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Client Email"
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
        {/*Password box */}
        <div className="flex flex-col gap-3">
          <div className={`relative`}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Client Password"
              name="password"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {showPass ? (
              <span
                className={`absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer`}
                onClick={() => setShowPass(false)}
              >
                <FaEyeSlash />
              </span>
            ) : (
              <span
                className={`absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer`}
                onClick={() => setShowPass(true)}
              >
                <FaEye />
              </span>
            )}
          </div>
          {formik.touched.password && Boolean(formik.errors.password) ? (
            <small className="text-red-600">
              {formik.touched.password && formik.errors.password}
            </small>
          ) : null}
        </div>
        {/*Billing Information box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Bill Information"
            name="billInformation"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.billInformation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.billInformation &&
          Boolean(formik.errors.billInformation) ? (
            <small className="text-red-600">
              {formik.touched.billInformation && formik.errors.billInformation}
            </small>
          ) : null}
        </div>
        {/*Billing From box */}
        <div className="flex flex-col gap-3">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            name="fromDate"
            placeholderText={`Billing From`}
            selected={formik.values.fromDate}
            className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
            onChange={(date) => formik.setFieldValue("fromDate", date)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fromDate && Boolean(formik.errors.fromDate) ? (
            <small className="text-red-600">
              {formik.touched.fromDate && formik.errors.fromDate}
            </small>
          ) : null}
        </div>
        {/*Billing To box */}
        <div className="flex flex-col gap-3">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            name="toDate"
            placeholderText={`Billing To`}
            selected={formik.values.toDate}
            className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
            onChange={(date) => formik.setFieldValue("toDate", date)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.toDate && Boolean(formik.errors.toDate) ? (
            <small className="text-red-600">
              {formik.touched.toDate && formik.errors.toDate}
            </small>
          ) : null}
        </div>
        {/* Status box */}
        <div className="flex flex-col gap-3">
          <select
            name="status"
            className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none focus:border-green-slimy"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Status
            </option>
            <option value="Active">Active</option>
            <option value="Deactivate">Deactivate</option>
            <option value="Suspend">Suspend</option>
          </select>
          {formik.touched.status && Boolean(formik.errors.status) ? (
            <small className="text-red-600">
              {formik.touched.status && formik.errors.status}
            </small>
          ) : null}
        </div>

        {/*Number Of Hotels box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Hotel Limit"
            name="numberOfHotel"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.numberOfHotel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.numberOfHotel &&
          Boolean(formik.errors.numberOfHotel) ? (
            <small className="text-red-600">
              {formik.touched.numberOfHotel && formik.errors.numberOfHotel}
            </small>
          ) : null}
        </div>
        {/* payment method box */}
        <div className="flex flex-col gap-3">
          <select
            name="paymentMethod"
            className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Payment Method
            </option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mfs">Mobile Banking</option>
          </select>
          {formik.touched.paymentMethod &&
          Boolean(formik.errors.paymentMethod) ? (
            <small className="text-red-600">
              {formik.touched.paymentMethod && formik.errors.paymentMethod}
            </small>
          ) : null}
        </div>
        {formik.values.paymentMethod &&
        formik.values.paymentMethod === "cash" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name=""
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2 input-disabled"
              value={`Khalid Mahmud`}
              readOnly
            />
            {formik.touched.trxID && Boolean(formik.errors.trxID) ? (
              <small className="text-red-600">
                {formik.touched.trxID && formik.errors.trxID}
              </small>
            ) : null}
          </div>
        ) : null}
        {formik.values.paymentMethod &&
        formik.values.paymentMethod !== "cash" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Transaction ID"
              name="trxID"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.trxID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.trxID && Boolean(formik.errors.trxID) ? (
              <small className="text-red-600">
                {formik.touched.trxID && formik.errors.trxID}
              </small>
            ) : null}
          </div>
        ) : null}
        {/* Amount box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Amount"
            name="amount"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && Boolean(formik.errors.amount) ? (
            <small className="text-red-600">
              {formik.touched.amount && formik.errors.amount}
            </small>
          ) : null}
        </div>
        {/* utility */}
        <div className={`flex space-x-1.5`}>
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
        </div>
        {/* Trade License */}
        <div className={`flex space-x-1.5`}>
          <div className="flex flex-col gap-3 w-full">
            <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
              {formik.values.tradeLicense ? (
                <span>{formik.values.tradeLicense.length + " files"}</span>
              ) : (
                <span className={`flex items-baseline space-x-1.5`}>
                  <FaUpload />
                  <span>Choose Trade License</span>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                name="tradeLicense"
                className="absolute left-0 top-0  overflow-hidden h-0"
                onChange={(e) => {
                  formik.setFieldValue("tradeLicense", e.currentTarget.files);
                }}
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.tradeLicense &&
            Boolean(formik.errors.tradeLicense) ? (
              <small className="text-red-600">
                {formik.touched.tradeLicense && formik.errors.tradeLicense}
              </small>
            ) : null}
          </div>
        </div>
        {/* Hotel Address box */}
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
          className="col-span-full btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case h-auto p-2"
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

export default AdminNewLicense;
