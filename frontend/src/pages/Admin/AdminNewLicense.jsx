import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
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
import { TbReplaceFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { validationSchema } from "../../components/Yup/AdminNewLicenseVal.jsx";
import { useAddLicenseMutation } from "../../redux/admin/sls/slsAPI.js";
import { useUploadMutation } from "../../redux/baseAPI.js";

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
      emerContact: "",
      billInformation: "",
      fromDate: "",
      toDate: "",
      numberOfHotel: "",
      paymentMethod: "",
      trxID: "",
      amount: "",
      remarks: "",
      utilities: null,
      tradeLicenses: null,
      panCard: null,
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
        emerContact: emergency_contact,
        billInformation: bill_info,
        fromDate: bill_from,
        toDate: bill_to,
        numberOfHotel: maxHotels,
        paymentMethod: payment_method,
        trxID: tran_id,
        amount,
        remarks: remark,
        utilities,
        tradeLicenses,
        panCard,
      } = obj;
      const tempImages = {
        trade_lic_img: [],
        utilities: [],
        pancard: [],
      };

      const formData1 = new FormData();
      const formData2 = new FormData();
      const formData3 = new FormData();

      for (let i = 0; i < utilities.length; i++) {
        const photoName = utilities[i].name.substring(
          0,
          utilities[i].name.lastIndexOf("."),
        );

        formData1.append(photoName, utilities[i]);
      }

      for (let i = 0; i < tradeLicenses.length; i++) {
        const photoName = tradeLicenses[i].name.substring(
          0,
          tradeLicenses[i].name.lastIndexOf("."),
        );

        formData2.append(photoName, tradeLicenses[i]);
      }

      for (let i = 0; i < panCard.length; i++) {
        const photoName = panCard[i].name.substring(
          0,
          panCard[i].name.lastIndexOf("."),
        );

        formData3.append(photoName, panCard[i]);
      }

      await upload(formData1).then(
        (result) => (tempImages.utilities = result.data.imageUrls),
      );
      await upload(formData2).then(
        (result) => (tempImages.trade_lic_img = result.data.imageUrls),
      );
      await upload(formData3).then(
        (result) => (tempImages.pancard = result.data.imageUrls),
      );

      const response = await addLicense({
        name,
        username,
        password,
        address,
        email,
        phone_no,
        emergency_contact,
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
        setSelectedImages([]);
      }

      setLoading(false);
    },
    enableReinitialize: false,
  });

  const handleDelete = (idx) => {
    const tempImgs = [
      ...selectedImages.slice(0, idx),
      ...selectedImages.slice(idx + 1),
    ];
    const dataTransfer = new DataTransfer();

    for (const file of tempImgs) {
      dataTransfer.items.add(file);
    }

    setSelectedImages(tempImgs);
  };

  const handleChange = (idx, newFile) => {
    const updatedImages = [...selectedImages];
    updatedImages[idx] = newFile;

    const dataTransfer = new DataTransfer();

    for (const file of updatedImages) {
      dataTransfer.items.add(file);
    }

    setSelectedImages(updatedImages);
  };

  useEffect(() => {
    if (formik.values.utilities) {
      const selectedUtilitiesArray = Array.from(formik.values.utilities);
      setSelectedImages([...selectedImages, ...selectedUtilitiesArray]);
    }
  }, [formik.values.utilities]);

  useEffect(() => {
    if (formik.values.tradeLicenses) {
      const selectedTradeLicensesArray = Array.from(
        formik.values.tradeLicenses,
      );

      setSelectedImages([...selectedImages, ...selectedTradeLicensesArray]);
    }
  }, [formik.values.tradeLicenses]);

  useEffect(() => {
    if (formik.values.panCard) {
      const selectedPanCardArray = Array.from(formik.values.panCard);

      setSelectedImages([...selectedImages, ...selectedPanCardArray]);
    }
  }, [formik.values.panCard]);

  return (
    <div className={`space-y-10 bg-white p-10 rounded-2xl`}>
      <h3
        className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
      >
        <FaPlusCircle />
        <span>New License</span>
      </h3>
      <form
        autoComplete="off"
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
              {selectedImages?.length
                ? selectedImages?.map((image, idx) => {
                    return (
                      <SwiperSlide key={idx}>
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
                    );
                  })
                : null}
            </Swiper>
          </div>
        ) : null}
        {/*Client name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            autoComplete="off"
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
              autoComplete="off"
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
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Emergency Contact"
            name="emerContact"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.emerContact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.emerContact && Boolean(formik.errors.emerContact) ? (
            <small className="text-red-600">
              {formik.touched.emerContact && formik.errors.emerContact}
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
            type="number"
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
            type="number"
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

        <div className={`flex space-x-1.5`}>
          <div className="flex flex-col gap-3 w-full">
            <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
              {formik.values.utilities ? (
                <span>
                  {"Utilities " + formik.values.utilities.length + " files"}
                </span>
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
                name="utilities"
                className="absolute left-0 top-0  overflow-hidden h-0"
                onChange={(e) =>
                  formik.setFieldValue("utilities", e.currentTarget.files)
                }
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.utilities && Boolean(formik.errors.utilities) ? (
              <small className="text-red-600">
                {formik.touched.utilities && formik.errors.utilities}
              </small>
            ) : null}
          </div>
        </div>
        <div className={`flex space-x-1.5`}>
          <div className="flex flex-col gap-3 w-full">
            <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
              {formik.values.tradeLicenses ? (
                <span>
                  {"Trade Licenses " +
                    formik.values.tradeLicenses.length +
                    " files"}
                </span>
              ) : (
                <span className={`flex items-baseline space-x-1.5`}>
                  <FaUpload />
                  <span>Choose Trade Licenses</span>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                name="tradeLicenses"
                className="absolute left-0 top-0  overflow-hidden h-0"
                onChange={(e) =>
                  formik.setFieldValue("tradeLicenses", e.currentTarget.files)
                }
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.tradeLicenses &&
            Boolean(formik.errors.tradeLicenses) ? (
              <small className="text-red-600">
                {formik.touched.tradeLicenses && formik.errors.tradeLicenses}
              </small>
            ) : null}
          </div>
        </div>

        <div className={`flex space-x-1.5`}>
          <div className="flex flex-col gap-3 w-full">
            <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
              {formik.values.panCard ? (
                <span>
                  {"Pan card " + formik.values.panCard.length + " files"}
                </span>
              ) : (
                <span className={`flex items-baseline space-x-1.5`}>
                  <FaUpload />
                  <span>Choose Pan Card</span>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                name="panCard"
                className="absolute left-0 top-0  overflow-hidden h-0"
                onChange={(e) =>
                  formik.setFieldValue("panCard", e.currentTarget.files)
                }
                onBlur={formik.handleBlur}
              />
            </label>
            {formik.touched.panCard && Boolean(formik.errors.panCard) ? (
              <small className="text-red-600">
                {formik.touched.panCard && formik.errors.panCard}
              </small>
            ) : null}
          </div>
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
