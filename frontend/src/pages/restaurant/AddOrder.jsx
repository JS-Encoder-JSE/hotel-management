import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/room/ConfirmOrder.jsx";

// form validation
const validationSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
});

const AddOrder = () => {
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

          {/* modal */}
          <button onClick={() => window.fp_modal.showModal()}
            type={`button`}
            className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case "
          >
            Confirm Order
          </button>

          <Modal id={`fp_modal`}>
            <ConfirmOrder />
          </Modal>
          {/* modal */}

          <input
            type="text"
            placeholder="Search by food name..."
            name="search"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <FoodLists />
    </div>
  );
};

export default AddOrder;
