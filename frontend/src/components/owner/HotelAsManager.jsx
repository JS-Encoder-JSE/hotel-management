import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateLicenseStatusMutation } from "../../redux/admin/sls/slsAPI.js";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
  remarks: yup.string().when(["status"], ([status], schema) => {
    if (status !== "active") return schema.required("Remarks is required");
    else return schema;
  }),
  fromDate: yup.string().when(["status"], ([status], schema) => {
    if (status === "Suspend") return schema.required("From date is required");
    else return schema;
  }),
  toDate: yup.string().when(["status"], ([status], schema) => {
    if (status === "Suspend") return schema.required("To date is required");
    else return schema;
  }),
});

const HotelAsManager = ({ formik, count, setCount, managersRev }) => {
  return (
    <>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          x
        </button>
      </form>
      <div className={`px-10`}>
        <h3 className={`text-2xl font-semibold mb-3`}>Assign Manager</h3>
        <hr />
        <div className={`mt-5 space-y-3`}>
          {[...Array(count)].map((_, idx) => {
            const dyn = ++idx;
            const managerTitle = `manager${dyn}`;
            const shiftTitle = `shift${dyn}`;

            return (
              <>
                <div className="grid grid-cols-2 gap-4 relative">
                  <div className="flex flex-col gap-3">
                    <select
                      name={managerTitle}
                      className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                      value={formik.values[managerTitle]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" selected disabled>
                        Manager
                      </option>
                      {managersRev.map((elem) => (
                        <option value={elem._id}>{elem?.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Manager Shift box */}
                  <div className="flex flex-col gap-3">
                    <select
                      name={shiftTitle}
                      className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                      value={formik.values[shiftTitle]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" selected disabled>
                        shift
                      </option>
                      {/* <option value="shiftManager4">General Shift</option> */}
                      <option value="Morning">Morning</option>
                      <option value="Day">Day</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                  {dyn !== 1 &&
                  (formik.values[managerTitle] || formik.values[shiftTitle]) ? (
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 inline-flex w-6 h-6 items-center justify-center text-red-600 hover:text-green-slimy cursor-pointer transition-colors duration-500 -mr-7`}
                      onClick={() => {
                        formik.setValues({
                          [managerTitle]: "",
                          [shiftTitle]: "",
                        });
                      }}
                    >
                      <FaTrash />
                    </div>
                  ) : null}
                </div>
                {count === dyn && count < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCount((prev) => ++prev);
                    }}
                    className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case w-fit"
                  >
                    Add more
                  </button>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HotelAsManager;
