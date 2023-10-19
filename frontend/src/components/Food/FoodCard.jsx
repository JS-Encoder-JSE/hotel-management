import React from 'react';
import { useFormik } from "formik";
import { FaSearch } from "react-icons/fa";
import FoodCardShow from './FoodCardShow';

const FoodCard = () => {

    const formik = useFormik({
        initialValues: {
          search: "",
          filter: "",
        },
      });
    return (
        <div className={`space-y-8`}>
        <div className={`flex justify-between gap-4`}>
          <div>
            <select
              name="filter"
              className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.filter}
              onChange={formik.handleChange}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="booked">New Item</option>
            </select>
          </div>
          <div className={`relative sm:min-w-[20rem]`}>
            <input
              type="text"
              placeholder="Search by Food ..."
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
        <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4`}>
          {[...Array(8)].map((elem, idx) => (
            <FoodCardShow key={idx} room={idx} />
          ))}
        </div>
      </div>
    );
};

export default FoodCard;