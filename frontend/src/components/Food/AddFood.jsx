import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle, FaUpload } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
  foodName: yup.string().required("Food Name is required"),
  quantity: yup.string().required("Qunatity is required"),
  price: yup.string().required("Price is required"),
  setMenu: yup.string().required("setMenu is required"),
  text: yup.string().required("text is required"),
  photos: yup.string().required("image is required"),
});

const AddFood = () => {
  const formik = useFormik({
    initialValues: {
      foodName: "",
      quantity: "",
      price: "",
      setMenu: "",
      text: "",
      photos: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`space-y-10`}>
      <form
        className="form-control gap-4 max-w-[672px]  mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="card bg-white shadow-xl ">
          <div className="card-body">
            <h2 className="text-[1.5rem] ">Add Food</h2>
            <hr className="mb-9" />

            <div>
              {/* Name */}
              <div className={`flex space-x-1.5`}>
                <h3 className="mt-3 ms-10">
                  Name <span className="text-red-400 ">*</span>
                </h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Name of Food"
                    name="foodName"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy ms-9 mb-4 w-[353px]"
                    value={formik.values.foodName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.foodName &&
                  Boolean(formik.errors.foodName) ? (
                    <small className="text-red-600">
                      {formik.touched.foodName && formik.errors.foodName}
                    </small>
                  ) : null}
                </div>
              </div>

              {/* Quantity */}
              <div className={`flex space-x-1.5`}>
                <h2 className="mt-3 ms-5">
                  Quantity <span className="text-red-400">*</span>
                </h2>

                <div className="flex flex-col gap-3">
                  <input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy ms-9 mb-5 w-[352px] "
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.quantity &&
                  Boolean(formik.errors.quantity) ? (
                    <small className="text-red-600">
                      {formik.touched.quantity && formik.errors.quantity}
                    </small>
                  ) : null}
                </div>
              </div>

              {/* price */}
              <div className={`flex space-x-1.5`}>
                <h3 className="mt-3 ms-12">
                  Price <span className="text-red-400">*</span>
                </h3>
                <div className="flex flex-col gap-3 ">
                  <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy ms-9 w-[355px]"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.price && Boolean(formik.errors.price) ? (
                    <small className="text-red-600">
                      {formik.touched.price && formik.errors.price}
                    </small>
                  ) : null}
                </div>
              </div>

              {/* setMenu box */}
              <div className={`flex space-x-1.5`}>
                <h3 className="mt-7 ms-4">
                  set-Menu <span className="text-red-400">*</span>
                </h3>
                <div className="flex flex-col gap-3 mt-4">
                  <select
                    name="setMenu"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy ms-9 w-[356px]"
                    value={formik.values.setMenu}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" selected disabled>
                      Set Menu
                    </option>
                    <option value="menu1:1">1:1</option>
                    <option value="menu1:2">1:2</option>
                    <option value="menu1:3">1:3</option>
                    <option value="menu2:2">2:2</option>
                  </select>
                  {formik.touched.setMenu && Boolean(formik.errors.setMenu) ? (
                    <small className="text-red-600">
                      {formik.touched.setMenu && formik.errors.setMenu}
                    </small>
                  ) : null}
                </div>
              </div>

              {/* Image*/}
              <div className={`flex items-center space-x-1.5`}>
                <h3 className="ms-9">
                  Image <span className="text-red-400 me-3">*</span>
                </h3>
                <div className="flex flex-col gap-3 mt-4 mb-4">
                  <label className="relative input input-sm input-bordered border-green-slimy rounded  focus:outline-none w-[356px] ms-6 p-2 h-auto bg-transparent">
                    {formik.values.photos ? (
                      <span>{formik.values.photos.length + " files"}</span>
                    ) : (
                      <span
                        className={`flex items-baseline space-x-1.5 w-[310px] `}
                      >
                        <FaUpload />
                        <span>Choose photos</span>
                      </span>
                    )}
                    <input
                      type="file"
                      multiple
                      name="photos"
                      className="absolute left-0 top-0 h-0 overflow-hidden input input-md "
                      onChange={(e) =>
                        formik.setFieldValue("photos", e.currentTarget.files)
                      }
                      onBlur={formik.handleBlur}
                    />
                  </label>
                  {formik.touched.photos && Boolean(formik.errors.photos) ? (
                    <small className="text-red-600">
                      {formik.touched.photos && formik.errors.photos}
                    </small>
                  ) : null}
                </div>
              </div>

              {/* Description box */}
              <div className={`flex space-x-1.5`}>
                <h3 className="mt-3">
                  Description <span className="text-red-400 ">*</span>
                </h3>
                <div className="flex flex-col gap-3 w-1/2">
                  <textarea
                    placeholder="Description"
                    name="text"
                    className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-[355px] ms-9 resize-none"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.text && Boolean(formik.errors.text) ? (
                    <small className="text-red-600">
                      {formik.touched.text && formik.errors.text}
                    </small>
                  ) : null}
                </div>
              </div>

              {/* submit button */}
              <div className="flex mt-3 justify-end ">
                <div className="">
                  <button
                    type="submit"
                    className="btn btn-sm  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case mt-4"
                  >
                    Add Food
                  </button>
                </div>
                {/* <div>
                  <button
                    type="submit"
                    className="btn btn-sm  bg-sky-700 hover:bg-transparent text-white px-6 rounded hover:text-sky-300 normal-case mt-4"
                  >
                    Reset
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
