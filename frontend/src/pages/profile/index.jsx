import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleUploadImg = () => {
    setImagePreview('data:image/jpeg;base64,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')
  }

  return (
    <div
      className={`relative max-w-xl bg-white rounded-2xl mx-auto p-8 pt-10 mt-20`}
    >
      <div>
        <div className="group absolute -top-16 inset-x-1/2 -translate-x-1/2 border-4 border-green-slimy rounded-full h-32 w-32">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt=""
              className="object-cover object-top h-full w-full rounded-full"
            />
          ) : (
            <img
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
              alt=""
              className="object-cover h-full w-full rounded-full"
            />
          )}

          {/* On image hover to replace the image */}
          <div className="opacity-0 group-hover:opacity-100 duration-300 bg-white/50 rounded-full absolute w-full h-full top-0">
            <button onClick={handleUploadImg} type="button" className="absolute -bottom-1 -right-1 text-xl text-green-slimy">
              <FaCamera />
            </button>
          </div>
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
          <p className="text-slate-600">S.M. Khalid Mahmud</p>
        </div>
        {/* Email box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
          <label className={`min-w-[4rem]`}>Email: </label>
          <p className="text-slate-600">email@xyz.com</p>
        </div>
        {/* Phone box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
          <label className={`min-w-[4rem]`}>Phone: </label>
          <p className="text-slate-600">01715738573</p>
        </div>
        {/* Address box */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 py-2 px-2 rounded-md glass">
          <label className={`min-w-[4rem]`}>Address: </label>
          <p className="text-slate-600">Motijheel, Dhaka</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
