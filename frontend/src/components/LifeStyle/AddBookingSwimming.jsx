import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import {useAddBookingMutation, useRoomsQuery} from "../../redux/room/roomAPI.js";
import toast from "react-hot-toast";

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
  roomNo: yup
    .number()
    .required("Room Number is required")
    .positive("Room Number must be a positive number")
    .integer("Room Number must be an integer"),
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

const AddBookingSwimming = () => {
  const { isLoading, data: rooms } = useRoomsQuery();
  const [addBooking] = useAddBookingMutation();
  const [selectedRooms, setSelectedRooms] = useState([]);

  const formik = useFormik({
    initialValues: {
      roomNo: "",
      guestName: "",
      address:"",
      mobileNumber: "",
      emergencyNumber: "",
      adult: "",
      children: "",
      paymentMethod: "",
      trxID: "",
      discount: "",
      fromDate: "",
      toDate: "",
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
      <form method="dialog">
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
        <form
          className="form-control grid grid-cols-1 gap-4 mt-5"
          onSubmit={formik.handleSubmit}
        >
          {/* Room Number */}
          {/* <div className="flex flex-col gap-3">
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
          </div> */}

          {/* Room Number box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Room Number"
              name="roomNo"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.roomNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.roomNo && Boolean(formik.errors.roomNo) ? (
              <small className="text-red-600">
                {formik.touched.roomNo && formik.errors.roomNo}
              </small>
            ) : null}
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
          {/* Status */}
         <div className="flex flex-col gap-3">
                <select
                  name="status"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" selected disabled>
                    Status
                  </option>
                  <option value=" Active">Active</option>
                  <option value="InActive">InActive </option>
                  <option value="Bookded"> Bookded</option>
                  <option value="UnderMaintenence">Under Maintenence</option>
                </select>
                {formik.touched.status && Boolean(formik.errors.status) ? (
                  <small className="text-red-600">
                    {formik.touched.status && formik.errors.status}
                  </small>
                ) : null}
              </div>
                 {/* select Pool Name */}
              <div className="flex flex-col gap-3">
                <select
                  name="poolSelect"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  value={formik.values.poolSelect}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" selected disabled>
                   Select Pool
                  </option>
                  <option value=" DolphinSwimming">Dolphin Swimming</option>
                  <option value="RoyalPools"> Royal Pools</option>
                  <option value="NeptunePool"> Neptune Pool</option>
                </select>
                {formik.touched.status && Boolean(formik.errors.status) ? (
                  <small className="text-red-600">
                    {formik.touched.status && formik.errors.status}
                  </small>
                ) : null}
              </div>
                {/* Capacity*/}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Capacity"
            name="capacity"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.capacity &&
          Boolean(formik.errors.capacity) ? (
            <small className="text-red-600">
              {formik.touched.capacity && formik.errors.capacity}
            </small>
          ) : null}
        </div>

              <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Price"
            name="ItemPrice"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.ItemPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ItemPrice &&
          Boolean(formik.errors.ItemPrice) ? (
            <small className="text-red-600">
              {formik.touched.ItemPrice && formik.errors.ItemPrice}
            </small>
          ) : null}
        </div>
       
          {/* From */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="From  MM/DD/YYY"
              name="fromDate"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.fromDate}
              onChange={formik.handleChange}
              onBlur={(e) => {
                e.target.type = "text";
                formik.handleBlur;
              }}
              onFocus={(e) => (e.target.type = "date")}
            />
            {formik.touched.fromDate && Boolean(formik.errors.fromDate) ? (
              <small className="text-red-600">
                {formik.touched.fromDate && formik.errors.fromDate}
              </small>
            ) : null}
          </div>
        
  <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Hour Of Swimming Pool"
            name="hourOfSwimmingPool"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.hourOfSwimmingPool}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hourOfSwimmingPool &&
          Boolean(formik.errors.hourOfSwimmingPool) ? (
            <small className="text-red-600">
              {formik.touched.hourOfSwimmingPool && formik.errors.hourOfSwimmingPool}
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

export default AddBookingSwimming;
