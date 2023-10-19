import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle,FaUpload } from "react-icons/fa";

// form validation
const validationSchema = yup.object({
    foodName: yup.string().required("Food Name is required"),
    foodQuantity: yup.string().required("Qunatity is required"),
    price: yup.string().required("Price is required"),
    setMenu: yup.string().required("setMenu is required"),
    text: yup.string().required("text is required"),
    image: yup.string().required("image is required"),
  


});

const AddFood = () => {
  const formik = useFormik({
    initialValues: {
      foodName: "",
      qunatity:"",
      price: "",
      setMenu: "",
      text: "",
      image: "",
     
      
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`space-y-10`}>
      <h3
        className={`flex bg-green-slimy text-2xl text-white max-w-3xl mx-auto py-3 px-6 rounded space-x-1.5`}
      >
        <FaPlusCircle />
        <span>Add Food</span>
      </h3>
      <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >

         {/* Food Name box */}
         <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name of Food"
            name="foodName"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
        
         {/* qunatity box */}
         <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Food of Qunatity"
            name="foodQuantity"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.foodQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.foodQuantity && Boolean(formik.errors.foodQuantity) ? (
            <small className="text-red-600">
              {formik.touched.foodQuantity && formik.errors.foodQuantity}
            </small>
          ) : null}
        </div>


           {/* price box */}
           <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
        {/* setMenu box */}
        <div className="flex flex-col gap-3">
          <select
            name="setMenu"
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
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
       
     
     {/* room photos */}
     <div className="flex flex-col gap-3">
          <label className="relative input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none">
            {formik.values.photos ? (
              <span>{formik.values.photos.length + " files"}</span>
            ) : (
              <span className={`flex items-baseline space-x-1.5`}>
                <FaUpload />
                <span>Choose photos</span>
              </span>
            )}
            <input
              type="file"
              multiple
              name="photos"
              className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
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

         {/* Description box */}
         <div className="flex flex-col gap-3">
          <textarea
            type="text"
            placeholder="Description"
            name="text"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
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
       
        {/* submit button */}
        <button
          type="submit"
          className="btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFood;
