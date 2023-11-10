import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COItem from "./COItem.jsx";
import { setOrder } from "../../redux/add-order/addOrderSlice.js";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useGetRoomsAndHotelsQuery,
  useRoomNumbersQuery,
  useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import { useAddOrderMutation } from "../../redux/restaurant/foodAPI.js";
import toast from "react-hot-toast";
import Select from "react-select";
import { useOrderInventoryMutation } from "../../redux/inventory/inventoryAPI.js";

// form validation
const validationSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
  chooseHotel: yup.string().required("Hotel is required"),
});

const ConfirmOrder = () => {
  const { order, orderCalc } = useSelector((store) => store.inventorySlice);
  const closeRef = useRef();
  const [orderInventory] = useOrderInventoryMutation();
  const [selectedOption, setSelectedOption] = useState(null);
  const formik = useFormik({
    initialValues: {
      roomNumber: "",
      chooseHotel: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const obj = { ...order };
      const items = [...obj.items];

      const arr = items.map((item) => item._id);

      const response = await orderInventory({
        room_id: values.roomNumber,
        item_ids: arr,
      });

      if (response?.error) {
        toast.error(response.error.data.message);
      } else {
        closeRef.current.click();
        toast.success(response.data.message);
      }
    },
  });
  const dispatch = useDispatch();
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const { isLoading, data: rooms } = useRoomsQuery({
    id: formik.values.chooseHotel,
    cp: "0",
    filter: "",
    search: "",
  });

  const transformedRooms = rooms?.data?.docs?.map((room) => ({
    value: room._id,
    label: room.roomNumber,
  }));

  useEffect(() => {
    if (formik.values.roomNumber)
      dispatch(setOrder({ ...order, roomNumber: formik.values.roomNumber }));
  }, [formik.values.roomNumber]);

  return (
    <>
      <form autoComplete="off" method="dialog">
        <button
          ref={closeRef}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>

      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Assign Items</h3>
        <hr />
        <div className={`flex justify-between mt-5`}>
          <div className="flex flex-col gap-3">
            <select
              name="chooseHotel"
              className="input input-md h-10 bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
              value={formik.values.chooseHotel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Choose Hotel
              </option>

              {hotelList?.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </select>
            {formik.touched.chooseHotel &&
            Boolean(formik.errors.chooseHotel) ? (
              <small className="text-red-600">
                {formik.touched.chooseHotel && formik.errors.chooseHotel}
              </small>
            ) : null}
          </div>
          {formik.values.chooseHotel ? (
            <div className="flex flex-col gap-3">
              <Select
                placeholder="Select room"
                name={`roomNumber`}
                defaultValue={formik.values.roomNumber}
                options={transformedRooms}
                isSearchable
                onChange={(e) => formik.setFieldValue("roomNumber", e.value)}
                noOptionsMessage={() => "No room available"}
                classNames={{
                  control: (state) =>
                    `!input !input-md !h-4 !input-bordered !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none ${
                      state.isFocused ? "!shadow-none" : ""
                    }`,
                  valueContainer: () => "!p-0",
                  placeholder: () => "!m-0",
                }}
              />
              {formik.touched.roomNumber &&
              Boolean(formik.errors.roomNumber) ? (
                <small className="text-red-600">
                  {formik.touched.roomNumber && formik.errors.roomNumber}
                </small>
              ) : null}
            </div>
          ) : null}
        </div>
        {order.items.length ? (
          <div className="overflow-x-auto w-full mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Item</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((food, idx) => (
                  <COItem key={idx} idx={idx} food={food} />
                ))}
              </tbody>
              <tfoot className={`text-sm`}>
                <tr>
                  <td colSpan={5}>
                    <div className="mt-3">
                      <div className="flex">
                        <button
                          onClick={() => formik.handleSubmit()}
                          className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                        >
                          Assign Items
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
