import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const FoodList = ({ idx, food, handleOrder }) => {
  const [isDisable, setDisable] = useState(false);

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
        <span
          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ${
            isDisable ? "opacity-50 pointer-events-none" : ""
          }`}
          title={`Add`}
          onClick={() => {
            handleOrder(food);
            setDisable(true);
          }}
        >
          <FaPlusCircle />
        </span>
      </th>
    </tr>
  );
};

export default FoodList;
