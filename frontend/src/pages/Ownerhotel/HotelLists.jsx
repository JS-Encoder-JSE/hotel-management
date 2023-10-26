import React from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import {useNavigate} from "react-router-dom";

const HotelLists = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      search: "",
      filter: "",
    },
  });

  return (
    <div className={`space-y-10 bg-white rounded-2xl p-10`}>
      <div className={`flex justify-between gap-4`}>
        <div>
          <select
            name="filter"
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.filter}
            onChange={formik.handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="deactive">deActive</option>
            <option value="suspended">Suspended</option>
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
      <div className="overflow-x-auto">
        <table className="table border">
          <thead>
            <tr>
            <th>Sl</th>
            <th>Hotel Name</th>
                  <th>Hotel <br /> Address</th>
                  <th className="text-center">Hotel <br /> Email</th>
                  <th>Phone <br /> Number</th>
                  <th>License <br /> Number</th>
                  <th> Branch <br /> Name</th>
                  <th> Manager <br /> List</th>
                  <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_,idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <th> {++idx}</th>
                  <td className="font-bold">Jon Doe</td>
                  <td >Kolkata</td>
                  <td>jondoe@gmail.com</td>
                  <td>+98825456</td>
                  <td>123456</td>
                  <td>Branch 1</td>
                  <td>Manager 1</td>
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                      onClick={() => navigate(`/dashboard/hotel-edit/${idx}`)}
                    >
                      <FaEdit />
                    </span>
                    <span
                      className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case mt-2`}
                    >
                      <FaTrash />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelLists;
