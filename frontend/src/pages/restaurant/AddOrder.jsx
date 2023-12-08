import React, { useEffect, useState } from "react";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/restaurant/ConfirmOrder.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

import { useFormik } from "formik";
import {
  useGetRoomsAndHotelsQuery,
  useGetTablesQuery,
  useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import {
  resetFoodOrder,
  setRoomId,
  setTableId,
} from "../../redux/add-order/addOrderSlice.js";
import { FaArrowsRotate } from "react-icons/fa6";
import Select from "react-select";
import { Link } from "react-router-dom";

const AddOrder = () => {
  const [keyword, setKeyword] = useState(null);
  const [reset, setReset] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      search: "",
      method: "",
      type: "",
      roomId: "",
      tableId: "",
    },

    onSubmit: (values) => {
      // setKeyword(values.search);
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
    id: "655084bc24936415423bfa2f",
    cp: "0",
    filter: "",
    search: "",
    limit: 1000000,
  });

console.log(rooms)

  const { data: tables } = useGetTablesQuery();
  const transformedRooms = rooms?.data?.docs?.map((room) => ({
    value: room._id,
    label: room.roomNumber,
  }));
  const transformedTables = tables?.data?.map((table) => ({
    value: table._id,
    label: table.table_number,
  }));

  useEffect(() => {
    formik.values.type.length && setError("");
  }, [formik.values.type]);
  return (
    <div className={`space-y-10 bg-white rounded-2xl p-5`}>
       <div>
          <Link to={`/dashboard `}>
            <button
              type="button"
              class="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 mb-6"
            >
              <dfn>
                <abbr title="Back">
                  <FaArrowLeft />
                </abbr>
              </dfn>

              <span className="tracking-wider font-semibold text-[1rem]"></span>
            </button>
          </Link>
        </div>
           <div  className={`bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 text-center`}>
        <h1>Add-Order</h1>
      </div>
      <div className={`flex flex-col md:flex-row justify-between`}>
       
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

        <div className={`flex flex-col md:flex-row gap-4 mb-4`}>
          <div className=" flex flex-col">
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
            {error && (
              <span className="text-red-600 ms-2">
                <small>{error}</small>
              </span>
            )}
          </div>

          {formik.values.type && formik.values.type === "Room" ? (
            <div className="flex flex-col gap-3">
              <Select
                placeholder="Select room"
                name={`roomId`}
                // defaultValue={formik.values.roomNumber}
                options={transformedRooms}
                isSearchable
                onChange={(e) => {
                  formik.setFieldValue("roomId", e.value);
                }}
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
                name={`tableId`}
                // defaultValue={formik.values.roomNumber}
                options={transformedTables}
                isSearchable
                onChange={(e) => formik.setFieldValue("tableId", e.value)}
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

        <div className={`flex flex-col md:flex-row gap-6`}>
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
            onClick={() => {
              if (formik.values.type && formik.values.type === "Table") {
                dispatch(setTableId(formik.values.tableId));
                window.fp_modal.showModal();

                setError("");
              } else if (formik.values.type && formik.values.type === "Room") {
                dispatch(setRoomId(formik.values.roomId));
                console.log(formik.values)
                window.fp_modal.showModal();

                setError("");
              } else {
                setError(" please Choose the type");
              }
              // formik.values.type && formik.values.type === "Table"
              //   ? dispatch(setTableId(formik.values.tableId))
              //   : formik.values.type && formik.values.type === "Room"
              //     ? dispatch(setRoomId(formik.values.roomId))
              //     : null;
              // window.fp_modal.showModal();
            }}
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
        {<ConfirmOrder />}
      </Modal>
    </div>
  );
};

export default AddOrder;
