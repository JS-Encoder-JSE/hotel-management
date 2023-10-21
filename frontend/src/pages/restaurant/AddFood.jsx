import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle, FaUpload } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
  foodName: yup.string().required("Food name is required"),
  quantity: yup.string().required("Quantity is required"),
  price: yup.string().required("Price is required"),
  setMenu: yup.string().required("setMenu is required"),
  text: yup.string().required("text is required"),
  photo: yup.string().required("image is required"),
});

const AddFood = () => {
  const formik = useFormik({
    initialValues: {
      foodName: "",
      quantity: "",
      price: "",
      description: "",
      photo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`max-w-xl bg-white rounded-2xl mx-auto p-8`}>
      <h3 className={`text-2xl font-semibold mb-3`}>Add Food</h3>
      <hr />
      <form
        className="form-control grid grid-cols-1 gap-4 mt-5"
        onSubmit={formik.handleSubmit}
      >
        {/* name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Food name"
            name="name"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.foodName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.foodName && Boolean(formik.errors.foodName) ? (
            <small className="text-red-600">
              {formik.touched.foodName && formik.errors.foodName}
            </small>
          ) : null}
        </div>
        {/* age box */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quantity && Boolean(formik.errors.quantity) ? (
            <small className="text-red-600">
              {formik.touched.quantity && formik.errors.quantity}
            </small>
          ) : null}
        </div>
        {/* adult box */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Price"
            name="price"
            className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
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
        {/* photo box */}
        <div className="flex flex-col gap-3">
          <label className="relative input input-sm input-bordered border-gray-500/50 rounded  focus:outline-none p-2 h-auto bg-transparent">
            {formik.values.photo ? (
              formik.values.photo.name.substring(
                0,
                formik.values.photo.name.lastIndexOf("."),
              )
            ) : (
              <span className={`flex items-baseline space-x-1.5 `}>
                <FaUpload />
                <span>Choose photo</span>
              </span>
            )}
            <input
              type="file"
              name="photo"
              className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("photo", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.photo && Boolean(formik.errors.photo) ? (
            <small className="text-red-600">
              {formik.touched.photo && formik.errors.photo}
            </small>
          ) : null}
        </div>
        <div className="col-span-full flex flex-col gap-3">
          <textarea
            placeholder="Description"
            name="description"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && Boolean(formik.errors.description) ? (
            <small className="text-red-600">
              {formik.touched.description && formik.errors.description}
            </small>
          ) : null}
        </div>
        {/* button */}
        <div className={`flex justify-between`}>
          <button
            type={"submit"}
            className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
