import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FoodLists from "../../components/restaurant/FoodLists.jsx";

const InventoryLists = () => {
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: ""
    }
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
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          {formik.touched.filter && Boolean(formik.errors.filter) ? (
            <small className="text-red-600">
              {formik.touched.filter && formik.errors.filter}
            </small>
          ) : null}
        </div>
        <div>
          <input
          type="text"
          placeholder="Search by name..."
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

export default InventoryLists;
