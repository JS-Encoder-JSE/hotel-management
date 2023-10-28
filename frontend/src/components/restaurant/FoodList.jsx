import React, { useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { delOrder, setOrderCalc } from "../../redux/add-order/addOrderSlice.js";

const FoodList = ({ idx, food, handleOrder }) => {
  const [isAdd, setAdd] = useState(false);
  const { order } = useSelector((store) => store.addOrderSlice);
  const dispatch = useDispatch()

  useEffect(() => {
    const findFoodIdx = order.foods.findIndex((item) => item.id === food.id);

    if (findFoodIdx !== -1) setAdd(true);
    else setAdd(false);
  }, [order.foods]);

  return (
    <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16">
              <img src={food.img} alt="" />
            </div>
          </div>
          <div>
            <div className="font-bold">{food.name}</div>
          </div>
        </div>
      </td>
      <td>Available</td>
      <td>${food.price}</td>
      <th>
        {!isAdd ? (
          <span
            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
            title={`Add`}
            onClick={() => {
              handleOrder(food);
            }}
          >
            <FaPlusCircle />
          </span>
        ) : (
          <span
            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
            title={`Remove`}
            onClick={() => {
              dispatch(delOrder(food));
              dispatch(setOrderCalc());
            }}
          >
            <FaMinusCircle />
          </span>
        )}
      </th>
    </tr>
  );
};

export default FoodList;
