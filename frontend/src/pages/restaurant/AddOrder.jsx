import React, { useState } from "react";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/restaurant/ConfirmOrder.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import { useGetRoomsAndHotelsQuery } from "../../redux/room/roomAPI.js";
import { resetFoodOrder } from "../../redux/add-order/addOrderSlice.js";
import {FaArrowsRotate} from "react-icons/fa6";

const AddOrder = () => {
  const [keyword, setKeyword] = useState(null);
  const [reset, setReset] = useState(false)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      search: "",
      method: "",
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });
  const { order } = useSelector((store) => store.addOrderSlice);
  const { data: hotelList } = useGetRoomsAndHotelsQuery();

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div
        className={`flex flex-col-reverse sm:flex-row gap-3 sm:justify-between`}
      >
        <div className="flex flex-col gap-3">
          <select
            name="chooseHotel"
            className="input input-md h-8 bg-transparent input-bordered border-green-slimy rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.chooseHotel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Choose Hotel
            </option>
            {hotelList?.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className={`flex space-x-1.5`}>
          <button
            onClick={() => {
              dispatch(resetFoodOrder());
              setReset(true);
            }}
            type={`button`}
            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case ${
              !order.foods.length ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <span>Reset</span>
            <span>
              <FaArrowsRotate />
            </span>
          </button>
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
              // onKeyUp={(e) => {
              //   e.target.value === "" ? formik.handleSubmit() : null;
              // }}
              // onKeyDown={(e) => pressEnter(e)}
            />
            {/*<button*/}
            {/*  type="button"*/}
            {/*  onClick={() => formik.handleSubmit()}*/}
            {/*  className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"*/}
            {/*>*/}
            {/*  <FaSearch />*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
      <FoodLists
          formik={formik}
        reset={reset}
        setReset={setReset}
        keyword={keyword}
        chooseHotel={formik.values.chooseHotel}
      />
      <Modal id={`fp_modal`} classNames={`w-full max-w-3xl`}>
        <ConfirmOrder />
      </Modal>
    </div>
  );
};

export default AddOrder;
