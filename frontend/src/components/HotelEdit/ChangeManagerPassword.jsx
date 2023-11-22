import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUserMutation } from "../../redux/admin/subadmin/subadminAPI";
const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
const ChangeManagerPassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [updateUser, { isLoading: isFetching }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const obj = { ...values };
      const { newPassword } = obj;
      const response = await updateUser({
        id: id,
        data: {
          password: newPassword,
        },
      });

      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        navigate(-1);
        toast.success(response.data.message);
      }
    },
  });
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div
      className={`relative max-w-xl bg-white rounded-2xl mx-auto p-8 pt-10 mt-20`}
    >
      <div>
        <div>
          <button
            type="button"
            className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded-md normal-case"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <form
        autoComplete="off"
        className="form-control grid grid-cols-1 gap-4 mt-14"
        onSubmit={formik.handleSubmit}
      >
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
          <span>Update Password</span>
          {isFetching ? (
            <span
              className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
              role="status"
            ></span>
          ) : null}
        </button>
      </form>
    </div>
  );
};

export default ChangeManagerPassword;
