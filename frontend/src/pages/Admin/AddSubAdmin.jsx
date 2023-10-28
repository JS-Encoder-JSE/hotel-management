import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Sub Admin Name is required"),
  address: yup.string().required("Sub Admin Address is required"),
  email: yup.string().required("Sub Admin Email is required"),
  phoneNumber: yup.string().required("Sub Admin Phone Number size is required"),
  salary: yup.string().required("Sub Admin Salary is required"),
  joiningdate: yup.string().required("Sub Admin Joining Date is required"),
});

const AddSubAdmin = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      salary: "",
      joiningdate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`space-y-10`}>
      <div className="card bg-white shadow-xl">
        <div className="card-body p-4">
          <h2 className={`text-3xl max-w-xs`}>Add Sub Admin</h2>
          <hr className={`my-5`} />
        </div>

        <div className="max-auto">
          <form
            className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
            onSubmit={formik.handleSubmit}
          >
            {/* Sub Admin Name box */}
            <div className="flex flex-col gap-3">
              <label>
                {" "}
                Sub Admin Name <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Sub Admin Name"
                name="name"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && Boolean(formik.errors.name) ? (
                <small className="text-red-600">
                  {formik.touched.name && formik.errors.name}
                </small>
              ) : null}
            </div>
            {/* Sub Admin Address box */}
            <div className="flex flex-col gap-3">
              <label>
                {" "}
                Sub Admin Address <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Sub Admin Address "
                name="address"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.address && Boolean(formik.errors.address) ? (
                <small className="text-red-600">
                  {formik.touched.address && formik.errors.address}
                </small>
              ) : null}
            </div>
            {/*Sub Admin Email box */}
            <div className="flex flex-col gap-3">
              <label>
                {" "}
                Sub Admin Email <span>*</span>
              </label>
              <input
                type="email"
                placeholder="Sub Admin Email @ "
                name="email"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && Boolean(formik.errors.email) ? (
                <small className="text-red-600">
                  {formik.touched.email && formik.errors.email}
                </small>
              ) : null}
            </div>

            {/*Sub Admin Phone Number  box */}
            <div className="flex flex-col gap-3">
              <label>
                {" "}
                Sub Admin Phone Number <span>*</span>
              </label>
              <input
                type="number"
                placeholder="Sub Admin Phone Number #"
                name="phoneNumber"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber &&
              Boolean(formik.errors.phoneNumber) ? (
                <small className="text-red-600">
                  {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </small>
              ) : null}
            </div>

            {/*Sub Admin salary  box */}
            <div className="flex flex-col gap-3">
              <label>
                {" "}
                Sub Admin Salary <span>*</span>
              </label>
              <input
                type="number"
                placeholder="Sub Admin Salary"
                name="salary"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
                value={formik.values.joiningdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.salary && Boolean(formik.errors.salary) ? (
                <small className="text-red-600">
                  {formik.touched.salary && formik.errors.salary}
                </small>
              ) : null}
            </div>
            {/*Sub Admin Joining Date  box */}
            <div className="flex flex-col gap-3">
              <label>
                {" "}
                Joining Date <span>*</span>
              </label>
              <input
                type="date"
                placeholder="Sub Admin Joining"
                name="joiningdate"
                className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy max-w-xs"
                value={formik.values.joiningdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.joiningdate &&
              Boolean(formik.errors.joiningdate) ? (
                <small className="text-red-600">
                  {formik.touched.joiningdate && formik.errors.joiningdate}
                </small>
              ) : null}
            </div>

            {/* submit button */}
            <div className=" col-span-full text-end mb-5 ">
              <button
                type="submit"
                className=" btn btn-sm  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case max-w-xs px-9 h-auto md:me-12"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubAdmin;
