import React, { useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import StatusSettings from "./StatusSettings.jsx";
import Modal from "../../components/Modal.jsx";
import img from '../../../src/../src/assets/profile.jpeg'

import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";

const ManagerListView = () => {
  const { user } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleUploadImg = () => {
    // Trigger the file input when the button is clicked
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  // Handle the image selection
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      // Read the selected image and set it as the preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };


  return (
  <>
    <div>
      <div className="card w-full bg-white shadow-xl p-5">
        {/* back button */}
        <div>
          <span
            className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
        </div>

       <div>
       </div>
        <div className="card-body">
        
          {/* profile image uploaded */}
        <div>
        <div
          onClick={handleUploadImg}
          className="group absolute -top-5 inset-x-1/2 -translate-x-1/2 cursor-pointer border-4 border-green-slimy rounded-full h-32 w-32"
        >
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
            <button
              type="button"
              className="absolute -bottom-1 -right-1 text-xl text-green-slimy"
            >
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={handleImageUpload}
              />
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-2xl text-center mt-9">Manager information</h1>
      {/* profile image end */}

{/* personal information  */}
         <div className=" grid md:grid-cols-2 gap-4 mt-9">
         <div>
            <h2 className="card-title mb-3"> Personal infomation </h2>
            <h6> Name : Jon Doe</h6>
            <h6> Address : Kolkata</h6>
            <h6> Number : +98812554</h6>
            <h6> Email : jondoe@gmail.com</h6>
          </div>
          <div>
            <h2 className="card-title mb-3"> Other information </h2>
            <h6>  Joint Date :12-10-2023 </h6>
            <h6>  Salary :12-10-2023 </h6>
            <h6 className={`flex space-x-1.5`}>
              <span>Status : InDuty</span>
              <span className={`cursor-pointer hover:text-green-slimy`} onClick={() => window.ol_modal.showModal()}><FaEdit /></span>
            </h6>
          </div>
         </div>
        </div>
      </div>
      <Modal id={`ol_modal`}>
        <StatusSettings />
      </Modal>
    </div>
         {/* Documents Download */}
         <div className="card w-full bg-white shadow-xl p-5 mt-6">
         <div className="card-body">
           <h1 className="text-center text-2xl mb-4">Documents</h1>
           <div className="overflow-x-auto">
             <table className="table border">
               <thead>
                 <tr>
                   <th>Sl</th>
                   <th>Name</th>
                   <th>Driving License</th>
                   <th>NID</th>
                   <th>Passport</th>
                   <th>Download</th>
                 </tr>
               </thead>
               <tbody>
                 {[...Array(1)].map((_, idx) => {
                   return (
                     <tr
                       className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                     >
                       <th> {++idx}</th>
                       <td className="font-bold">Jon Doe</td>
                       <td>
                       <img src={img} className={`w-24 rounded`}/>
                       </td>
                       <td>
                       <img src={img} className={`w-24 rounded`}/>
                       </td>
                       <td>
                       <img src={img} className={`w-24 rounded`} />
                       </td>
               <td >
           
                        <BsFillArrowDownSquareFill className="text-3xl  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case "
                        href={img}
                        download
                        />
                       </td>


                     
                     </tr>
               
                   );
                 })}
               </tbody>
             </table>
           </div>    
         </div>
       </div>
  </>
  );
};

export default ManagerListView;
