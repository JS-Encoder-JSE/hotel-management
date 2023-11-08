import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import ChangeShift from "../OwnerManagerManagement/ChangeShift";
import HotelAsManager from "../../components/owner/HotelAsManager.jsx";
import { useGetUsersQuery } from "../../redux/admin/subadmin/subadminAPI.js";
import { useHotelQuery } from "../../redux/Owner/hotelsAPI.js";
import { Rings } from "react-loader-spinner";
import { useSelector } from "react-redux";

const HotelListView = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();
  const [managerList, setManagerList] = useState([{ manager: "", shift: "" }]);
  const [showManagers, setShowManagers] = useState([]);
  const [save, setSave] = useState(false);
  const { isLoading, data: hotel } = useHotelQuery(id);
  const { data: managers } = useGetUsersQuery({
    cp: 0,
    filter: "",
    search: "",
    role: "manager",
    parentId: user._id,
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...managerList];
    list[index][name] = value;
    setManagerList(list);
  };

  const handleRemove = (index) => {
    const list = [...managerList];
    list.splice(index, 1);
    setManagerList(list);
  };

  const handleAdd = () => {
    setManagerList([...managerList, { manager: "", shift: "" }]);
  };

  useEffect(() => {
    if (save) {
      const tempList = [
        ...managerList
          .map((elem) => ({
            ...(elem.manager ? JSON.parse(elem.manager) : {}),
            shift: elem.shift,
          }))
          .filter((elem) => Boolean(elem._id) && Boolean(elem.shift)),
      ];

      setShowManagers(tempList);
      setSave(false);
    }
  }, [save]);

  useEffect(() => {
    if (hotel) {
      const tempArr = hotel.managers.map((elem) => ({
        manager: JSON.stringify(elem),
        shift: elem.shift,
      }));

      setManagerList(tempArr);
      setSave(true);
    }
  }, [hotel]);

  return (
    <div>
      <div className="card w-full bg-white shadow-xl p-5">
        {/* Back button */}
        <div>
          <span
            className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
        </div>
        {!isLoading ? (
          <>
            <h1 className="text-2xl text-center ">Hotel - information</h1>
            <div className="card-body grid md:grid-cols-2 gap-4">
              <div className="">
                <h2 className="card-title mb-3">Hotel Description </h2>
                <h6> Name : {hotel?.name}</h6>
                <h6> Address : {hotel?.address}</h6>
                <h6> Number : {hotel?.phone_no}</h6>
                <h6> Email : {hotel?.email}</h6>
              </div>
            </div>
          </>
        ) : (
          <Rings
            width="50"
            height="50"
            color="#37a000"
            wrapperClass="justify-center"
          />
        )}
      </div>
      {/* <Modal id={`ol_modal`}>
        <StatusSettings />
      </Modal> */}
      <div className="card w-full bg-white shadow-xl p-5 mt-8">
        <div className="card-body">
          <h1 className="text-center text-2xl mb-4">Assigned Manager</h1>
          {!isLoading ? (
            <>
              <div className="overflow-x-auto">
                <table className="table border">
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Manager Name</th>
                      <th>Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotel?.managers?.map((elem, idx) => {
                      return (
                        <tr
                          className={
                            idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                          }
                        >
                          <th> {++idx}</th>
                          <td>{elem?.name}</td>
                          <td>{elem?.shift}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <h6 className={`flex space-x-1.5 justify-end`}>
                <button
                  className="btn btn-md bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case min-w-[7rem]"
                  onClick={() => window.ol_modal.showModal()}
                >
                  Change Shift
                </button>
              </h6>
              <Modal id={`ol_modal`}>
                <HotelAsManager
                  setSave={setSave}
                  managers={managers?.docs}
                  managerList={managerList}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                  handleChange={handleChange}
                />
              </Modal>
            </>
          ) : (
            <Rings
              width="50"
              height="50"
              color="#37a000"
              wrapperClass="justify-center"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelListView;
