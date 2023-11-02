import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { setToken } from "../redux/auth/authSlice.js";
import { useSignInMutation } from "../redux/auth/authAPI.js";
import imgAbstractSI from "../assets/bg-abstract-signin.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// sign in form validation
const validationSchema = yup.object({
  username: yup
    .string()
    .email("Enter a valid username")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const fromURL = location.state?.fromURL.pathname;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await signIn(values);

      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        dispatch(setToken(response.data.token));
        navigate(fromURL || "/dashboard");
        toast.success("Sign In Successfully!", {
          duration: 3000,
        });
      }
    },
  });

  useEffect(() => {
    if (fromURL)
      toast.error(
        "Only registered user can access this page. Please, login first!",
      );
  }, []);

  return (
    <section className={`relative py-10`}>
      {/* background pattern */}
      <figure
        className={`hidden md:block absolute top-0 left-0 w-full h-96 overflow-hidden`}
      >
        <img src={imgAbstractSI} alt="" />
      </figure>
      <div className="container">
        <div className={`mt-28`}>
          {/* brand title */}
          <h1
            className={`relative text-4xl font-black text-green-slimy text-center`}
          >
            Hotel Management Application
          </h1>
          {/* sign in card */}
          <div className="card w-full sm:max-w-lg sm:mx-auto bg-white shadow-2xl mt-16">
            <div className="card-body">
              <div className={`flex flex-col items-center space-y-2`}>
                <h3 className={`text-2xl font-bold`}>Sign In</h3>
                <p>Sign in Using Your Username</p>
              </div>
              <form
                className="form-control gap-y-4"
                onSubmit={formik.handleSubmit}
              >
                {/* username box */}
                <div className="flex flex-col gap-3">
                  <input
                    type="username"
                    placeholder="Username"
                    name="username"
                    className="input input-sm bg-transparent text-green-slimy w-full px-0 border-0 border-b border-b-green-slimy rounded-none focus:outline-none"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username &&
                  Boolean(formik.errors.username) ? (
                    <small className="text-red-600">
                      {formik.touched.username && formik.errors.username}
                    </small>
                  ) : null}
                </div>
                {/* password box */}
                <div className="flex flex-col gap-3">
                  <div className={`relative`}>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      className="input input-sm bg-transparent text-green-slimy w-full px-0 border-0 border-b border-b-green-slimy rounded-none focus:outline-none"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {showPass ? (
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer`}
                        onClick={() => setShowPass(false)}
                      >
                        <FaEyeSlash />
                      </span>
                    ) : (
                      <span
                        className={`absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer`}
                        onClick={() => setShowPass(true)}
                      >
                        <FaEye />
                      </span>
                    )}
                  </div>
                  {formik.touched.password &&
                  Boolean(formik.errors.password) ? (
                    <small className="text-red-600">
                      {formik.touched.password && formik.errors.password}
                    </small>
                  ) : null}
                </div>
                {/* submit button */}
                <button
                  type="submit"
                  className="btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                >
                  <span>Sign In</span>
                  {isLoading ? (
                    <span
                      className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                      role="status"
                    ></span>
                  ) : null}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
