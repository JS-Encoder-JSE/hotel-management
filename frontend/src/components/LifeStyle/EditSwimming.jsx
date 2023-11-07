import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { useAddInventoryMutation } from "../../redux/inventory/inventoryAPI.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";

// form validation
const validationSchema = yup.object({
  poolName: yup.string().required("Pool Name  is required"),
  itemDescription: yup
    .string()
    .required("Description is required")
    .min(20, "Description at least 20 characters length"),
    surveyorQuantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),
    ItemPrice: yup.string().required("Price is required"),
    typeOfAlcohol: yup.string().required("Type Of Alcohol is required"),
});

const EditSwimming = () => {
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      brandName: "",
      typeOfAlcohol: "",
      itemDescription: "",
      surveyorQuantity: "",
      ItemPrice: "",
     
    },
    validationSchema,
    onSubmit: (values) => {
        console.log(values);
      },
  });

  return (
    <div className={`space-y-10 bg-white p-10 rounded-2xl`}>
  <div
        className={`flex justify-between bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded`}
      >
        <h3 className={`flex text-2xl text-white space-x-1.5`}>
          <FaPencil />
          <span>Update Swimming Pool</span>
        </h3>
        <div
          className={`flex hover:text-white hover:bg-transparent border border-white items-center space-x-1.5 bg-white text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
      </div>
      <form
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        {/*Name box */}
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Guest Name"
            name="name"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
        {/*Room Number box */}
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Room Number"
            name="roomNumber"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.roomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.roomNumber && Boolean(formik.errors.roomNumber) ? (
            <small classroomNumber="text-red-600">
              {formik.touched.roomNumber && formik.errors.roomNumber}
            </small>
          ) : null}
        </div>
        {/* Pool Name  */}
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Pool Name"
            name="poolName"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.poolName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.poolName && Boolean(formik.errors.poolName) ? (
            <small className="text-red-600">
              {formik.touched.poolName && formik.errors.poolName}
            </small>
          ) : null}
        </div>
        {/* Type Of Name */}
        <div className="flex flex-col gap-3">
                <select
                  name="typeOfName"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  value={formik.values.typeOfName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" selected disabled>
                    Type Of Name
                  </option>
                  <option value="CommercialSwimmigPools ">Commercial Swimmig Pools</option>
                  <option value="ResidentialSwimmingPools">Residential Swimming Pools</option>
                  <option value="CompetitionPools">Competition Pools</option>
                  <option value="IndoorSwimmingPools"> Indoor Swimming Pools</option>
                  <option value="OutdoorPools">Outdoor Pools </option>
                </select>
                {formik.touched.typeOfName && Boolean(formik.errors.typeOfName) ? (
                  <small className="text-red-600">
                    {formik.touched.typeOfName && formik.errors.typeOfName}
                  </small>
                ) : null}
              </div>
        {/* Status */}
        {/* <div className="flex flex-col gap-3">
                <select
                  name="status"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" selected disabled>
                    Status
                  </option>
                  <option value=" Active">Active</option>
                  <option value="InActive">InActive </option>
                  <option value="Bookded"> Bookded</option>
                  <option value="UnderMaintenence">Under Maintenence</option>
                </select>
                {formik.touched.status && Boolean(formik.errors.status) ? (
                  <small className="text-red-600">
                    {formik.touched.status && formik.errors.status}
                  </small>
                ) : null}
              </div> */}
        {/* Pool Name Select */}
        {/* <div className="flex flex-col gap-3">
                <select
                  name="poolSelect"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  value={formik.values.poolSelect}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" selected disabled>
                   Select Pool
                  </option>
                  <option value=" DolphinSwimming">Dolphin Swimming</option>
                  <option value="RoyalPools"> Royal Pools</option>
                  <option value="NeptunePool"> Neptune Pool</option>
                </select>
                {formik.touched.status && Boolean(formik.errors.status) ? (
                  <small className="text-red-600">
                    {formik.touched.status && formik.errors.status}
                  </small>
                ) : null}
              </div> */}

      
        {/* Capacity*/}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Capacity"
            name="capacity"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.capacity &&
          Boolean(formik.errors.capacity) ? (
            <small className="text-red-600">
              {formik.touched.capacity && formik.errors.capacity}
            </small>
          ) : null}
        </div>
       
        {/* Item Price */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Price"
            name="ItemPrice"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.ItemPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ItemPrice &&
          Boolean(formik.errors.ItemPrice) ? (
            <small className="text-red-600">
              {formik.touched.ItemPrice && formik.errors.ItemPrice}
            </small>
          ) : null}
        </div>
          {/* From Date */}
          {/* <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="From  MM/DD/YYY"
            name="fromDate"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            onBlur={(e) => {
              e.target.type = "text";
              formik.handleBlur;
            }}
            onFocus={(e) => (e.target.type = "date")}
          />
          {formik.touched.fromDate && Boolean(formik.errors.fromDate) ? (
            <small className="text-red-600">
              {formik.touched.fromDate && formik.errors.fromDate}
            </small>
          ) : null}
        </div> */}
        {/* To box */}
        {/* <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="To  MM/DD/YYY"
            name="toDate"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.toDate}
            onChange={formik.handleChange}
            onBlur={(e) => {
              e.target.type = "text";
              formik.handleBlur;
            }}
            onFocus={(e) => (e.target.type = "date")}
          />
          {formik.touched.toDate && Boolean(formik.errors.toDate) ? (
            <small className="text-red-600">
              {formik.touched.toDate && formik.errors.toDate}
            </small>
          ) : null}
        </div> */}
         {/* Hour Price */}
         {/* <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Hour Of Swimming Pool"
            name="hourOfSwimmingPool"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.hourOfSwimmingPool}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hourOfSwimmingPool &&
          Boolean(formik.errors.hourOfSwimmingPool) ? (
            <small className="text-red-600">
              {formik.touched.hourOfSwimmingPool && formik.errors.hourOfSwimmingPool}
            </small>
          ) : null}
        </div> */}
        
        {/* Pool Details */}
        <div className="col-span-full flex flex-col gap-3">
          <textarea
            placeholder="Pool Details......."
            name="remarks"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
            value={formik.values.remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.remarks &&
          Boolean(formik.errors.remarks) ? (
            <small className="text-red-600">
              {formik.touched.remarks && formik.errors.remarks}
            </small>
          ) : null}
        </div>
        {/* submit button */}
        <div className=" col-span-full text-end mt-5 ">
          <button
            type="submit"
            className=" btn btn-md  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSwimming;
