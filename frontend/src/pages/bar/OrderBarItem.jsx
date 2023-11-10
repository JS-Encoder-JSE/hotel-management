import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import BookingLists from "../../components/room/BookingLists.jsx";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
// import AddBooking from "../../components/room/AddBooking.jsx";
import AddBookingSwimming from "../../components/LifeStyle/AddBookingSwimming.jsx";
// import SwimmingLists from "../../components/LifeStyle/SwimmingLists.jsx";
import Select from "react-select";

// form validation
const validationSchema = yup.object({
//   chooseHotel: yup.string().required("Choose Hotel is required"),
  roomNo: yup
    .number()
    .required("Room Number is required")
    .positive("Room Number must be a positive number")
    .integer("Room Number must be an integer"),
  itemName: yup.string().required("Item Name is required"),

  typeOfAlcohol: yup.string().required("Type Of Alcohol is required"),
  surveyorQuantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),

  perPersonPrice: yup.string().required("Price is required"),
});

const OrderBarItem = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const formik = useFormik({
    initialValues: {
      chooseHotel: "",
      roomNumber: "",
      itemName: "",
      typeOfAlcohol: "",
      surveyorQuantity: "",
      perPersonPrice: "",
      paidamount: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  // const [status, setStatus] = useState("");

  // const selectOption = [
  //   {
  //     name: "DolphinSwimming",
  //     status: "Available",
  //   },
  //   {
  //     name: "RoyalPools",
  //     status: "Unavailable",
  //   },
  //   {
  //     name: "NeptunePool",
  //     status: "Available",
  //   },
  // ];

  // useEffect(() => {
  //   // console.log(formik.values.poolSelect)

  //   const value = selectOption.find((i) => i.name === formik.values.poolSelect);
  //   console.log(value);
  //   setStatus(value?.status);
  // }, [formik.values.poolSelect]);
  // console.log(status);
  return (
    <div
      className={`relative max-w-xl bg-white rounded-2xl mx-auto p-8 pt-10 mt-20`}
    >
      <div className=" ">
        <h3
          className={`text-center bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded text-white text-2xl`}
        >
          Order Bar Item
        </h3>
        <hr />
        <form
          className=" form-control grid grid-cols-1 gap-4 mt-5 "
          onSubmit={formik.handleSubmit}
        >
          {/* Choose Hotel  Name */}
          <div className="flex flex-col gap-3">
            <select
              name="chooseHotel"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.poolSelect}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Select Hotel
              </option>
              <option value="hotelNumber1">Hotel Number 1</option>
              <option value="hotelNumber2">Hotel Number 2 </option>
              <option value="hotelNumber3"> Hotel Number 3</option>
            </select>

            {formik.touched.chooseHotel &&
            Boolean(formik.errors.chooseHotel) ? (
              <small className="text-red-600">
                {formik.touched.chooseHotel && formik.errors.chooseHotel}
              </small>
            ) : null}
          </div>

            {/* Room Number box */}

            <div className="flex flex-col gap-3">
            <Select
              placeholder="Select room"
              name={`roomNumber`}
              defaultValue={selectedOption}
              // options={transformedRooms}
              isSearchable
              closeMenuOnSelect={false}
              onChange={setSelectedOption}
              noOptionsMessage={() => "No room available"}
              classNames={{
                control: (state) =>
                  `!input !input-md !h-8 !input-bordered !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none ${
                    state.isFocused ? "!shadow-none" : ""
                  }`,
                valueContainer: () => "!p-0",
                placeholder: () => "!m-0",
              }}
            />
            {formik.touched.roomNumber && Boolean(formik.errors.roomNumber) ? (
              <small className="text-red-600">
                {formik.touched.roomNumber && formik.errors.roomNumber}
              </small>
            ) : null}
          </div>

          {/* Item Name box */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Item name"
              name="itemName"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
              value={formik.values.itemName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.itemName && Boolean(formik.errors.itemName) ? (
              <small className="text-red-600">
                {formik.touched.itemName && formik.errors.itemName}
              </small>
            ) : null}
          </div>
          {/* Type Of Alcohol Pack */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Type Of Alcohol"
              name="typeOfAlcohol"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.typeOfAlcohol}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.typeOfAlcohol &&
            Boolean(formik.errors.typeOfAlcohol) ? (
              <small className="text-red-600">
                {formik.touched.typeOfAlcohol && formik.errors.typeOfAlcohol}
              </small>
            ) : null}
          </div>

          {/* surveyor Quantity */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Surveyor Quantity"
              name="surveyorQuantity"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.surveyorQuantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.surveyorQuantity &&
            Boolean(formik.errors.surveyorQuantity) ? (
              <small className="text-red-600">
                {formik.touched.surveyorQuantity &&
                  formik.errors.surveyorQuantity}
              </small>
            ) : null}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Price"
              name="perPersonPrice"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.perPersonPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.perPersonPrice &&
            Boolean(formik.errors.perPersonPrice) ? (
              <small className="text-red-600">
                {formik.touched.perPersonPrice && formik.errors.perPersonPrice}
              </small>
            ) : null}
          </div>
          {/*Paid Amount  */}
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Paid Amount"
              name="paidamount"
              className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.paidamount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.paidamount &&
            Boolean(formik.errors.paidamount) ? (
              <small className="text-red-600">
                {formik.touched.paidamount && formik.errors.paidamount}
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
    </div>
  );
};

export default OrderBarItem;
