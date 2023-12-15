import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import Modal from "../Modal.jsx";
import HotelLimitEdit from "../../pages/Admin/HotelLimitEdit.jsx";
import HotelList from "./HotelList.jsx";
import TransactionHistory from "./TransactionHistory.jsx";
import StatusHistory from "./StatusHistory.jsx";
import { useGetUserQuery } from "../../redux/admin/subadmin/subadminAPI.js";
import store from "../../redux/store.js";
import { useSelector } from "react-redux";

const AdminOwnerView = () => {
  const navigate = useNavigate();
  const [roomsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const user_id = store?.getState()?.authSlice?.user?._id;
  const { id } = useParams();
  const { data, isLoading, error } = useGetUserQuery(id);

  const { user } = useSelector((store) => store.authSlice);
  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={`space-y-10 container`}>
        <div className="card w-full max-w-full bg-white shadow-xl p-5">
          <div>
            <span
              className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </span>
          </div>
          <div>
            <h1 className="bg-green-slimy text-2xl text-center text-white max-w-3xl  mx-auto py-3 px-5 rounded space-x-1.5 mb-7 mt-5">
              Client Information
            </h1>
          </div>
          <div className="card-body grid grid-cols xl:grid-cols-2 gap-4">
            <div className="">
              <h2 className="card-title mb-3">Client Information </h2>
              {/* <div
                className="sm:flex-row"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span style={{ flexBasis: "50%" }}>Address</span>
                <span style={{ flexBasis: "50%" }}>{data?.address}</span>
              </div> */}
              <table className="table-auto w-full overflow-x-auto">
                <tbody>
                  <tr>
                    <th className="text-start text-xs sm:text-sm md:text-base lg:text-lg ">
                      User Name
                    </th>
                    <td className="md:pl-2 max-w-[200px] sm:max-w-full sm:text-xs md:text-sm lg:text-base xl:text-lg">
                      : {data?.username}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start text-xs sm:text-sm md:text-base lg:text-lg ">
                      Name
                    </th>
                    <td className="md:pl-2 max-w-[200px] sm:max-w-full sm:text-xs md:text-sm lg:text-base xl:text-lg">
                      : {data?.name}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start text-xs sm:text-sm md:text-base lg:text-lg ">
                      Address
                    </th>
                    <td className="md:pl-2 max-w-[10px] sm:max-w-full sm:text-xs md:text-sm lg:text-base xl:text-lg">
                      : <span>{data?.address}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start text-xs sm:text-sm md:text-base lg:text-lg ">
                      Contact No
                    </th>
                    <td className="md:pl-2 max-w-[200px] sm:max-w-full sm:text-xs md:text-sm lg:text-base xl:text-lg">
                      : {data?.phone_no}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start text-xs sm:text-sm md:text-base lg:text-lg ">
                      Email
                    </th>
                    <td className="md:pl-2 max-w-[200px] sm:max-w-full sm:text-xs md:text-sm lg:text-base xl:text-lg">
                      : <span>{data?.email}</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* <h6>Username : {data?.username}</h6>
              <h6>Name : {data?.name}</h6>
              <h6>Address : {data?.address}</h6>
              <h6>Contact Number : {data?.phone_no}</h6>
              <h6>Emergency Contact: {data?.emergency_contact}</h6>
              <h6>Email : {data?.email}</h6> */}
            </div>
            <div className="">
              <h2 className="card-title mb-3">License Information </h2>

              <table>
                <tbody>
                  <tr>
                    <th className="text-start">License Key</th>
                    <td className="pl-10">:</td>
                    <td>{data?.license_key}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Purchase Date</th>
                    <td className="pl-10">:</td>
                    <td>{new Date(data?.createdAt).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Renew Date</th>
                    <td className="pl-10">:</td>
                    <td>{new Date(data?.bill_from).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Expire Date</th>
                    <td className="pl-10">:</td>
                    <td> {new Date(data?.bill_to).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th className="text-start">Remain Days</th>
                    <td className="pl-10">:</td>
                    <td>
                      {" "}
                      {Math.floor(
                        Math.abs(new Date(data?.bill_to) - new Date()) /
                          (24 * 60 * 60 * 1000)
                      )}{" "}
                      Days
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start"> Status</th>
                    <td className="pl-10">:</td>
                    <td>{data?.status}</td>
                  </tr>

                  <tr>
                    <th className="text-start">Number Of Hotels</th>
                    <td className="pl-10">:</td>
                    <td className="flex gap-2 items-center">
                      {" "}
                      {data?.maxHotels}{" "}
                      <span
                        className={`cursor-pointer`}
                        onClick={() => window.hle_modal.showModal()}
                      >
                        <FaEdit />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* <h6>
                {" "}
                License Key : {data?.license_key}
                {/* {new Date(data?.bill_to).toLocaleDateString()} */}
              {/* </h6> */}
              {/* <h6>
                {" "}
                Purchase Date :{new Date(
                  data?.createdAt
                ).toLocaleDateString()}{" "}
              </h6>
              <h6>
                Renew Date : {new Date(data?.bill_from).toLocaleDateString()}
              </h6> */}
              {/* <h6>
                Expire Date : {new Date(data?.bill_to).toLocaleDateString()}
              </h6> */}
              {/* <h6>
                Remaining Days:{" "}
                {Math.floor(
                  Math.abs(new Date(data?.bill_to) - new Date()) /
                    (24 * 60 * 60 * 1000)
                )}{" "}
                Days
              </h6> */}
              {/* <h6 className="capitalize">Status : {data?.status}</h6>
                <div className="flex gap-1.5">
                  <h6>Number Of Hotels : {data?.maxHotels}</h6>
                  <span
                    className={`cursor-pointer`}
                    onClick={() => window.hle_modal.showModal()}
                  >
                    <FaEdit />
                  </span>
                </div> */}
            </div>
          </div>
        </div>

        <HotelList hotels={data?.assignedHotel} />
        <TransactionHistory />
        <StatusHistory />
      </div>
      <Modal id={`hle_modal`}>
        <HotelLimitEdit data={data} hotels={data?.maxHotels} />
      </Modal>
    </>
  );
};

export default AdminOwnerView;
