import React from "react";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/inventory/ConfirmOrder.jsx";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import InventoryLists from "../../components/inventory/InventoryLists.jsx";

const ManageInventory = () => {
  const formik = useFormik({
    initialValues: {
      search: "",
      filter: "",
    },
    onSubmit: () => {
      console.log(order);
    },
  });
  const { order } = useSelector((store) => store.inventorySlice);

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div
        className={`flex flex-col-reverse sm:flex-row gap-3 sm:justify-between`}
      >
        <div className="flex flex-col gap-3">
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="all">All</option>
            <option value="in_stock">Available</option>
            <option value="out_of_stock">Unavailable</option>
          </select>
          {formik.touched.filter && Boolean(formik.errors.filter) ? (
            <small className="text-red-600">
              {formik.touched.filter && formik.errors.filter}
            </small>
          ) : null}
        </div>
        <div className={`flex space-x-1.5`}>
          <button
            onClick={() => window.fp_modal.showModal()}
            type={`button`}
            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case ${
              !order.items.length ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Assign Items
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
      <InventoryLists />
      <Modal id={`fp_modal`}>
        <ConfirmOrder />
      </Modal>
    </div>
  );
};

export default ManageInventory;
