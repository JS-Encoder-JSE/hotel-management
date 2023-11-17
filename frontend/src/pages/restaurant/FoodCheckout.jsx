import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";
import { setQuantity } from "../../redux/add-order/addOrderSlice.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "../../redux/restaurant/foodAPI.js";
import { Rings } from "react-loader-spinner";
import SingleCheckoutItem from "../../components/restaurant/SingleCheckoutItem.jsx";
import toast from "react-hot-toast";
const FoodCheckout = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderByIdQuery(id);
  const [orderData, setOrderData] = useState({});
  console.log("orderData", orderData);
  const [input, setInput] = useState(1);
  const navigate = useNavigate();
  const [updateOrder] = useUpdateOrderMutation();
  const location = useLocation();
  const path = location.pathname;
  const print = () => {
    {
      window.print();
    }
  };
  const grandTotal = orderData?.data?.items?.reduce(
    (accumulator, item) => accumulator + item.total,
    0
  );
  const handleDeleteItems = (index) => {
    setOrderData((prev) => {
      const updatedItems = [...prev?.data?.items];
      updatedItems.splice(index, 1);
      return {
        ...prev,
        data: {
          ...prev?.data,
          items: updatedItems,
        },
      };
    });
  };

  const handleCheckout = async () => {
    const response = await updateOrder({
      data: {
        paid_amount: grandTotal,
        items: orderData.data.items,
        order_status: "CheckedOut",
        current_order: false,
      },
      id,
    });
    console.log("res", response);
    if (response?.error) {
      toast.error(response.error.data.message);
    } else {
      toast.success("Checkout successful");
    }
  };
  useEffect(() => {
    setOrderData(data);
  }, [data]);

  return (
    <div className={`flex flex-col gap-5 bg-white rounded-lg p-10`}>
      <div>
        <span
          className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </span>
      </div>
      <h3 className="text-2xl font-semibold text-center">
        {path.includes("orderDetails") ? "Order details" : "Checkout"}
      </h3>
      <hr />
      <div>
        <div className={`flex items-center gap-3 `}>
          <span className={`w-26`}>Room / Table No</span>
          <span>:</span>
          <span>512</span>
        </div>
        <div className={`flex items-center gap-3`}>
          <span className={`w-24`}>Invoice No</span>
          <span className="ms-7">:</span>
          <span>{orderData?.data?.unique_id}</span>
        </div>
      </div>
      {!isLoading ? (
        <>
          {orderData?.data?.items?.length ? (
            <div className="overflow-x-auto border mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>
                      Surveyor <br /> Quantity
                    </th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.data?.items.map((item, i) => (
                    <SingleCheckoutItem
                      index={i}
                      handleDeleteItems={handleDeleteItems}
                      item={item}
                      key={i}
                    />
                  ))}

                  <tr>
                    <td></td>
                    <td></td>
                    <td>Grand Total</td>
                    <td>{grandTotal}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className={`text-center`}>No data found!</h3>
          )}
        </>
      ) : (
        <Rings
          width="50"
          height="50"
          color="#37a000"
          wrapperClass="justify-center"
        />
      )}

      {/* <tfoot className={`text-sm `}>
                  <tr>
                    <td colSpan={5}>
                      <div className="mt-3 ">
                        <div className="">
                          <p className="flex justify-between text-1xl">
                            Total Price :
                             <span>{orderCalc.total}
                            </span>
                          </p>
                          <p className="flex justify-between text-1xl">
                            Tax : 
                            <span>{orderCalc.tax}</span>
                          </p>
                          <p className="flex justify-between text-1xl">
                            Grand Total: 
                            <span>{orderCalc.grandTotal}</span>
                          </p>
                        </div>
                       
                      </div>
                    </td>
                  </tr>
                </tfoot> */}
      <div className={`flex gap-4 justify-end mt-4`}>
        <button
          className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
          onClick={() => print()}
        >
          Print
        </button>
        <button
          onClick={handleCheckout}
          className="btn btn-sm hover:bg-green-slimy bg-transparent hover:text-white text-green-slimy !border-green-slimy rounded normal-case"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default FoodCheckout;
