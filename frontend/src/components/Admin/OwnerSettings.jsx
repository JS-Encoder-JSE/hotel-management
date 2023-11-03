import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({
  password: yup.string().required("Password is required"),
  feedback: yup.string().when(["status"], ([status], schema) => {
    if (status !== "active") return schema.required("Feedback is required");
    else return schema;
  }),
});

const OwnerSettings = () => {
  const formik = useFormik({
    initialValues: {
      status: "",
      password: "",
      feedback: "",
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
        <h3 className={`text-2xl font-semibold mb-3`}>Change Status</h3>
        <hr />
        <form
          className="form-control grid grid-cols-1 gap-4 mt-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <select
              name="status"
              className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>Active</option>
              <option value="Deactivate">Deactivate</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter password"
              name="password"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && Boolean(formik.errors.password) ? (
              <small className="text-red-600">
                {formik.touched.password && formik.errors.password}
              </small>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <textarea
              placeholder="Feedback"
              name="feedback"
              className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
              value={formik.values.feedback}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.feedback && Boolean(formik.errors.feedback) ? (
              <small className="text-red-600">
                {formik.touched.feedback && formik.errors.feedback}
              </small>
            ) : null}
          </div>
          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            Confirm
          </button>
        </form>
      </div>
    </>
  );
};

export default OwnerSettings;
