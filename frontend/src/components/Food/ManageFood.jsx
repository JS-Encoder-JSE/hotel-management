import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaPlusCircle, FaUpload } from "react-icons/fa";


// form validation
const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    setMenu: yup.string().required("setMenu is required"),
    price: yup.string().required("Price is required"),
    category: yup.string().required("Category is required"),
    photos: yup.mixed().required("Photos are required"),
  });

const ManageFood = () => {
    const formik = useFormik({
        initialValues: {
          name: "",
          setMenu: "",
          category:"",
          price: "",
          photos: null,
          
        },
        validationSchema,
        onSubmit: (values) => {
          console.log(values);
        },
      });
  return (
    <div className="">
      <div>
        <h2 className="text-center text-3xl ">Manage Food</h2>
      </div>

      <div className="mt-5">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
            className="w-[600px]"
              src="https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Manage The Food Item</h2>

            <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        {/* Name box */}

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Food Name"
            name="name"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && Boolean(formik.errors.name) ? (
            <small className="text-red-600">
              {formik.touched.name && formik.errors.name}
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
        
         {/* category box */}
  <div className="flex flex-col gap-3">
          <select
            name="category"
            className="select select-sm select-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Category
            </option>
            <option value="Available">Available</option>
            <option value="notAvailable">Not Available</option>
            <option value="NewItem">New Item</option>
          </select>
          {formik.touched.category && Boolean(formik.errors.category) ? (
            <small className="text-red-600">
              {formik.touched.category && formik.errors.category}
            </small>
          ) : null}
        </div>
             
              {/* <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Floor Number"
            name="floorNumber"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.floorNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.floorNumber && Boolean(formik.errors.floorNumber) ? (
            <small className="text-red-600">
              {formik.touched.floorNumber && formik.errors.floorNumber}
            </small>
          ) : null}
        </div> */}
        
        {/* Quantity box */}
        {/* <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quantity && Boolean(formik.errors.quantity) ? (
            <small className="text-red-600">
              {formik.touched.quantity && formik.errors.quantity}
            </small>
          ) : null}
        </div> */}
      
    
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
        {/* submit button */}
        <button
          type="submit"
          className="col-span-full btn btn-sm w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
        >
         Submit
        </button>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFood;
