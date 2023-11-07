import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import Modal from "../../components/Modal.jsx";
import HotelAsManager from "../../components/owner/HotelAsManager.jsx";
import { useGetUsersQuery } from "../../redux/admin/subadmin/subadminAPI.js";

// form validation
const validationSchema = yup.object({
  name: yup.string().required("Hotel Name is required"),
  address: yup.string().required("Hotel Address is required"),
  email: yup.string().required("Hotel Email is required"),
  phoneNumber: yup.string().required("Phone Number  is required"),
  branchName: yup.string().required("Branch Name is required"),
});

const HotelEdit = () => {
  const { user } = useSelector((store) => store.authSlice);
  const [managerList, setManagerList] = useState([{ manager: "", shift: "" }]);
  const { isLoading, data: managers } = useGetUsersQuery({
    cp: 0,
    filter: "",
    search: "",
    role: "manager",
    parentId: user?._id,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      branchName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...managerList];
    list[index][name] = value;
    setManagerList(list);
  };

  const handleRemove = (index) => {
    const list = [...managerList];
    list.splice(index, 1);
    setManagerList(list);
  };

  const handleAdd = () => {
    setManagerList([...managerList, { manager: "", shift: "" }]);
  };

  return (
      <div className={`space-y-10`}>
        <div className="card bg-white shadow-xl">
          <div className="card-body p-4">
            <div className="text-2xl md:flex justify-between items-center">
              <h2>Edit Hotel</h2>
            </div>
            <hr className={`my-5`} />
          </div>

          <div className="max-auto">
            <form autoComplete="off"
                className="form-control grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10"
                onSubmit={formik.handleSubmit}
            >
              {/* Hotel Name box */}
              <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && Boolean(formik.errors.name) ? (
                    <small className="text-red-600">
                      {formik.touched.name && formik.errors.name}
                    </small>
                ) : null}
              </div>
              {/*Hotel Branch box */}
              <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Branch Name"
                    name="branchName"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                    value={formik.values.branchName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.branchName &&
                Boolean(formik.errors.branchName) ? (
                    <small className="text-red-600">
                      {formik.touched.branchName && formik.errors.branchName}
                    </small>
                ) : null}
              </div>
              {/* Hotel Address box */}
              <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.address && Boolean(formik.errors.address) ? (
                    <small className="text-red-600">
                      {formik.touched.address && formik.errors.address}
                    </small>
                ) : null}
              </div>
              {/* Email box */}
              <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Email "
                    name="email"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && Boolean(formik.errors.email) ? (
                    <small className="text-red-600">
                      {formik.touched.email && formik.errors.email}
                    </small>
                ) : null}
              </div>

              {/*Phone Number  box */}
              <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy "
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber &&
                Boolean(formik.errors.phoneNumber) ? (
                    <small className="text-red-600">
                      {formik.touched.phoneNumber && formik.errors.phoneNumber}
                    </small>
                ) : null}
              </div>
              <button
                  type="button"
                  className="btn btn-md bg-transparent border-gray-500/50 rounded focus:outline-none focus:border-green-slimy normal-case"
                  onClick={() => window.ol_modal.showModal()}
              >
                Assign Manager
              </button>
              {/* submit button */}
              <div className="flex flex-col gap-3 col-span-full text-end">
                <button
                    type="submit"
                    className=" btn btn-md  bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case"
                >
                  Update Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
        <Modal id={`ol_modal`}>
          <HotelAsManager
              managers={managers?.docs}
              managerList={managerList}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleChange={handleChange}
          />
        </Modal>
      </div>
  );
};

export default HotelEdit;
