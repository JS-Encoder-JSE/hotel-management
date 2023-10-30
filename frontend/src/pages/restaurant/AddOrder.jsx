import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/restaurant/ConfirmOrder.jsx";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
});

const foods = [
  {
    id: 1,
    name: "Basmati Kacchi",
    price: 200,
    img: "https://www.upoharbd.com/images/uploads/Food/kacchi_vai_basmati.jpg",
  },
  {
    id: 2,
    name: "The Mughal Empire Kacchi",
    price: 340,
    img: "https://www.upoharbd.com/images/uploads/Food/mughal_kacchi_lover.jpg",
  },
  {
    id: 3,
    name: "Mughal Empire Basmati Kacchi",
    price: 450,
    img: "https://www.upoharbd.com/images/uploads/Food/mughal_Basmati_kacchi.jpg",
  },
];

const AddOrder = () => {
  const { order } = useSelector((store) => store.addOrderSlice);
  const formik = useFormik({
    initialValues: {
      roomNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div
        className={`flex flex-col-reverse sm:flex-row gap-3 sm:justify-between`}
      >
        <div className="flex flex-col gap-3">
          <select
            name="roomNumber"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.roomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Room Number
            </option>
            <option value={101}>101</option>
            <option value={102}>102</option>
            <option value={103}>103</option>
          </select>
          {formik.touched.roomNumber && Boolean(formik.errors.roomNumber) ? (
            <small className="text-red-600">
              {formik.touched.roomNumber && formik.errors.roomNumber}
            </small>
          ) : null}
        </div>
        <div className={`flex space-x-1.5`}>
          <button
            onClick={() => window.fp_modal.showModal()}
            type={`button`}
            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case ${
              !order.foods.length ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Confirm Order
          </button>
          <div className={`relative sm:min-w-[20rem]`}>
            <input
              type="text"
              placeholder="Search by name..."
              name="search"
              className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.search}
              onChange={formik.handleChange}
            />
            <button
              type="button"
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <FoodLists foods={foods} />
      <Modal id={`fp_modal`}>
        <ConfirmOrder />
      </Modal>
    </div>
  );
};

export default AddOrder;
