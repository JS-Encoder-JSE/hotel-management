import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { getformatDateTime } from '../../utils/utils';
import { GrUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { BiRupee } from "react-icons/bi";

// form validation
const validationSchema = yup.object({
    // date: yup.string().required("Date is required"),
    itemName: yup.string().required("Name is required"),
    quantity: yup.string().required("Quantity is required"),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be a positive number")
      .integer("Price must be an integer"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description at least 10 characters length"),
    // hotel_id: yup.string().required("Choose hotel is required"),
  });
  


const AddExpense = () => {

    const { user } = useSelector((store) => store.authSlice);
    
// lodading
    const [isLoading, setLoading] = useState(false);

// set total items
    const [totalItems,setTotalItems]=useState([])

// edit item
    const [editIndex, setEditIndex] = useState(null);

    // update button toggle
    const [isUpadet, setUpdate] = useState(false);


    console.log(totalItems,"items---------")

    const totalExpense =[...totalItems]



    const formik = useFormik({
        initialValues: {
          date: new Date(),
          itemName: "",
          quantity: "",
          price: "",
          description: "",
        },
        validationSchema,
        onSubmit: async (values, formikHelpers) => {
            setLoading(true);
          
            const obj = { ...values };
            console.log(obj.date)
          
            if (editIndex !== null) {
              // Update existing item
              setTotalItems((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[editIndex] = obj;
                return updatedItems;
              });
              setEditIndex(null);
            } else {
              // Add new item
              setTotalItems((prevItems) => [...prevItems, obj]);
            }
          
            formik.resetForm();
            setLoading(false);
            setUpdate(false)
          },
      });


      // handle edit each item

    
    //   // Image delete
    //   const handleDelete = (idx) => {
    //     const tempImgs = [
    //       ...selectedImages.slice(0, idx),
    //       ...selectedImages.slice(idx + 1),
    //     ];
    //     const dataTransfer = new DataTransfer();
    
    //     for (const file of tempImgs) {
    //       dataTransfer.items.add(file);
    //     }
    
    //     formik.setFieldValue("photos", dataTransfer.files);
    //     setSelectedImages(tempImgs);
    //   };
    
    //   // HandleChange
    //   const handleChange = (idx, newFile) => {
    //     const updatedImages = [...selectedImages];
    //     updatedImages[idx] = newFile;
    
    //     const dataTransfer = new DataTransfer();
    
    //     for (const file of updatedImages) {
    //       dataTransfer.items.add(file);
    //     }
    
    //     formik.setFieldValue("photos", dataTransfer.files);
    //     setSelectedImages(updatedImages);
    //   };
    
    //   // Update Image
    //   useEffect(() => {
    //     if (formik.values.photos) {
    //       const selectedImagesArray = Array.from(formik.values.photos);
    //       setSelectedImages(selectedImagesArray);
    //     }
    //   }, [formik.values.photos]);


// handle update
    const handleEdit = (index) => {
    const itemToEdit = totalItems[index];
    formik.setValues({ ...itemToEdit });
    setEditIndex(index);
    setUpdate(true)
  };
  




// handle delete each item
    const handleDelete = (index) => {
        setTotalItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems.splice(index, 1);
          return updatedItems;
        });
      };

      

// total calculation
 const calculateTotal = () => {
        return totalItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
      };

    return (
        <div>
          <div className={`space-y-10`}>
        <div className="card bg-white shadow-xl">
          <div className="card-body">
          <div>
              <Link to={`/dashboard `}>
                <button
                  type="button"
                  className="text-white bg-green-slimy  font-medium rounded-lg text-sm p-2.5 text-center inline-flex me-2 gap-1 "
                >
                    <dfn>
                      <abbr title="Back"><FaArrowLeft /></abbr>
                    </dfn>
                 
                  <span className="tracking-wider font-semibold text-[1rem]"></span>
                </button>
              </Link>
            </div>
            {/* add Expense */}
            <div className="w-full">
              <h3
                className={`flex bg-green-slimy text-2xl text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7`}
              >
                <FaPlusCircle />
                <span>Add Expense</span>
              </h3>
            </div>
            <div>
          {totalItems?.length ?  <div className="overflow-x-auto overflow-y-auto h-56 max-w-[50rem] mx-auto mt-10">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  {/* <th>Booking Number</th> */}
                  <th>Date</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th className='text-center'>Action</th>
                  {/*<th>Deposit By</th>*/}
                </tr>
              </thead>
            { totalExpense?.length && <tbody>
                {totalExpense.map((item, idx) => {
                  return (
                    <tr
                    key={idx}
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>{getformatDateTime(item?.date)}</td>
                      <td>{item?.itemName}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
                      <td className={`flex flex-wrap gap-1.5`}>
                    <span
                    onClick={() => handleEdit(idx-1)}
                      className={`btn btn-md bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                      title={`Edit`}
                    >
                      <FaEdit />
                    </span>
                    <span
                     onClick={() => handleDelete(idx-1)}
                      className="btn btn-md bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                      title={`Cancel`}
                    >
                      <FaTrash />
                    </span>
                  </td>
                    </tr>
                  );
                })}
              </tbody>}
              <tfoot className={`text-xl font-bold`}>
                <tr>
                  <td colSpan={5} className={`text-end text-md font-bold`}>
                    Total
                  </td>
                  <td>$ {calculateTotal()}</td>
                </tr>
              </tfoot>
            </table>
          </div>:""}
            </div>
            <form
              autoComplete="off"
              className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full mx-auto"
              onSubmit={formik.handleSubmit}
            >
                {/* Date */}
          <div className="flex flex-col gap-3">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="date"
              placeholderText={`Date`}
              selected={formik.values.date || new Date()}
              className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
              onChange={(date) => formik.setFieldValue("date", date)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.from && Boolean(formik.errors.date) ? (
              <small className="text-red-600">
                {formik.touched.date && formik.errors.date}
              </small>
            ) : null}
          </div> 

             <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Item Name"
                  name="itemName"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  value={formik.values.itemName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && Boolean(formik.errors.itemName) ? (
                  <small className="text-red-600">
                    {formik.touched.itemName && formik.errors.itemName}
                  </small>
                ) : null}
              </div>

             <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Quantity"
                  name="quantity"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && Boolean(formik.errors.quantity) ? (
                  <small className="text-red-600">
                    {formik.touched.quantity && formik.errors.quantity}
                  </small>
                ) : null}
              </div>
              {/* price box */}
              <div className="flex flex-col gap-3">
                <input
                onWheel={ event => event.currentTarget.blur() }
                  type="number"
                  placeholder="Price"
                  name="price"
                  className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
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
              <div className="col-span-full flex flex-col gap-3">
                <textarea
                  placeholder="Description"
                  name="description"
                  className="textarea textarea-md bg-transparent textarea-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy resize-none w-full"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description &&
                Boolean(formik.errors.description) ? (
                  <small className="text-red-600">
                    {formik.touched.description && formik.errors.description}
                  </small>
                ) : null}
              </div>


              <div className="flex flex-col gap-3">
               {/* <p className='text-xl font-bold text-gray-400'>Grand Total :- {calculateTotal()}</p> */}
              </div>

              {isUpadet?
              <div className="flex flex-col-3 justify-end">
                <button
                  type="submit"
                  className=" flex justify-center items-center btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
                >
                     {/* <FaPlusCircle className='text-xl' /> */}
                     <RxUpdate className='text-white text-xl hover:text-black font-bold' />
                  <span>Update Item</span>
                  {isLoading ? (
                    <span
                      className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                      role="status"
                    ></span>
                  ) : null}
                </button>
              </div> : <div className="flex flex-col-3 justify-end">
                <button
                  type="submit"
                  className=" flex justify-center items-center btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
                >
                     <FaPlusCircle className='text-xl' />
                  <span>Add</span>
                  {isLoading ? (
                    <span
                      className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                      role="status"
                    ></span>
                  ) : null}
                </button>
              </div>}

              
            </form>
            {/* submit button */}
            <div className=" mx-auto">
                <button
                  
                  disabled={totalItems.length? false : true}
                  className=" btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
                >
                  <span>Submit</span>
                  {isLoading ? (
                    <span
                      className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                      role="status"
                    ></span>
                  ) : null}
                </button>
              </div>
           
          </div>
        </div>
      </div>
        </div>
    );
};

export default AddExpense;