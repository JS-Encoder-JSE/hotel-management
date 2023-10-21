import React from "react";
import { FaEye, FaFileInvoice } from "react-icons/fa";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

const HotelLists = () => {
  const formik = useFormik({
    initialValues: {
      entries: "",
      search: "",
      startDate: "",
      endDate: "",
    },
  });

  return (
    <div className={`px-5 space-y-5`}>
      <div className={`bg-white px-10 py-5 rounded`}>
        <h3 className={`text-xl font-semibold text-center`}>Hotel List </h3>
        <hr className={`my-5`} />
        <div className={`space-y-10`}>
         
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Hotel Name</th>
                  <th>Hotel Address</th>
                  <th>Hotel Email</th>
                  <th>Phone Number</th>
                  <th>License Number</th>
                  <th> Branch Name</th>
                  <th> Manager List</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(+formik.values.entries || 5)].map((_, idx) => {
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>Hotel Silva</td>
                      <td>Kolkata</td>
                      <td>
                        hotelsilva@gmail.com
                      </td>
                      <td>
                        +99801111
                      </td>
                      <td>12345678</td>
                      <td>12345678</td>
                      <td>Manager</td>
                      <td className={`space-x-1.5`}>
                     <Link to={`/dashboard/hotel-edit`}>
                     <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                        >
                          <FaEye />
                        </span>

                     </Link>
                        <span
                          className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
                        >
                          <FaFileInvoice />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelLists;
