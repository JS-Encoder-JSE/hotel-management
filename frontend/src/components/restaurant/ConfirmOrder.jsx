import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import COItem from "./COItem.jsx";
import { setOrder } from "../../redux/add-order/addOrderSlice.js";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRoomNumbersQuery } from "../../redux/room/roomAPI.js";

// form validation
const validationSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
});

const ConfirmOrder = () => {
  const formik = useFormik({
    initialValues: {
      roomNumber: "",
    },
    validationSchema,
    onSubmit: () => {
      console.log(order);
    },
  });
  const dispatch = useDispatch();
  const { isLoading, data: rooms } = useRoomNumbersQuery();
  const { order, orderCalc } = useSelector((store) => store.addOrderSlice);
  useEffect(() => {
    if (formik.values.roomNumber)
      dispatch(setOrder({ ...order, roomNumber: formik.values.roomNumber }));
  }, [formik.values.roomNumber]);

  return (
    <>
      <form autoComplete="off" method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Confirm Order</h3>
        <hr />
        <div className="flex flex-col gap-3 mt-5">
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
            {rooms?.data?.map((room) => (
              <option key={room?._id} value={room?._id}>
                {room?.roomNumber}
              </option>
            ))}
          </select>
          {formik.touched.roomNumber && Boolean(formik.errors.roomNumber) ? (
            <small className="text-red-600">
              {formik.touched.roomNumber && formik.errors.roomNumber}
            </small>
          ) : null}
        </div>
        {order.foods.length ? (
          <div className="overflow-x-auto w-full mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.foods.map((food, idx) => (
                  <COItem key={idx} idx={idx} food={food} />
                ))}
              </tbody>
              <tfoot className={`text-sm`}>
                <tr>
                  <td colSpan={5}>
                    <div className="mt-3">
                      <div className="pl-2 mb-4 w-[70%] text-md font-semibold">
                        <p className="flex justify-between">
                          Total Price : <span>{orderCalc.total}</span>
                        </p>
                        <p className="flex justify-between">
                          Tax : <span>{orderCalc.tax}</span>
                        </p>
                        <p className="flex justify-between">
                          Grand Total: <span>{orderCalc.grandTotal}</span>
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => formik.handleSubmit()}
                          className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <h3 className={`mt-10`}>Empty</h3>
        )}
      </div>
    </>
  );
};

export default ConfirmOrder;
