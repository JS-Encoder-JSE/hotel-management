import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "../../redux/restaurant/foodAPI.js";
import { Rings } from "react-loader-spinner";
import SingleCheckoutItem from "../../components/restaurant/SingleCheckoutItem.jsx";
import toast from "react-hot-toast";
import FoodCheckoutPrint from "./FoodCheckoutPrint.jsx";
import ReactToPrint, { useReactToPrint } from "react-to-print";
const FoodCheckout = () => {
  const { id } = useParams();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { data, isLoading } = useGetOrderByIdQuery(id);
  const [orderData, setOrderData] = useState({});
  const [input, setInput] = useState(1);
  const navigate = useNavigate();
  const [updateOrder, isCheckLoader] = useUpdateOrderMutation();

  const [taxPercentage, setTaxPercentage] = useState(0);
  const [serviceTax, setServiceCharge] = useState(0);

  const location = useLocation();
  const path = location.pathname;

  const grandTotal = orderData?.data?.items?.reduce(
    (accumulator, item) => accumulator + item.total,
    0
  );

  const taxAmount = (grandTotal * taxPercentage) / 100;
  const serviceChargeTax = (grandTotal * serviceTax) / 100;

  const finalTotal = grandTotal + taxAmount + serviceChargeTax;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      navigate("/dashboard/add-order");
    },
  });

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
    setCheckoutLoading(true);
    const checkoutForTable = {
      paid_amount: finalTotal,
      items: orderData.data.items,
      order_status: "CheckedOut",
      current_order: false,
      total_price: grandTotal,
      unpaid_amount: 0,
      payment_status: "Paid",
      grand_total: finalTotal,
      tax: taxPercentage,
    };
    const updateForRoom = {
      paid_amount: 0,
      unpaid_amount: finalTotal,
      total_price: finalTotal,
      items: orderData.data.items,
      current_order: false,
      payment_status: "Pending",
    };
    setCheckoutLoading(true);
    const response = await updateOrder({
      data:
        orderData?.data?.dedicated_to === "room"
          ? updateForRoom
          : orderData?.data?.dedicated_to === "table"
          ? checkoutForTable
          : null,
      id,
    });
    setCheckoutLoading(true);
    if (response?.error) {
      toast.error(response.error.data.message);
      setCheckoutLoading(false);
    } else {
      toast.success("Checkout successful");
      setCheckoutLoading(false);
      handlePrint();
    }
  };
  useEffect(() => {
    setOrderData(data);
  }, [data]);

  // for printing
  const componentRef = useRef();

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
          <span className={`w-26`}>
            {orderData?.data?.table_id ? "Table" : "Room"}
          </span>
          <span>:</span>
          <span>
            {orderData?.data?.table_id
              ? orderData?.data?.table_id?.table_number
              : orderData?.data?.room_id?.roomNumber}
          </span>
          {/* {orderData?.data?.room_id && <span>{orderData?.data?.room_id}</span>} */}
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
                    {orderData?.data?.order_status === "CheckedOut" ? null : (
                      <th>Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {orderData?.data?.items.map((item, i) => (
                    <SingleCheckoutItem
                      index={i}
                      handleDeleteItems={handleDeleteItems}
                      item={item}
                      key={i}
                      showDelete={
                        orderData?.data?.order_status === "CheckedOut"
                          ? false
                          : true
                      }
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Service Charge</td>
                    <td>
                      {" "}
                      <span>
                        <input
                          className=" border border-gray-500/80 p-2 lg:-ml-20 md:text-center"
                          placeholder="Service Charge"
                          type="number"
                          name="addSrvCrg"
                          id=""
                          onChange={(e) =>
                            setServiceCharge(Number(e.target.value))
                          }
                        />
                      </span>
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>GST/Tax</td>
                    <td>
                      {" "}
                      <span>
                        <input
                          className="border border-gray-500/80 p-2 lg:-ml-20 md:text-center"
                          placeholder=" GST/Tax"
                          type="number"
                          name="addTax"
                          id=""
                          onChange={(e) =>
                            setTaxPercentage(Number(e.target.value))
                          }
                        />
                      </span>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Grand Total</td>
                    <td>{finalTotal}</td>
                    <td></td>
                  </tr>
                </tfoot>
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

      <div className={`flex gap-4 justify-end mt-4`}>
        <div style={{ display: "none" }}>
          <div className="p-4" ref={componentRef}>
            <FoodCheckoutPrint orderData={orderData} finalTotal={finalTotal} />
          </div>
        </div>
        <ReactToPrint
          trigger={() => (
            <button
              title="please select payment method"
              className="bg-green-slimy text-white px-2 rounded-sm"
            >
              Print
            </button>
          )}
          content={() => componentRef.current}
        />

        {orderData?.data?.order_status === "CheckedOut" ? (
          ""
        ) : (
          <button
            onClick={handleCheckout}
            className="btn btn-sm hover:bg-green-slimy bg-transparent hover:text-white text-green-slimy !border-green-slimy rounded normal-case"
          >
            <>
              {orderData?.data?.dedicated_to === "room"
                ? "Update Order"
                : "Checkout"}
            </>
            {checkoutLoading ? (
              <span
                className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                role="status"
              ></span>
            ) : null}
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCheckout;
