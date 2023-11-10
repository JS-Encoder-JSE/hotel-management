import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  useGetRoomsAndHotelsQuery,
  useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import {
  useDeleteEmployeeMutation,
  useEmployeeQuery,
} from "../../redux/employee/employeeAPI.js";
import Swal from "sweetalert2";
import { useGetUsersQuery } from "../../redux/admin/subadmin/subadminAPI.js";
import store from "../../redux/store.js";
import { useUpdateLicenseStatusMutation } from "../../redux/admin/sls/slsAPI.js";

const ManageEmployee = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(null);
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const [employeesPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const parentId = store.getState().authSlice.user._id;
  const [updateLicenseStatus] = useUpdateLicenseStatusMutation();
  const formik = useFormik({
    initialValues: {
      filter: "",
      search: "",
      chooseHotel: "",
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });
  const { isLoading, data: employees } = useGetUsersQuery({
    cp: currentPage,
    filter: formik.values.filter,
    search: keyword,
    role: "employee",
    parentId,
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const handleDelete = (owner) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Employee will be delete.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#35bef0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          const { user_id, status } = owner;
          updateLicenseStatus({ user_id, status });
        });
      }
    });
  };

  useEffect(() => {
    if (employees) setPageCount(employees.totalPages);
  }, [employees]);

  return (
    <div className={`space-y-8 bg-white p-10 rounded-2xl`}>
      <div className={`flex justify-between gap-4`}>
        <div className="flex flex-col gap-3">
          <select
            name="chooseHotel"
            className="input input-md h-8 bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
          {formik.touched.chooseHotel && Boolean(formik.errors.chooseHotel) ? (
            <small className="text-red-600">
              {formik.touched.chooseHotel && formik.errors.chooseHotel}
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
      {formik.values.chooseHotel ? (
        employees?.docs?.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="table border">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Emergency Contact</th>
                    <th>Shift</th>
                    <th>Salary</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.docs?.map((employee, idx) => {
                    console.log(employee);
                    const {
                      _id,
                      name,
                      designation,
                      shift,
                      salary,
                      address,
                      emergency_contact,
                      status,
                    } = employee;

                    return (
                      <tr
                        className={
                          idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                        }
                      >
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
                              <div className="font-bold">{name}</div>
                              <div className="text-sm opacity-50">
                                {designation}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{emergency_contact}</td>
                        <td>{shift}</td>
                        <td>{salary}</td>
                        <td>{address}</td>
                        <td>
                          {status === "Active" ? (
                            <div className="badge min-w-[7rem] bg-green-slimy border-green-slimy text-white">
                              Active
                            </div>
                          ) : status === "Deactive" || status === "Deleted" ? (
                            <div className="badge min-w-[7rem] bg-red-600 border-red-600 text-white">
                              {status}
                            </div>
                          ) : status === "Suspended" ? (
                            <div className="badge min-w-[7rem] bg-red-500 border-red-500 text-white">
                              Suspended
                            </div>
                          ) : (
                            <div className="badge min-w-[7rem] bg-orange-600 border-orange-600 text-white">
                              Expired
                            </div>
                          )}
                        </td>
                        <td className={`space-x-1.5`}>
                          <span
                            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                            onClick={() =>
                              navigate(`/dashboard/edit-employee/${_id}`)
                            }
                          >
                            <FaEdit />
                          </span>
                          <span
                            className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                            onClick={() =>
                              handleDelete({
                                user_id: _id,
                                status: "Deleted",
                              })
                            }
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
            <div className="flex justify-center mt-10">
              <ReactPaginate
                containerClassName="join rounded-none"
                pageLinkClassName="join-item btn btn-md bg-transparent"
                activeLinkClassName="btn-active !bg-green-slimy text-white"
                disabledLinkClassName="btn-disabled"
                previousLinkClassName="join-item btn btn-md bg-transparent"
                nextLinkClassName="join-item btn btn-md bg-transparent"
                breakLinkClassName="join-item btn btn-md bg-transparent"
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
          </>
        ) : (
          <h3 className={`text-center`}>No data found!</h3>
        )
      ) : (
        <h3 className={`text-center`}>Please choose a hotel</h3>
      )}
    </div>
  );
};

export default ManageEmployee;
