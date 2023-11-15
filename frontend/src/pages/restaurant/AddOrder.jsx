import React, { useState } from "react";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/restaurant/ConfirmOrder.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import {
  useGetRoomsAndHotelsQuery,
  useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import { resetFoodOrder } from "../../redux/add-order/addOrderSlice.js";
import { FaArrowsRotate } from "react-icons/fa6";
import Select from "react-select";

const AddOrder = () => {
  const [keyword, setKeyword] = useState(null);
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      search: "",
      method: "",
      type: "",
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

  const { isLoading, data: rooms } = useRoomsQuery({
    id: formik.values.chooseHotel,
    cp: "0",
    filter: "",
    search: "",
    limit: 1000000,
  });

  const transformedRooms = rooms?.data?.docs?.map((room) => ({
    value: room._id,
    label: room.roomNumber,
  }));

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div
        className={`flex flex-col-reverse sm:flex-row gap-3 sm:justify-between`}
      >
        {/*<div className="flex flex-col gap-3">*/}
        {/*  <select*/}
        {/*    name="chooseHotel"*/}
        {/*    className="input input-md h-8 bg-transparent input-bordered border-green-slimy rounded focus:outline-none focus:border-green-slimy"*/}
        {/*    value={formik.values.chooseHotel}*/}
        {/*    onChange={formik.handleChange}*/}
        {/*    onBlur={formik.handleBlur}*/}
        {/*  >*/}
        {/*    <option value="" selected disabled>*/}
        {/*      Choose Hotel*/}
        {/*    </option>*/}
        {/*    {hotelList?.map((i) => (*/}
        {/*      <option key={i._id} value={i._id}>*/}
        {/*        {i.name}*/}
        {/*      </option>*/}
        {/*    ))}*/}
        {/*  </select>*/}
        {/*</div>*/}
        <div className={`flex gap-1.5`}>
          <div className="flex flex-col gap-3">
            <select
              name="type"
              className="select select-sm bg-transparent select-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy !h-[2.35rem]"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="" selected disabled>
                Choose Type
              </option>
              <option value="Room">Room</option>
              <option value="Table">Table</option>
            </select>
          </div>
          {formik.values.type && formik.values.type === "Room" ? (
            <div className="flex flex-col gap-3">
              <Select
                placeholder="Select room"
                name={`roomNumber`}
                defaultValue={formik.values.roomNumber}
                options={transformedRooms}
                isSearchable
                onChange={(e) => formik.setFieldValue("roomNumber", e.value)}
                noOptionsMessage={() => "No room available"}
                classNames={{
                  control: (state) =>
                    `!input !input-md !h-auto !min-w-[12rem] !input-bordered !bg-transparent !rounded !border-gray-500/50 focus-within:!outline-none ${
                      state.isFocused ? "!shadow-none" : ""
                    }`,
                  valueContainer: () => "!p-0",
                  placeholder: () => "!m-0",
                }}
              />
            </div>
          ) : null}
          {formik.values.type && formik.values.type === "Table" ? (
              <div className="flex flex-col gap-3">
                <Select
                    placeholder="Select table"
                    name={`roomNumber`}
                    defaultValue={formik.values.roomNumber}
                    options={transformedRooms}
                    isSearchable
                    onChange={(e) => formik.setFieldValue("roomNumber", e.value)}
                    noOptionsMessage={() => "No table available"}
                    classNames={{
                      control: (state) =>
                          `!input !input-md !h-auto !min-w-[12rem] !input-bordered !bg-transparent !rounded !border-gray-500/50 focus-within:!outline-none ${
                              state.isFocused ? "!shadow-none" : ""
                          }`,
                      valueContainer: () => "!p-0",
                      placeholder: () => "!m-0",
                    }}
                />
              </div>
          ) : null}
        </div>
        <div className={`flex space-x-1.5`}>
          <button
            onClick={() => {
              dispatch(resetFoodOrder());
              setReset(true);
            }}
            type={`button`}
            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
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
