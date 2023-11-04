import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({

    manager: yup.string().required("manager is required"),
    shiftManager: yup.string().required("Shift Manager is required"),
//   branchName: yup.string().when(["status"], ([status], schema) => {
//     if (status == "transfer")
//       return schema.required("Branch Name is required");
//     else return schema;
//   }),
//   remarks: yup.string().when(["status"], ([status],
//      schema) => {
//     if (status !== "induty") return schema.required("Feedback is required");
//     else return schema;
//   }),
});

const ChangeShift = () => {
  const formik = useFormik({
    initialValues: {
        manager:"",
        shiftManager: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <form method="dialog">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => formik.handleReset()}
        >
          ✕
        </button>
      </form>
      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Change Shift</h3>
        <hr />
        <form
          className="form-control grid grid-cols-1 gap-4 mt-5"
          onSubmit={formik.handleSubmit}
        >
       {/* Manager box */}
       <div className="flex flex-col gap-3">
              <select
                name="manager"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                value={formik.values.manager}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" selected disabled>
                  Manager
                </option>
                <option value="jobber">Jobber</option>
                <option value="kuddush">Kuddush</option>
                <option value="akber">Akber</option>
                <option value="josim">josim</option>
              </select>
              {formik.touched.manager && Boolean(formik.errors.manager) ? (
                <small className="text-red-600">
                  {formik.touched.manager && formik.errors.manager}
                </small>
              ) : null}
            </div>
            {/* Manager Shift box */}
            <div className="flex flex-col gap-3">
              <select
                name="shiftManager"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                value={formik.values.shiftManager}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" selected disabled>
                  shift
                </option>
                {/* <option value="shiftManager4">General Shift</option> */}
                <option value="morning">Morning</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
              {formik.touched.shiftManager &&
              Boolean(formik.errors.shiftManager) ? (
                <small className="text-red-600">
                  {formik.touched.shiftManager && formik.errors.shiftManager}
                </small>
              ) : null}
            </div>
        {formik.values.status &&
        formik.values.status == "transfer" ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Branch Name"
              name="branchName"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.branchName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.branchName && Boolean(formik.errors.branchName) ? (
              <small className="text-red-600">
                {formik.touched.branchName && formik.errors.branchName}
              </small>
            ) : null}
          </div>
        ) : null}

          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangeShift;
