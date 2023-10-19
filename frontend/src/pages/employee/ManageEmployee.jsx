import React from "react";
import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";

const ManageEmployee = () => {
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
            <option value="available">Waiter</option>
            <option value="booked">Housekeeper</option>
          </select>
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
            type="button"
            className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    <div className="overflow-x-auto max-w-3xl mx-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shift</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map(() => {
            return (
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">Waiter</div>
                    </div>
                  </div>
                </td>
                <td>Day</td>
                <td>20000</td>
                <td>Mugda, Dhaka 1203</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManageEmployee;
