import React, { useEffect, useState } from "react";
import { FaEdit, FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { delOrder, setOrderCalc } from "../../redux/add-order/addOrderSlice.js";
import Swal from "sweetalert2";
import { useDeleteFoodMutation } from "../../redux/restaurant/foodAPI.js";
import {useNavigate} from "react-router-dom";

const FoodList = ({ idx, food, handleOrder }) => {
  const navigate = useNavigate()
  const [isAdd, setAdd] = useState(false);
  const { order } = useSelector((store) => store.addOrderSlice);
  const dispatch = useDispatch();
  const [deleteFood] = useDeleteFoodMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Food will be delete.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#35bef0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          deleteFood(id);
        });
      }
    });
  };

  useEffect(() => {
    const findFoodIdx = order.foods.findIndex((item) => item._id === food._id);

    if (findFoodIdx !== -1) setAdd(true);
    else setAdd(false);
  }, [order.foods]);

  return (
    <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16">
              <img src={food?.images[0]} alt="" />
            </div>
          </div>
          <div>
            <div className="font-bold">{food?.food_name}</div>
          </div>
        </div>
      </td>
      <td>
        {food?.quantity ? (
          <div className="badge min-w-[7rem] bg-green-slimy border-green-slimy text-white">
            Available
          </div>
        ) : (
          <div className="badge min-w-[7rem] bg-red-600 border-red-600 text-white">
            Not available
          </div>
        )}
      </td>
      <td>0</td>
      <td>{food?.price}</td>
      <th className={`flex gap-1.5`}>
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
            className={`btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 rounded normal-case`}
            title={`Remove`}
            onClick={() => {
              dispatch(delOrder(food));
              dispatch(setOrderCalc());
            }}
          >
            <FaMinusCircle />
          </span>
        )}
        <span
          className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
          onClick={() => navigate(`/dashboard/edit-food/${food._id}`)}
          title={`Edit`}
        >
          <FaEdit />
        </span>
        <span
          className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
          title={`Delete`}
          onClick={() => handleDelete(food._id)}
        >
          <FaTrash />
        </span>
      </th>
    </tr>
  );
};

export default FoodList;
