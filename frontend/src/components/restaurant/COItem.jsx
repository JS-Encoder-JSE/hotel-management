import React, { useEffect, useState } from "react";
import {
  decQuantity,
  delOrder,
  incQuantity,
  setOrderCalc,
  setQuantity,
  setSerQuantity,
} from "../../redux/add-order/addOrderSlice.js";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

const COItem = ({ idx, food }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setInput(food.quantity);
  }, [refetch]);

  return (
    <tr key={idx}>
      <th>{++idx}</th>
      <td>{food.food_name}</td>
      <td>{food.price}</td>
      <td>
        <input
          type="text"
          placeholder="Surveyor Quantity"
          name="surveyorQuantity"
          className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
          onChange={(e) =>
            dispatch(setSerQuantity({ food, serQuantity: e.target.value }))
          }
        />
      </td>
      <td className="flex gap-1">
        <button
          type="button"
          onClick={() => {
            dispatch(decQuantity(food));
            dispatch(setOrderCalc());
            setRefetch(!refetch);
          }}
          disabled={food.quantity <= 1}
          className={food.quantity === 1 ? "opacity-50" : null}
        >
          <FaMinus />
        </button>
        <input
          type="number"
          value={input}
          className="input-hide_Arrows w-12 flex outline-none text-center rounded-md p-1 placeholder:text-black border focus:border-green-slimy"
          onChange={(e) => {
            if (e.target.value > 0 || e.target.value === "")
              setInput(e.target.value);
          }}
          onBlur={(e) => {
            dispatch(setQuantity({ food, quantity: +e.target.value }));
            dispatch(setOrderCalc());
          }}
        />
        <button
          type="button"
          onClick={() => {
            dispatch(incQuantity(food));
            dispatch(setOrderCalc());
            setRefetch(!refetch);
          }}
        >
          <FaPlus />
        </button>
      </td>
      <td>{food.quantity * food.price}</td>
      <td className="flex justify-center">
        <button
          type="button"
          className="text-red-600 hover:text-red-400 transition-colors duration-500"
          onClick={() => {
            dispatch(delOrder(food));
            dispatch(setOrderCalc());
          }}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default COItem;
