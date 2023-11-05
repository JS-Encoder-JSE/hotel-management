import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  FaEye,
  FaEyeSlash,
  FaPlusCircle,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import {
  MdAttachFile,
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
import { validationSchema } from "../../components/Yup/AdminNewLicenseVal.jsx";

const AdminNewLicense = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState({});
  const [addLicense] = useAddLicenseMutation();
  const [upload] = useUploadMutation();
  const { user } = useSelector((store) => store.authSlice);
  const [showPass, setShowPass] = useState(false);
  const [docTypeCount, setDocTypeCount] = useState(1);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      address: "",
      email: "",
      phoneNumber: "",
      billInformation: "",
      fromDate: "",
      toDate: "",
      numberOfHotel: "",
      paymentMethod: "",
      trxID: "",
      amount: "",
      remarks: "",
      documentsType: "",
      documents: null,
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);

      const obj = { ...values };
      const {
        name,
        username,
        password,
        address,
        email,
        phoneNumber: phone_no,
        billInformation: bill_info,
        fromDate: bill_from,
        toDate: bill_to,
        numberOfHotel: maxHotels,
        paymentMethod: payment_method,
        trxID: tran_id,
        amount,
        remarks: remark,
      } = obj;
      const tempImages = {
        trade_lic_img: [],
        utilities: [],
        pancard: [],
      };

      for (const propertyName in images) {
        const formData = new FormData();
        const array = images[propertyName];

        for (let i = 0; i < array.length; i++) {
          const photoName = array[i].name.substring(
            0,
            array[i].name.lastIndexOf("."),
          );

          formData.append(photoName, array[i]);
        }

        await upload(formData).then((result) => {
          switch (propertyName) {
            case "Utilities":
              tempImages.utilities = result.data.imageUrls;
              break;
            case "Trade Licences":
              tempImages.trade_lic_img = result.data.imageUrls;
              break;
            case "Pan Card":
              tempImages.pancard = result.data.imageUrls;
          }
        });
      }

      const response = await addLicense({
        name,
        username,
        password,
        address,
        email,
        phone_no,
        bill_info,
        bill_from,
        bill_to,
        maxHotels,
        payment_method,
        tran_id,
        amount,
        remark,
        images: tempImages,
      });

      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success(response.data.message);
        formikHelpers.resetForm();
        setImages([]);
      }

      setLoading(false);
    },
  });

  const handleDelete = (key, idx) => {
    images[key] = [...images[key].slice(0, idx), ...images[key].slice(idx + 1)];
  };

  const handleChange = (key, idx, newFile) => {
    if (images[key]) {
      const updatedImages = [...images[key]];
      updatedImages[idx] = newFile;

      images[key] = updatedImages;
      setImages({ ...images });
    }
  };

  useEffect(() => {
    const arr = [].concat(...Object.values(images));
    setSelectedImages(arr);
  }, [images]);

  useEffect(() => {
    if (formik.values.documents) {
      const selectedImagesArray = Array.from(formik.values.documents);
      setImages({
        ...images,
        [formik.values.documentsType]: selectedImagesArray,
      });
    }
  }, [formik.values.documents]);

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
        {selectedImages.length ? (
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
              {Object.keys(images).map((key) =>
                images[key].length
                  ? images[key].map((image, idx) => (
                      <SwiperSlide key={idx}>
                        <div className={`relative`}>
                          <div className={`absolute top-3 right-3 space-x-1.5`}>
                            <label className="relative btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case rounded">
                              <TbReplaceFilled />
                              <input
                                type="file"
                                className="absolute left-0 top-0  overflow-hidden h-0"
                                onChange={(e) =>
                                  handleChange(
                                    key,
                                    idx,
                                    e.currentTarget.files[0],
                                  )
                                }
                              />
                            </label>
                            <button
                              className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                              onClick={() => handleDelete(key, idx)}
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
                  : null,
              )}
            </Swiper>
          </div>
        ) : null}
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
        <div
          className={`flex flex-col gap-3 ${
            (!formik.values.paymentMethod && !formik.values.documentsType) ||
            formik.values.paymentMethod === "Cash"
              ? "col-span-full"
              : ""
          }`}
        >
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
        <div className={`flex flex-col gap-3`}>
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
            placeholderText={`From`}
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
            placeholderText={`To`}
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
        <div className={`flex flex-col gap-3`}>
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
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Mobile_Banking">Mobile Banking</option>
          </select>
          {formik.touched.paymentMethod &&
          Boolean(formik.errors.paymentMethod) ? (
            <small className="text-red-600">
              {formik.touched.paymentMethod && formik.errors.paymentMethod}
            </small>
          ) : null}
        </div>
        {formik.values.paymentMethod &&
        formik.values.paymentMethod !== "Cash" ? (
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
        {/* Hotel Address box */}
        <div className="flex flex-col gap-3">
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

        {/* Remarks box */}
        <div className="flex flex-col gap-3">
          <textarea
            placeholder="Remarks"
            name="remarks"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
            value={formik.values.remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.remarks && Boolean(formik.errors.remarks) ? (
            <small className="text-red-600">
              {formik.touched.remarks && formik.errors.remarks}
            </small>
          ) : null}
        </div>
        {selectedImages.length ? (
          <div className={`col-span-full space-y-1.5`}>
            <span>Attachment</span>
            <ul className={`list-disc list-inside`}>
              {Object.entries(images).map(([key, value]) => {
                return value.length ? (
                  <li>
                    <span className={`inline-flex gap-0.5 items-center`}>
                      <MdAttachFile />
                      <span>{key}</span>
                    </span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        ) : null}
        {[...Array(docTypeCount)].map((_, idx) => {
          return (
            <>
              <div
                className={`flex flex-col gap-3 ${
                  (!formik.values.paymentMethod &&
                    !formik.values.documentsType) ||
                  (formik.values.paymentMethod !== "Cash" &&
                    !formik.values.documentsType)
                    ? "col-span-full"
                    : ""
                }`}
              >
                <select
                  name="documentsType"
                  className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
                  value={formik.values.documentsType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" selected disabled>
                    Type of Documents
                  </option>
                  <option value="Utilities">Utilities</option>
                  <option value="Trade Licences">Trade Licences</option>
                  <option value="Pan Card">Pan Card</option>
                </select>
                {formik.touched.documentsType &&
                Boolean(formik.errors.documentsType) ? (
                  <small className="text-red-600">
                    {formik.touched.documentsType &&
                      formik.errors.documentsType}
                  </small>
                ) : null}
              </div>
              {formik.values.documentsType ? (
                <div className={`flex space-x-1.5`}>
                  <div className="flex flex-col gap-3 w-full">
                    <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
                      {formik.values.documents ? (
                        <span>{formik.values.documents.length + " files"}</span>
                      ) : (
                        <span className={`flex items-baseline space-x-1.5`}>
                          <FaUpload />
                          <span>Choose {formik.values.documentsType}</span>
                        </span>
                      )}
                      <input
                        type="file"
                        multiple
                        name="documents"
                        className="absolute left-0 top-0  overflow-hidden h-0"
                        onChange={(e) =>
                          formik.setFieldValue(
                            "documents",
                            e.currentTarget.files,
                          )
                        }
                        onBlur={formik.handleBlur}
                      />
                    </label>
                    {formik.touched.documents &&
                    Boolean(formik.errors.documents) ? (
                      <small className="text-red-600">
                        {formik.touched.documents && formik.errors.documents}
                      </small>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          );
        })}
        {/* submit button */}
        <button
          type="submit"
          className="col-span-full btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case h-auto p-2"
        >
          <span>Create License</span>
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
