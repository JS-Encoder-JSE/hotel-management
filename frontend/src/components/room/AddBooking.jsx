import { useFormik } from "formik";
import React, { useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import { useAddBookingMutation, useRoomsQuery } from "../../redux/room/roomAPI.js";
import DatePicker from "react-datepicker";

// form validation
const validationSchema = yup.object({
  guestName: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  emergencyNumber: yup.string().required("Emergency Number is required"),
  // age: yup
  //   .number()
  //   .required("Age is required")
  //   .positive("Age must be a positive number")
  //   .integer("Age must be an integer"),
  adult: yup
    .number()
    .required("Adult is required")
    .positive("Adult must be a positive number")
    .integer("Adult must be an integer"),
  // children: yup.number().when(["children"], ([children], schema) => {
  //   if (children)
  //     return schema
  //       .positive("Children must be a positive number")
  //       .integer("Children must be an integer");
  //   else return schema;
  // }),
  paymentMethod: yup.string().required("Payment method is required"),
  trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
    if (paymentMethod !== "cash")
      return schema.required("Transaction ID is required");
    else return schema;
  }),
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  nationality: yup.string().required("Nationality Date is required"),
  // discount: yup.number().when(["discount"], ([discount], schema) => {
  //   if (discount)
  //     return schema
  //       .positive("Discount must be a positive number")
  //       .integer("Discount must be an integer");
  //   else return schema;
  // }),
});


const AddBooking = () => {
  const { isLoading, data: rooms } = useRoomsQuery({ id, cp, filter, search });
  const [addBooking] = useAddBookingMutation();
  const [selectedRooms, setSelectedRooms] = useState([]);
  console.log({rooms})
  // {
  //   "room_id": "654b6f1869788fc80c2eb0d8",
  //   "hotel_id": "654a4d67932e9946307d5663",
  //   "guestName": "John Doe",
  //   "address": "123 Main Street",
  //   "mobileNumber": "123-456-7890",
  //   "emergency_contact": "987-654-3210",
  //   "adult": 2,
  //   "children": 1,
  //   "paymentMethod": "Cash",
  //   "discount": 10,
  //   "from": "2023-11-15T14:00:00.000Z",
  //   "to": "2023-11-20T12:00:00.000Z",
  //   "nationality": "US"
  // }
  const formik = useFormik({
    initialValues: {
      room_id: null,
      hotel_id:'',
      guestName: "",
      address:"",
      mobileNumber: "",
      emergency_contact: "",
      adult: "",
      children: "",
      paymentMethod: "",
      // trxID: "",
      discount: "",
      from: "",
      to: "",
      nationality: "",
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      const obj = { ...values };
      obj.roomNumber = 101
      console.log(obj)

      const response = await addBooking(obj);
console.log(response)
      // if (response?.error) {
      //   toast.error(response.error.data.message);
      // } else {
      //   toast.success(response.data.message);
      //   // formikHelpers.resetForm();
      //   // setSelectedImages([]);
      // }
    },
  });

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const transformedRooms = rooms?.data?.map(room => ({
    value: room.roomNumber,
    label: `${room.roomNumber} - ${room.category}`
  }));

  return (
    <>
      <form autoComplete="off" method="dialog">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => formik.handleReset()}
        >
          ✕
        </button>
      </form>
      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Booking</h3>
        <hr />
        <form autoComplete="off"
          className="form-control grid grid-cols-1 gap-4 mt-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <Select
              placeholder="Room number"
              defaultValue={selectedRooms}
              options={transformedRooms}
              isMulti
              isSearchable
              closeMenuOnSelect={false}
              onKeyDown={handleKeyDown}
              onChange={setSelectedRooms}
              noOptionsMessage={() => "No room available"}
              classNames={{
                control: (state) =>
                  `!input !input-md !min-h-[3rem] !h-auto !input-bordered !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none ${
                    state.isFocused ? "!shadow-none" : ""
                  }`,
                valueContainer: () => "!p-0",
                placeholder: () => "!m-0",
              }}
            />
          </div>

          
          {/* Guest box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Guest name"
              name="guestName"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.guestName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.guestName && Boolean(formik.errors.guestName) ? (
              <small className="text-red-600">
                {formik.touched.guestName && formik.errors.guestName}
              </small>
            ) : null}
          </div>
          {/* Adsress box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
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
          {/* mobileNumber box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Mobile number"
              name="mobileNumber"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber) ? (
              <small className="text-red-600">
                {formik.touched.mobileNumber && formik.errors.mobileNumber}
              </small>
            ) : null}
          </div>
          {/* emergency  box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Emergency Number"
              name="emergencyNumber"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.emergencyNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.emergencyNumber && Boolean(formik.errors.emergencyNumber) ? (
              <small className="text-red-600">
                {formik.touched.emergencyNumber && formik.errors.emergencyNumber}
              </small>
            ) : null}
          </div>
          {/* adult box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Adult"
              name="adult"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.adult}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.adult && Boolean(formik.errors.adult) ? (
              <small className="text-red-600">
                {formik.touched.adult && formik.errors.adult}
              </small>
            ) : null}
          </div>
          {/* children box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Children"
              name="children"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.children}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.children && Boolean(formik.errors.children) ? (
              <small className="text-red-600">
                {formik.touched.children && formik.errors.children}
              </small>
            ) : null}
          </div>
          {/* payment method box */}
          <div className="flex flex-col gap-3">
            <select
              name="paymentMethod"
              className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none"
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
          formik.values.paymentMethod !== "cash" ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Transaction ID"
                name="trxID"
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
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
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Discount"
              name="discount"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discount && Boolean(formik.errors.discount) ? (
              <small className="text-red-600">
                {formik.touched.discount && formik.errors.discount}
              </small>
            ) : null}
          </div>
          {/* Date */}
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

           {/* Nationality box */}
           <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nationality"
              name="nationality"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nationality && Boolean(formik.errors.nationality) ? (
              <small className="text-red-600">
                {formik.touched.nationality && formik.errors.nationality}
              </small>
            ) : null}
          </div>
          {/* button */}
          <div className={`flex justify-between`}>
            <button
              type={"submit"}
              className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBooking;
