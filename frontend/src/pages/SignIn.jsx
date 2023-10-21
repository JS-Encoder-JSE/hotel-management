import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import useAuth from "../hooks/useAuth.js";
import imgAbstractSI from "../assets/bg-abstract-signin.svg";

// sign in form validation
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      signIn(values).then((response) => {
        if (response) {
          navigate("dashboard");
          toast.success("Sign In Successfully!", {
            duration: 5000,
          });
        } else {
          toast.error("Sign In Unsuccessfully!");
        }
      });
    },
  });

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
                <p>Sign in Using Your Email Address</p>
              </div>
              <form
                className="form-control gap-y-4"
                onSubmit={formik.handleSubmit}
              >
                {/* email box */}
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="input input-sm bg-transparent text-green-slimy w-full px-0 border-0 border-b border-b-green-slimy rounded-none focus:outline-none"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && Boolean(formik.errors.email) ? (
                    <small className="text-red-600">
                      {formik.touched.email && formik.errors.email}
                    </small>
                  ) : null}
                </div>
                {/* password box */}
                <div className="flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="input input-sm bg-transparent text-green-slimy w-full px-0 border-0 border-b border-b-green-slimy rounded-none focus:outline-none"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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
                  Sign In
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
