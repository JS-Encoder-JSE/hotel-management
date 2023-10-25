import React from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
const AdminOwnerView = () => {
  return (
    <>
      <div>
        <h1 className={`text-2xl text-center mb-8`}>Owner Information </h1>
        <footer
          className={`footer px-10 text-white-content bg-white p-20 rounded`}
        >
          <nav>
            <header className={`footer-title underline py-2 `}>
              Owner Information
            </header>
            <p>Owner Name : Jon Dow</p>
            <p>Hotel Address : Kolkata</p>
            <p>Contact Number : +98812554</p>
            <p>Owner Email : jondoe@gmail.com</p>
          </nav>
          <nav>
            <header className="footer-title underline py-2">
              Bill-Information
            </header>
            <p>Bill From Date :12-10-2023 </p>
            <p>Bill To Date : 14-10-2023</p>
          </nav>
          <nav>
            <header className="footer-title underline py-2">
              Payment-Information
            </header>
            <p>Cash : $5000 </p>
            <p>Card : $00</p>
            <p>Mobile Banking : $00</p>
          </nav>
          <nav>
            <header className="footer-title underline  py-2">
              Other Information{" "}
            </header>
            <p>Number Of Hotels : 02</p>
            <p>Status : Active</p>
            <p></p>
          </nav>
        </footer>
      </div>

{/*  Table */}
      <div className="overflow-x-auto mt-10">
        <table className="table border">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number Of Hotels</th>
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
                  <td>02</td>
                  <td className={`space-x-1.5`}>
                    <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case ms-2`}
                      onClick={() =>
                        navigate(`/dashboard/adminowner-view/${idx}`)
                      }
                    >
                      <GrView />
                    </span>
                    <span
                      className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case mt-2`}
                    >
                      <FaTrash />
                    </span>
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
