import { useFormik } from "formik";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useUpdateInventoryMutation } from "../../redux/inventory/inventoryAPI.js";

// form validation
const validationSchema = yup.object({
  itemName: yup.string().required("Name is required"),
  itemDescription: yup
    .string()
    .required("Description is required")
    .min(20, "Description at least 20 characters length"),
  ItemQuantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),
});

const EditInventory = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [updateInventory] = useUpdateInventoryMutation()
  const formik = useFormik({
    initialValues: {
      itemName: "",
      itemDescription: "",
      ItemQuantity: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await updateInventory({id, values})

      console.log(response)

      // if (response?.error) {
      //   toast.error(response.error.data.message);
      // } else {
      //   toast.success(response.data.message);
      //   formikHelpers.resetForm();
      // }
    },
  });

  return (
    <div className={`space-y-10 bg-white p-10 rounded-2xl`}>
      <div
        className={`flex justify-between bg-green-slimy max-w-3xl mx-auto py-3 px-6 rounded`}
      >
        <h3 className={`flex text-2xl text-white space-x-1.5`}>
          <FaPencil />
          <span>Edit Item</span>
        </h3>
        <div
          className={`flex hover:text-white hover:bg-transparent border border-white items-center space-x-1.5 bg-white text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
      </div>
      <form autoComplete="off"
        className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        {/* Item Name */}
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Item Name"
            name="itemName"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.itemName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.itemName && Boolean(formik.errors.itemName) ? (
            <small className="text-red-600">
              {formik.touched.itemName && formik.errors.itemName}
            </small>
          ) : null}
        </div>
        {/* Item Quantity */}
        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Item Quantity"
            name="ItemQuantity"
            className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
            value={formik.values.ItemQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ItemQuantity &&
          Boolean(formik.errors.ItemQuantity) ? (
            <small className="text-red-600">
              {formik.touched.ItemQuantity && formik.errors.ItemQuantity}
            </small>
          ) : null}
        </div>
        <div className="col-span-full flex flex-col gap-3">
          <textarea
            placeholder="Item Description"
            name="itemDescription"
            className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
            value={formik.values.itemDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.itemDescription &&
          Boolean(formik.errors.itemDescription) ? (
            <small className="text-red-600">
              {formik.touched.itemDescription && formik.errors.itemDescription}
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

export default EditInventory;
