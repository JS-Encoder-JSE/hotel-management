import React from "react";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const FoodInventory = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
      entries: "",
    },
  });

  return (
    <div className={`space-y-8 bg-white p-10 rounded-2xl`}>
      <div className={`flex justify-between`}>
        <div className={`space-x-1.5`}>
          <span>Show</span>
          <select
            name="entries"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.entries}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
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
              <th>Name</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th>Sell</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(+formik.values.entries || 10)].map((_, idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">Menu 1</div>
                      </div>
                    </div>
                  </td>
                  <td>20</td>
                  <td>30</td>
                  <td>10</td>
                  <td>$10</td>
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                      onClick={() => navigate(`/dashboard/edit-food/${idx}`)}
                    >
                      <FaEdit />
                    </span>
                    <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
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

export default FoodInventory;
