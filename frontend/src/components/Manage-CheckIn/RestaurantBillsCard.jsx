import React, { useState } from "react";
import {
  FaArrowLeft,
  FaEye,
  FaRegEdit,
  FaRegFilePdf,
  FaRupeeSign,
} from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { MdCurrencyRupee } from "react-icons/md";
import { BiRupee } from "react-icons/bi";

const RestaurantBillsCard = () => {
  const [managersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
  });

  const handlePageClick = ({ selected: page }) => {
    setCurrentPage(page);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter" || e.search === 13) {
      formik.handleSubmit();
    }
  };

  return (
    <div className={`space-y-5 mt-20 `}>
      <div>
        <div className={`bg-white rounded py-4 md:h-full `}>
          <div>
            <div>
              <h3 className="text-2xl font-semibold text-center">
                Restaurant Bills
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(+formik.values.entries || 5)].map((_, idx) => {
                    return (
                      <tr
                        className={
                          idx % 2 === 0 ? "bg-gray-100 hover" : "hover"
                        }
                      >
                        <th>{++idx}</th>
                        <td>29-11-23</td>
                        <td>Rice</td>
                        <td>5kg</td>
                        <td>2500</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className={`text-[1.2rem] font-bold`}>
                <tr>
                  <td colSpan={4} className={`text-end `}>
                  Total :
                  </td>
                  <td>
                 <div className="flex ">
                  <div><BiRupee/></div>
                  <div>25000</div>
                 </div>
                  </td>
                </tr>
              </tfoot>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <ReactPaginate
              containerClassName="join rounded-none"
              pageLinkClassName="join-item btn btn-md bg-transparent"
              activeLinkClassName="btn-active !bg-green-slimy text-white"
              disabledLinkClassName="btn-disabled"
              previousLinkClassName="join-item btn btn-md bg-transparent"
              nextLinkClassName="join-item btn btn-md bg-transparent"
              breakLinkClassName="join-item btn btn-md bg-transparent"
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBillsCard;
