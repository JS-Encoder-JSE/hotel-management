import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/room/ConfirmOrder.jsx";

// form validation
const validationSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
});

const AddOrder = () => {
  const formik = useFormik({
    initialValues: {
      roomNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div
        className={`flex flex-col-reverse sm:flex-row gap-3 sm:justify-between`}
      >
        <div className="flex flex-col gap-3">
          <select
            name="roomNumber"
            className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
            value={formik.values.roomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled>
              Room Number
            </option>
            <option value={101}>101</option>
            <option value={102}>102</option>
            <option value={103}>103</option>
          </select>
          {formik.touched.roomNumber && Boolean(formik.errors.roomNumber) ? (
            <small className="text-red-600">
              {formik.touched.roomNumber && formik.errors.roomNumber}
            </small>
          ) : null}
        </div>
        <div className={`flex space-x-1.5`}>

          {/* modal */}
          <button onClick={() => window.fp_modal.showModal()}
            type={`button`}
            className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case "
          >
            Confirm Order
          </button>
          <input type="checkbox" id="my_modal_6" className="modal-toggle " />
          <div className="modal ">
            <div className="modal-box">
              <div className={` space-y-10 `}>
                <div className={`bg-white px-10 py-5 rounded `}>
                  <h3 className={`text-xl font-semibold`}>Order</h3>
                  <hr className={`my-5`} />
                  <div className={`space-y-10`}>
                    <div className={`flex justify-between`}></div>
                    <div className="overflow-x-auto w-full">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(+formik.values.entries || 2)].map(
                            (_, idx) => {
                              return (
                                <tr
                                // className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                                >
                                  <th>{++idx}</th>
                                  <td>programe</td>
                                  <td>104</td>
                                  <td>
                                    <span className={`border p-2`}>+</span>
                                    <span className={`border px-5 py-2`}></span>
                                    <span className={`border p-2`}>-</span>
                                  </td>
                                  <td>120</td>

                                  <td className={`space-x-1.5`}>
                                    <span
                                      className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                                    >
                                      <FaFileInvoice />
                                    </span>
                                  </td>
                                </tr>
                              );
                            },
                          )}
                        </tbody>
                        <tfoot className={`text-sm`}>
                          <tr>
                            <td colSpan={5} className={`text-end`}>
                              <div className="card  bg-white-300 shadow-xl">
                                <div className="card-body text-center max-auto">
                                  <h2 className="card-title underline">
                                    Cart{" "}
                                  </h2>
                                  <p>Total Price : $120</p>
                                  <p>Tax : $20</p>
                                  <p>Grand Total: $140</p>
                                  <div>
                                    <button className="btn bg-green-400">
                                      Clear cart
                                    </button>
                                    <button className="btn bg-green-400">
                                      CheckOut
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">
                  Close!
                </label>
              </div>
            </div>
          </div>
          <Modal id={`fp_modal`}>
            <ConfirmOrder />
          </Modal>
          {/* modal */}

          <input
            type="text"
            placeholder="Search by food name..."
            name="search"
            className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <FoodLists />
    </div>
  );
};

export default AddOrder;
