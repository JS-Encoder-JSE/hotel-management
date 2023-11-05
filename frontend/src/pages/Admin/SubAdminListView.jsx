import { useFormik } from "formik";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaUserAltSlash,
  FaUserCheck,
  FaUserLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SubAdminReport from "./SubAdminReport";
import ReactPaginate from "react-paginate";
import OwnerList from "../../components/Admin/OwnerList.jsx";
import SuspendedOwner from "../../components/Admin/SuspendedOwner.jsx";
import TransactionHistory from "../../components/Admin/TransactionHistory";
import StatusHistory from "../../components/Admin/StatusHistory";
import AdminOwnerList from "./AdminOwnerList";

const SubAdminListView = () => {
  const navigate = useNavigate();
  const [roomsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const formik = useFormik({
    initialValues: {
      entries: "",
      search: "",
      startDate: "",
      endDate: "",
    },
  });

  return (
    <div className={`space-y-10`}>
      <div className="w-full rounded-xl bg-white shadow-xl p-5">
        <div>
          <span
            className={`inline-flex w-8 h-8 items-center justify-center bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy border border-green-slimy cursor-pointer rounded-full normal-case transition-colors duration-500`}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
        </div>
        <h1 className="text-2xl text-center ">Sub Admin Information</h1>
        <div className="card-body grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="card-title mb-3">Sub Admin Information </h2>
            <h6>Name : Jon Doe</h6>
            <h6>Address : Kolkata</h6>
            <h6>Phone : +98812554</h6>
            <h6>Emergency Contact : +98812554</h6>
            <h6>Email : jondoe@gmail.com</h6>
          </div>
          <div className="">
            <h2 className="card-title mb-3">Other Information </h2>
            <h6>Joining Date : 12-10-2023 </h6>
            <h6>Salary : 20,000 </h6>
            <h6>Status : Active</h6>
          </div>
        </div>
      </div>
      <AdminOwnerList title={'Owner List'} />
      <TransactionHistory />
        <StatusHistory />
      {/* <SuspendedOwner /> */}
      <SubAdminReport />
    </div>
  );
};

export default SubAdminListView;
