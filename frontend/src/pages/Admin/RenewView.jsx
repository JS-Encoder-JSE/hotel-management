import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useGetUserQuery } from "../../redux/admin/subadmin/subadminAPI.js";
import { Rings } from "react-loader-spinner";

const RenewView = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetUserQuery(id);

  const navigate = useNavigate();

  function calculateRemainingDays(targetDate) {
    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const currentDate = new Date();
    const targetDateObj = new Date(targetDate);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = targetDateObj - currentDate;

    // Convert the difference to days
    const remainingDays = Math.ceil(differenceInMilliseconds / oneDay);
    if (remainingDays < 0) {
      return 0;
    }
    return remainingDays;
  }

  const bill_to =
    !isLoading && data?.status === "Suspended"
      ? data?.extended_time[0]?.to
      : data?.bill_to;
  return (
    <div>
      <div className="card w-full bg-white shadow-xl p-5">
        <div>
          <span
            className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
        </div>
        {!isLoading ? (
          <div className="card-body grid md:grid-cols-2 gap-4">
            <div className="">
              <h2 className="card-title mb-3">Client Information </h2>
              <h6>Username : {data?.username}</h6>
              <h6>Name : {data?.name}</h6>
              <h6>Address : {data?.address}</h6>
              <h6>Contact Number : {data?.phone_no}</h6>
              <h6>Emergency Contact: {data?.emergency_contact}</h6>
              <h6>Email : {data?.email}</h6>
            </div>
            <div className="">
              <h2 className="card-title mb-3">License Information </h2>
              <h6> License Key : {new Date(bill_to).toLocaleDateString()}</h6>
              <h6>
                {" "}
                Purchase Date :{new Date(
                  data?.createdAt,
                ).toLocaleDateString()}{" "}
              </h6>
              <h6>
                {" "}
                Renew Date :{new Date(
                  data?.renew_date,
                ).toLocaleDateString()}{" "}
              </h6>
              <h6> Expire Date : {new Date(bill_to).toLocaleDateString()}</h6>
              <h6>
                {" "}
                Remaining Days: {calculateRemainingDays(bill_to)}
                Days
              </h6>
              <h6 className="capitalize">Status : {data?.status}</h6>
              <div className="flex gap-1.5">
                <h6>Number Of Hotels : {data?.maxHotels}</h6>
                {/* <span
										className={`cursor-pointer`}
										onClick={() =>
											window.hle_modal.showModal()
										}>
										<FaEdit />
									</span> */}
              </div>
            </div>
          </div>
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
  );
};

export default RenewView;
