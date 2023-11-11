import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { useUpdateBookingMutation } from "../../redux/room/roomAPI";
import toast from "react-hot-toast";

// form validation
const validationSchema = yup.object({
	guestName: yup.string().required("Name is required"),
	mobileNumber: yup.string().required("Mobile number is required"),
	emergency_contact: yup
		.string()
		.required("Emergency Number number is required"),
	address: yup.string().required("Address  number is required"),
	nationality: yup.string().required("Nationality  number is required"),
	// age: yup
	//   .number()
	//   .required("Age is required")
	//   .positive("Age must be a positive number")
	//   .integer("Age must be an integer"),
	adult: yup
		.number()
		.required("Adult is required")
		.positive("Adult must be a positive number")
		.integer("Adult must be an integer"),

	children: yup
		.number()
		.positive("Children must be a positive number")
		.integer("Children must be an integer"),
	// paymentMethod: yup.string().required("Payment method is required"),
	// trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
	//   if (paymentMethod !== "cash")
	//     return schema.required("Transaction ID is required");
	//   else return schema;
	// }),

	// discount: yup.number().when(["discount"], ([discount], schema) => {
	//   if (discount)
	//     return schema
	//       .positive("Discount must be a positive number")
	//       .integer("Discount must be an integer");
	//   else return schema;
	// }),

	from: yup.string().required("From Date is required"),
	to: yup.string().required("To Date is required"),
});

const EditBooking = ({ data }) => {
  const [updateBooking, { isLoading }] = useUpdateBookingMutation();
  const closeRef = useRef(null)
	const formik = useFormik({
		initialValues: {
			// advanced_amount: "",
			hotel_id: "",
			guestName: "",
			address: "",
			mobileNumber: "",
			emergency_contact: "",
			adult: "",
			children: "",
			// paymentMethod: "",
			// discount: "",
			from: "",
			to: "",
			nationality: "",
		},

		validationSchema,
		onSubmit: async (values,formikHelpers) => {
			try {
				const response = await updateBooking({
					id: values._id,
					data: values,
        });

        console.log(response);
  
        if (response?.error) {
          toast.error(response.error.data.message);
        } else {
          formikHelpers.resetForm();
          closeRef.current.click();
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error)
      }
		},
	});

	useEffect(() => {
		if (data) {
			formik.setValues((p) => ({ ...p, ...data }));
		}
	}, [data]);

	return (
		<>
			<form autoComplete="off" method="dialog">
        <button
          ref={closeRef}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					onClick={() => formik.handleReset()}>
					✕
				</button>
			</form>
			<div>
				<h3 className={`text-2xl font-semibold mb-3`}>Edit Booking</h3>
				<hr />
				<form
					autoComplete="off"
					className="form-control grid grid-cols-1 gap-4 mt-5"
					onSubmit={formik.handleSubmit}>
					{/* name box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Guest name"
							name="guestName"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
							value={formik.values.guestName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.guestName &&
						Boolean(formik.errors.guestName) ? (
							<small className="text-red-600">
								{formik.touched.guestName &&
									formik.errors.guestName}
							</small>
						) : null}
					</div>
					{/* Adsress box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Address"
							name="address"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
							value={formik.values.address}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.address &&
						Boolean(formik.errors.address) ? (
							<small className="text-red-600">
								{formik.touched.address &&
									formik.errors.address}
							</small>
						) : null}
					</div>
					{/* mobile box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Mobile number"
							name="mobileNumber"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
							value={formik.values.mobileNumber}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.mobileNumber &&
						Boolean(formik.errors.mobileNumber) ? (
							<small className="text-red-600">
								{formik.touched.mobileNumber &&
									formik.errors.mobileNumber}
							</small>
						) : null}
					</div>

					{/* emergency  box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Emergency Number"
							name="emergency_contact"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
							value={formik.values.emergency_contact}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.emergency_contact &&
						Boolean(formik.errors.emergency_contact) ? (
							<small className="text-red-600">
								{formik.touched.emergency_contact &&
									formik.errors.emergency_contact}
							</small>
						) : null}
					</div>

					{/* adult box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Adult"
							name="adult"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
							value={formik.values.adult}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.adult &&
						Boolean(formik.errors.adult) ? (
							<small className="text-red-600">
								{formik.touched.adult && formik.errors.adult}
							</small>
						) : null}
					</div>
					{/* children box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Children"
							name="children"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
							value={formik.values.children}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.children &&
						Boolean(formik.errors.children) ? (
							<small className="text-red-600">
								{formik.touched.children &&
									formik.errors.children}
							</small>
						) : null}
					</div>
					{/* payment method box */}
					{/* <div className="flex flex-col gap-3">
            <select
              name="paymentMethod"
              className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled>
                Payment Method
              </option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="mfs">Mobile Banking</option>
            </select>
            {formik.touched.paymentMethod &&
            Boolean(formik.errors.paymentMethod) ? (
              <small className="text-red-600">
                {formik.touched.paymentMethod && formik.errors.paymentMethod}
              </small>
            ) : null}
          </div>
          {formik.values.paymentMethod &&
          formik.values.paymentMethod !== "cash" ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Transaction ID"
                name="trxID"
                className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
                value={formik.values.trxID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.trxID && Boolean(formik.errors.trxID) ? (
                <small className="text-red-600">
                  {formik.touched.trxID && formik.errors.trxID}
                </small>
              ) : null}
            </div>
          ) : null} */}
					{/* discount */}
					{/* <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Discount"
              name="discount"
              className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discount && Boolean(formik.errors.discount) ? (
              <small className="text-red-600">
                {formik.touched.discount && formik.errors.discount}
              </small>
            ) : null}
          </div> */}
					{/* from data */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="From  MM/DD/YYY"
							name="from"
							className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
							value={formik.values.from}
							onChange={formik.handleChange}
							onBlur={(e) => {
								e.target.type = "text";
								formik.handleBlur;
							}}
							onFocus={(e) => (e.target.type = "date")}
						/>
						{formik.touched.from && Boolean(formik.errors.from) ? (
							<small className="text-red-600">
								{formik.touched.from && formik.errors.from}
							</small>
						) : null}
					</div>
					{/* To date box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="To  MM/DD/YYY"
							name="to"
							className="input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
							value={formik.values.to}
							onChange={formik.handleChange}
							onBlur={(e) => {
								e.target.type = "text";
								formik.handleBlur;
							}}
							onFocus={(e) => (e.target.type = "date")}
						/>
						{formik.touched.to && Boolean(formik.errors.to) ? (
							<small className="text-red-600">
								{formik.touched.to && formik.errors.to}
							</small>
						) : null}
					</div>

					{/* Nationality box */}
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Nationality"
							name="nationality"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
							value={formik.values.nationality}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.nationality &&
						Boolean(formik.errors.nationality) ? (
							<small className="text-red-600">
								{formik.touched.nationality &&
									formik.errors.nationality}
							</small>
						) : null}
					</div>
					{/* button */}
					<div className={`flex justify-between`}>
						<button
							type={"submit"}
							className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
							Update
							{isLoading ? (
								<span
									className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
									role="status"></span>
							) : null}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditBooking;
