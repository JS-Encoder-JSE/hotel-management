import React, { useState } from "react";
import { useFormik } from "formik";
import InventoryLists from "../../components/inventory/InventoryLists.jsx";
import { FaSearch } from "react-icons/fa";
import { useInventoryQuery } from "../../redux/inventory/inventoryAPI.js";
import { Rings } from "react-loader-spinner";

const ManageInventory = () => {
  const [keyword, setKeyword] = useState(null);
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });

  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, data: lists } = useInventoryQuery({
    cp: currentPage,
    filter: formik.values.filter,
    search: keyword,
  });

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
            <option value="in_stock">Stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>
          {formik.touched.filter && Boolean(formik.errors.filter) ? (
            <small className="text-red-600">
              {formik.touched.filter && formik.errors.filter}
            </small>
          ) : null}
        </div>
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
            onClick={() => formik.handleSubmit()}
            type="button"
            className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      {!isLoading ? (
        <InventoryLists setCurrentPage={setCurrentPage} lists={lists} />
      ) : (
        <Rings
          width="50"
          height="50"
          color="#37a000"
          wrapperClass="justify-center"
        />
      )}
    </div>
  );
};

export default ManageInventory;
