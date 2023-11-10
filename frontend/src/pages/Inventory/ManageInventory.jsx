import React, {useState} from "react";
import FoodLists from "../../components/restaurant/FoodLists.jsx";
import Modal from "../../components/Modal.jsx";
import ConfirmOrder from "../../components/inventory/ConfirmOrder.jsx";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useFormik } from "formik";
import InventoryLists from "../../components/inventory/InventoryLists.jsx";
import {useGetRoomsAndHotelsQuery} from "../../redux/room/roomAPI.js";

const ManageInventory = () => {
  const [keyword, setKeyword] = useState(null);
  const formik = useFormik({
    initialValues: {
      search: "",
      filter: "",
      chooseHotel: ""
    },
    onSubmit: (values) => {
      setKeyword(values.search);
    },
  });
  const { data: hotelList } = useGetRoomsAndHotelsQuery();
  const { order } = useSelector((store) => store.inventorySlice);

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      formik.handleSubmit();
    }
  };

  return (
    <div className={`space-y-10 bg-white p-16 rounded-2xl mx-10`}>
      <div
        className={`flex flex-col-reverse sm:flex-row gap-3 sm:justify-between`}
      >
       <div className={`flex space-x-1.5 gap-2  `}>
         <div className="flex flex-col gap-3 ">
           <select
               name="chooseHotel"
               className="input input-md h-8 bg-transparent input-bordered border-green-slimy rounded focus:outline-none focus:border-green-slimy"
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
         </div>
         <div className="flex flex-col gap-2">
           <select
               name="filter"
               className="select select-sm select-bordered border-green-slimy rounded focus:outline-none"
               value={formik.values.filter}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
           >
             <option value="all">All</option>
             <option value="Available">Available</option>
             <option value="Unavailable">Unavailable</option>
           </select>
           {formik.touched.filter && Boolean(formik.errors.filter) ? (
               <small className="text-red-600">
                 {formik.touched.filter && formik.errors.filter}
               </small>
           ) : null}
         </div>
       </div>
        <div className={`flex space-x-1.5`}>
          <button
            onClick={() => window.fp_modal.showModal()}
            type={`button`}
            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case ${
              !order.items.length ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Assign Items
          </button>
          <div className={`relative sm:min-w-[10rem]`}>
            <input
              type="text"
              placeholder="Search by name..."
              name="search"
              className="input input-sm input-bordered border-green-slimy rounded w-full focus:outline-none"
              value={formik.values.search}
              onChange={formik.handleChange}
              onKeyUp={(e) => {
                e.target.value === ""
                    ? formik.handleSubmit()
                    : null;
              }}
              onKeyDown={(e) => pressEnter(e)}
            />
            <button
                onClick={() => formik.handleSubmit()}
              type="button"
              className="absolute top-0 right-0 btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <InventoryLists filter={formik.values.filter} keyword={keyword} chooseHotel={formik.values.chooseHotel} />
      <Modal id={`fp_modal`}>
        <ConfirmOrder />
      </Modal>
    </div>
  );
};

export default ManageInventory;
