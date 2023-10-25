import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const ManagerList = () => {
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
        <h3 className={`text-xl font-semibold text-center`}>Manager List </h3>
        <hr className={`my-5`} />
        <div className={`space-y-10`}>
         
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Manager Name</th>
                  <th>Manager Address</th>
                  <th>Manager Email</th>
                  <th>Phone Number</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(+formik.values.entries || 5)].map((_, idx) => {
                    // < key={idx} manager={idx}></>
                  return (
                    <tr
                      className={idx % 2 === 0 ? "bg-gray-100 hover" : "hover"}
                    >
                      <th>{++idx}</th>
                      <td>Jon Doe</td>
                      <td>Kolkata</td>
                      <td>
                        jondoe@gmail.com
                      </td>
                      <td>
                        +99801111
                      </td>
                      <td>$25000</td>
                      <td className={`space-x-1.5`}>
                      <Link to={`/dashboard/manager-edit/${idx}`}>
                      <span
                          className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case md:mb-2 mb-2 ms-2`}
                        >
                          <FaRegEdit />
                        </span>
                      </Link>
                        <span
                          className={`btn btn-sm bg-red-500 hover:bg-transparent text-white hover:text-red-500 !border-red-500 rounded normal-case`}
                        >
                          <AiTwotoneDelete />
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

export default ManagerList;
