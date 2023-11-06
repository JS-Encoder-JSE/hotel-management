import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();

  return (
    <div
      className={`relative max-w-xl bg-white rounded-2xl mx-auto p-8 pt-10 mt-20`}
    >
      <div>
        <div
          className="absolute -top-16 inset-x-1/2 -translate-x-1/2 border-4 border-green-slimy rounded-full h-32 w-32"
        >
          <img
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
              alt=""
              className="object-cover h-full w-full rounded-full"
          />
        </div>
        <div className={`text-end`}>
          <button
            type="button"
            className="btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded-md normal-case"
            onClick={() => navigate("edit")}
          >
            Change Password
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-14">
        {/* name box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
          <label className={`min-w-[4rem]`}>Name: </label>
          <p className="text-slate-600">{user?.name}</p>
        </div>
        {/* Email box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
          <label className={`min-w-[4rem]`}>Email: </label>
          <p className="text-slate-600">{user?.email}</p>
        </div>
        {/* Phone box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
          <label className={`min-w-[4rem]`}>Phone: </label>
          <p className="text-slate-600">{user?.phone_no}</p>
        </div>
        {/* Address box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
          <label className={`min-w-[4rem]`}>Address: </label>
          <p className="text-slate-600">{user?.address}</p>
        </div>
        {user?.role === "owner" ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
            <label className={`min-w-[4rem]`}>License: </label>
            <p className="text-slate-600">-</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
