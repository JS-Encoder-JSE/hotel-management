import React from "react";
import { FaEye, FaFileInvoice, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setOrderCalc } from "../../redux/add-order/addOrderSlice.js";
import FoodList from "./FoodList.jsx";

const FoodLists = ({ foods }) => {
  const { order } = useSelector((store) => store.addOrderSlice);
  const dispatch = useDispatch();

  const handleOrder = (item) => {
    const tempOrder = { ...order };

    const tempFoods = [...tempOrder.foods];
    tempFoods.push({ ...item, quantity: 1 });

    const newOrder = { ...tempOrder, foods: tempFoods };
    dispatch(setOrder(newOrder));
    dispatch(setOrderCalc());
  };

  return (
    <div className="overflow-x-auto border">
      <table className="table">
        <thead>
          <tr className={`text-lg`}>
            <th>Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, idx) => (
            <FoodList
              key={idx}
              idx={idx}
              food={food}
              handleOrder={handleOrder}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodLists;
