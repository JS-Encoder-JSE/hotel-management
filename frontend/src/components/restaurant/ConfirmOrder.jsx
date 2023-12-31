import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png"
import COItem from "./COItem.jsx";
import {
  resetFoodOrder,
  setOrder,
} from "../../redux/add-order/addOrderSlice.js";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useGetRoomsAndHotelsQuery,
  useRoomNumbersQuery,
  useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import toast from "react-hot-toast";
import { useAddOrderMutation } from "../../redux/restaurant/foodAPI.js";
import Select from "react-select";
import FoodList from "./FoodList.jsx";
import { useReactToPrint } from "react-to-print";
import RestaurantPDF from "../../pages/restaurant/RestaurantPDF.jsx";

// current year
const currentYear = new Date().getFullYear();
// form validation
const validationSchema = yup.object({
  roomNumber: yup.string().required("Room number is required"),
  chooseHotel: yup.string().required("Hotel is required"),
});

const ConfirmOrder = ({selectRoomId,selectTableId}) => {
  const componentRef = useRef();
  const closeRef = useRef();
  const [success, setSuccess] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const { order, orderCalc } = useSelector((store) => store.addOrderSlice);
  const formik = useFormik({
    initialValues: {
      roomNumber: "",
      chooseHotel: "",
    },
    validationSchema,
    onSubmit: async (values) => {
    },
  });
  const handlePlaceOrder = async () => {
    const obj = { ...order };
    const items = [...obj.foods];

    const arr = items.map((item) => ({
      item: item.food_name,
      price: item.price,
      serveyor_quantity: item.serveyor_quantity,
      quantity: item.quantity,
      total: item.quantity * item.price,
    }));
    const orderForRoom = {
      room_id: obj.roomId,
      items: arr,
      paid_amount: 0,
      current_order: false,
    };
    const orderForTable = {
      table_id: obj.tableId,
      items: arr,
      paid_amount: 0,
      current_order: true,
    };
    const response = await addOrder(
      obj.tableId.length
        ? orderForTable
        : obj.roomId.length
        ? orderForRoom
        : null
    );
    if (response?.error) {
      toast.error(response.error.data.message);
    } else {
      dispatch(resetFoodOrder());
      // closeRef.current.click();
      // toast.success(response.data.message);
      setSuccess(response?.data?.data);
    }
  };
  const { isLoading, data: rooms } = useRoomsQuery({
    id: formik.values.chooseHotel,
    cp: "0",
    filter: "",
    search: "",
    limit: 1000000,
  });
  const { data: hotelList } = useGetRoomsAndHotelsQuery();

  useEffect(() => {
    if (formik.values.roomNumber) dispatch(setOrder({ ...order }));
  }, [formik.values.roomNumber]);

  // const transformedRooms = rooms?.data?.docs?.map((room) => ({
  //   value: room._id,
  //   label: room.roomNumber,
  // }));
 const [isheaderHide,setHeaderHide]=useState(false)
  const handlePrint = useReactToPrint({
    content: () =>componentRef.current
  })



 // Call multiple functions here
 const handleButtonClick = () => {
  // Call multiple functions here
  setHeaderHide(true);

  // Introduce a delay before calling handlePrint
  setTimeout(() => {
      handlePrint();
  }, 1000); // Replace 1000 with the desired delay in milliseconds
};

  // current date
  const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

  return (
    <>
      <form autoComplete="off" method="dialog">
        <button
          ref={closeRef}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setSuccess(null)}
        >
          ✕
        </button>
      </form>
      {!success ? (
        <div>
          <h3 className={`text-2xl font-semibold mb-3`}>Confirm Order</h3>
          <hr />
          {/*<div className={`flex justify-between mt-5`}>*/}
          {/*  <div className="flex flex-col gap-3">*/}
          {/*    <select*/}
          {/*      name="chooseHotel"*/}
          {/*      className="input input-md h-10 bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"*/}
          {/*      value={formik.values.chooseHotel}*/}
          {/*      onChange={formik.handleChange}*/}
          {/*      onBlur={formik.handleBlur}*/}
          {/*    >*/}
          {/*      <option value="" selected disabled>*/}
          {/*        Choose Hotel*/}
          {/*      </option>*/}

          {/*      {hotelList?.map((i) => (*/}
          {/*        <option key={i._id} value={i._id}>*/}
          {/*          {i.name}*/}
          {/*        </option>*/}
          {/*      ))}*/}
          {/*    </select>*/}
          {/*    {formik.touched.chooseHotel &&*/}
          {/*    Boolean(formik.errors.chooseHotel) ? (*/}
          {/*      <small className="text-red-600">*/}
          {/*        {formik.touched.chooseHotel && formik.errors.chooseHotel}*/}
          {/*      </small>*/}
          {/*    ) : null}*/}
          {/*  </div>*/}
          {/*  {formik.values.chooseHotel ? (*/}
          {/*    <div className="flex flex-col gap-3">*/}
          {/*      <Select*/}
          {/*        placeholder="Select room"*/}
          {/*        name={`roomNumber`}*/}
          {/*        defaultValue={formik.values.roomNumber}*/}
          {/*        options={transformedRooms}*/}
          {/*        isSearchable*/}
          {/*        onChange={(e) => formik.setFieldValue("roomNumber", e.value)}*/}
          {/*        noOptionsMessage={() => "No room available"}*/}
          {/*        classNames={{*/}
          {/*          control: (state) =>*/}
          {/*            `!input !input-md !h-4 !input-bordered min-w-[10rem] !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none ${*/}
          {/*              state.isFocused ? "!shadow-none" : ""*/}
          {/*            }`,*/}
          {/*          valueContainer: () => "!p-0",*/}
          {/*          placeholder: () => "!m-0",*/}
          {/*        }}*/}
          {/*      />*/}
          {/*      {formik.touched.roomNumber &&*/}
          {/*      Boolean(formik.errors.roomNumber) ? (*/}
          {/*        <small className="text-red-600">*/}
          {/*          {formik.touched.roomNumber && formik.errors.roomNumber}*/}
          {/*        </small>*/}
          {/*      ) : null}*/}
          {/*    </div>*/}
          {/*  ) : null}*/}
          {/*</div>*/}
          {order.foods.length ? (
            <div className="overflow-x-auto w-full mt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>
                      Surveyor <br />
                      Quantity
                    </th>
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

                            onClick={handlePlaceOrder}
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
      ) : (
        <div >
          <h3 className={`mb-5 font-bold text-2xl `}>
            Order placed successfully.
          </h3>
          <div ref={componentRef} className={`overflow-x-auto border ${isheaderHide?"p-5":""}`}>
            <div >
              {/* header rendering by condition */}
              {isheaderHide&&<div className={`text-center mb-6`}>
                <img className="w-24 h-24 mx-auto p-2" src={logo} alt="logo" />
                <h1 className="font-bold text-2xl" >DAK Hospital LTD</h1>
                <span>Customer Receipt</span> <br />
                <span>Issue Date: {formattedDate} </span>
              </div>}

            <table className="table" >
              <thead>
                <tr className={`text-lg`}>
                  <th>Name</th>
                  <th>
                    Surveyor <br /> Quantity
                  </th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {success?.items?.map((food, idx) => (
                  <tr>
                    <td>{food?.item}</td>
                    <td>{food?.serveyor_quantity}</td>
                    <td>{food?.price}</td>
                    <td>{food?.quantity}</td>
                  </tr>
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
                          <p className="flex justify-between font-bold">
                            Grand Total: <span>{orderCalc.grandTotal}</span>
                          </p>
                        </div>
                      
                      </div>
                    </td>
                  </tr>
                </tfoot>
            </table>
            </div>
            {/* singature */}
            {isheaderHide&&<div className="flex justify-between mt-24">
             <div>
              {/* office signature */}
                <div className="h-[2px] w-48 divider"></div>
                <div className="text-center">Office Signature</div>
             </div>
             {/* customer signature  */}
              <div>
              <div className="h-[2px] w-48 divider"></div>
              <div className="text-center">Custoner Signature</div>
              </div>
            </div>}
            <p className="text-center absolute bottom-0 left-36">Powered by <span className="text-green-slimy text-lg font-semibold">JS Encoder</span>. Copyright © {currentYear}. All rights reserved.</p>
          </div>
          <div className={`mt-5 text-end`}>
            <button
              onClick={handleButtonClick}
              className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              Print
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmOrder;
