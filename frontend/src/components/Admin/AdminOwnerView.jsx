import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
const AdminOwnerView = () => {
  const [user, setUser] = useState(5);
  const increament = () => {
    setUser(user + 1);
  };
  const decrement = () => {
    if (user > 0) {
      setUser(user - 1);
    } else {
      setUser(0);
    }
  };
  const navigate = useNavigate();

  return (
    <>
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

          <h1 className="text-2xl text-center ">Client Information</h1>
          <div className="card-body grid md:grid-cols-2 gap-4">
            <div className="">
              <h2 className="card-title mb-3">Client Information </h2>
              <h6>Client Name : Jon Dow</h6>
              <h6>Hotel Address : Kolkata</h6>
              <h6>Contact Number : +98812554</h6>
              <h6>Client Email : jondoe@gmail.com</h6>
            </div>
            <div className="">
              <h2 className="card-title mb-3">License Information </h2>
              <h6> License Key : DSER-HGYT-GHTY-54564 </h6>
              <h6> Purchase Date :12-10-2023 </h6>
              <h6> Renew Date :12-10-2023 </h6>
              <h6> Expire Date : 14-10-2023</h6>
              <h6> Remaing Days: 15 Days</h6>
              <h6>Status : Active</h6>

              {/* <div>
                  <div className="flex gap-5">
                    <div>
                      <button
                        onClick={increament}
                        className=" p-2 rounded bg-green-100 px-5 "
                      >
                        +
                      </button>
                    </div>
                  <div>
                  <h1 
                 className=" p-2 rounded bg-green-100 px-9 ">
                    {user}
                  </h1>
                  </div>
                    <div>
                      <button
                        onClick={decrement}
                        className=" p-2 rounded bg-green-100 px-5"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div> */}
              <div className="flex ">
                <div>
                  <h6>Number Of Hotels : 05</h6>
                </div>
                <div>
<button className=" ms-2 " onClick={()=>document.getElementById('my_modal_3').showModal()}>
<FaEdit />
</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
  <div>
                  <div className="flex gap-5">
                    <div>
                      <button
                        onClick={increament}
                        className=" p-2 rounded bg-green-100 px-5 "
                      >
                        +
                      </button>
                    </div>
                  <div>
                  <h1 
                 className=" p-2 rounded bg-green-100 px-9 ">
                    {user}
                  </h1>
                  </div>
                    <div>
                      <button
                        onClick={decrement}
                        className=" p-2 rounded bg-green-100 px-5"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
  </div>
</dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Table */}
      <div className="overflow-x-auto mt-10">
        <table className="table border">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Hotel Name</th>
              <th>Hotel Email</th>
              {/* <th>
                Number Of <br /> Hotels
              </th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => {
              return (
                <tr className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}>
                  <th> {++idx}</th>
                  <td className="font-bold">Jon Doe</td>
                  <td>jondoe@gmail.com</td>
                  {/* <td>
                    <h1 className="border w-10 px-8 py-2 text-center bg-base-100 mb-3 ">
                      {user}
                    </h1>
                  </td> */}
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                      onClick={() =>
                        navigate(`/dashboard/adminowner-view/${idx}`)
                      }
                    >
                      <GrView />
                    </span>
                    {/* <span
                      className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case mt-2`}
                    >
                      <FaTrash />
                    </span> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOwnerView;
