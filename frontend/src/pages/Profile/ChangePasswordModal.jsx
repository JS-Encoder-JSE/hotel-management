import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Confirm password is required"),
});

const ChangePasswordModal = () => {
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

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
        <h3 className={`text-2xl font-semibold mb-3`}>Change Password</h3>
        <hr />
        <form
          className="form-control grid grid-cols-1 gap-4 space-y-2 mt-10"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <h3 className={`font-semibold`}>Current Password</h3>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Current Password"
                name="currentPassword"
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword) ? (
                <small className="text-red-600">
                  {formik.touched.currentPassword &&
                    formik.errors.currentPassword}
                </small>
              ) : null}

              {!showPass ? (
                <FaEyeSlash
                  onClick={handleShowPass}
                  className="absolute right-0 top-4 text-green-slimy text-lg mr-3 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={handleShowPass}
                  className="absolute right-0 top-4 text-green-slimy text-lg mr-3 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div>
            <h3 className={`font-semibold`}>New Password</h3>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter New Password"
                name="newPassword"
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPassword &&
              Boolean(formik.errors.newPassword) ? (
                <small className="text-red-600">
                  {formik.touched.newPassword && formik.errors.newPassword}
                </small>
              ) : null}

              {!showPass ? (
                <FaEyeSlash
                  onClick={handleShowPass}
                  className="absolute right-0 top-4 text-green-slimy text-lg mr-3 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={handleShowPass}
                  className="absolute right-0 top-4 text-green-slimy text-lg mr-3 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div>
            <h3 className={`font-semibold`}>Confirm Password</h3>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword) ? (
                <small className="text-red-600">
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </small>
              ) : null}

              {!showPass ? (
                <FaEyeSlash
                  onClick={handleShowPass}
                  className="absolute right-0 top-4 text-green-slimy text-lg mr-3 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={handleShowPass}
                  className="absolute right-0 top-4 text-green-slimy text-lg mr-3 cursor-pointer"
                />
              )}
            </div>
          </div>

          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordModal;
