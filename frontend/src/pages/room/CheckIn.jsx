import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FaTrash, FaUpload } from "react-icons/fa";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TbReplaceFilled } from "react-icons/tb";
import Select from "react-select";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as yup from "yup";
import imgPlaceHolder from "../../assets/img-placeholder.jpg";
import {
	useAddBookingMutation,
	useGetBookingByIdQuery,
	useGetBookingsByHotelQuery,
	useGetHotelByIdQuery,
	useGetRoomsAndHotelsQuery,
	useRoomsQuery,
} from "../../redux/room/roomAPI.js";
import { useLocation, useParams } from "react-router-dom";
import { useUploadMutation } from "../../redux/baseAPI";
import toast from "react-hot-toast";

// form validation
const validationSchema = yup.object({
	guestName: yup.string().required("Name is required"),
	mobileNumber: yup.string().required("Mobile number is required"),
	emergency_contact: yup
		.string()
		.required("Emergency Number number is required"),
	address: yup.string().required("Address Number number is required"),
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
		.required("Children is required")
		.positive("Children must be a positive number")
		.integer("Children must be an integer"),

	// paymentMethod: yup.string().required("Payment method is required"),
	// trxID: yup.string().when(["paymentMethod"], ([paymentMethod], schema) => {
	//   if (paymentMethod !== "cash")
	//     return schema.required("Transaction ID is required");
	//   else return schema;
	// }),

	documentsType: yup.string().required("Document Number is required"),
	doc_number: yup
		.string()
		.when(["documentsType"], ([documentsType], schema) => {
			if (documentsType !== "nid")
				return schema.required("Transaction ID is required");
			else return schema;
		}),

	// discount: yup.number().when(["discount"], ([discount], schema) => {
	//   if (discount)
	//     return schema
	//       .positive("Discount must be a positive number")
	//       .integer("Discount must be an integer");
	//   else return schema;
	// }),

	documents: yup.mixed().required("Documents are required"),
	from: yup.string().required("From Date is required"),
	to: yup.string().required("To Date is required"),
	nationality: yup.string().required("Nationality is required"),
});

const CheckIn = () => {
	const { isLoading, data: rooms } = useRoomsQuery();
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [isBooked, setIsBooked] = useState("");
	const [uploadMultiple, { isLoading: uploading }] = useUploadMutation();
	const { id } = useParams();
	const { data: bookedData } = useGetBookingByIdQuery(id);
	const { data: hotel } = useGetHotelByIdQuery(bookedData?.data?.hotel_id);
	const [addBooking, { isLoading: bookingLoading }] = useAddBookingMutation();

	const formik = useFormik({
		initialValues: {
			room_ids: [],
			amount: "",
			hotel_id: "",
			guestName: "",
			address: "",
			mobileNumber: "",
			emergency_contact: "",
			adult: "",
			children: "",
			paymentMethod: "",
			discount: "",
			from: "",
			to: "",
			nationality: "",
			address: "",
			documents: null,
			documentsType: "",
			doc_number: "",
		},

		validationSchema,

		onSubmit: async (values, formikHelpers) => {
			const postData = { ...values };

			if (selectedImages && selectedImages.length > 0) {
				const formData = new FormData();

				// Assuming selectedImages is an array of File objects
				selectedImages.forEach((image, index) => {
					formData.append(
						`image_${index}`,
						image,
						image.name.substring(0, image.name.lastIndexOf("."))
					);
				});

				try {
					const result = await uploadMultiple(formData);
					// Assuming result.data is an array of image URLs corresponding to the uploaded images
					postData.doc_images = result.data.imageUrls;
					delete postData.documents;
					postData.status = "CheckedIn";
					postData.room_ids = selectedRooms.map((i) => i.id);
					if (postData.documentsType === "passport") {
						postData.doc_images = {
							passport: result.data.imageUrls,
						};
					}

					if (postData.documentsType === "nid" || "adarCard") {
						postData.doc_images = { nid: result.data.imageUrls };
					}

					if (postData.documentsType === "drivingLicense") {
						postData.doc_images = {
							driving_lic_img: result.data.imageUrls,
						};
					}

					const response = await addBooking(postData);

					if (response?.error) {
						toast.error(response.error.data.message);
					} else {
						toast.success(response.data.message);
						formikHelpers.resetForm();
						setSelectedImages([]);
					}
				} catch (error) {
					console.error("Error uploading images:", error);
					// Handle error appropriately
				}
			}
		},
	});

	const handleDelete = (idx) => {
		const tempImgs = [
			...selectedImages.slice(0, idx),
			...selectedImages.slice(idx + 1),
		];

		const dataTransfer = new DataTransfer();

		for (const file of tempImgs) {
			dataTransfer.items.add(file);
		}

		formik.setFieldValue("documents", dataTransfer.files);
		setSelectedImages(tempImgs);
	};

	const handleChange = (idx, newFile) => {
		const updatedImages = [...selectedImages];
		updatedImages[idx] = newFile;

		const dataTransfer = new DataTransfer();

		for (const file of updatedImages) {
			dataTransfer.items.add(file);
		}

		formik.setFieldValue("documents", dataTransfer.files);
		setSelectedImages(updatedImages);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 32) {
			e.preventDefault();
		}
	};

	const transformedRooms = formik.values?.room_ids?.map((room) => ({
		id: room._id,
		value: room.roomNumber,
		label: `Room No: ${room.roomNumber}`,
	}));

	useEffect(() => {
		if (formik.values.documents) {
			const selectedImagesArray = Array.from(formik.values.documents);
			setSelectedImages(selectedImagesArray);
		}
	}, [formik.values.documents]);

	useEffect(() => {
		if (bookedData) {
			formik.setValues((p) => ({
				...p,
				...bookedData.data,
				from: new Date(bookedData.data.from),
				to: new Date(bookedData.data.to),
			}));
		}
	}, [bookedData]);

	return (
		<div className={`max-w-xl bg-white rounded-2xl mx-auto p-8`}>
			<h3 className={`text-2xl font-semibold mb-3`}>Check In</h3>
			<hr />
			<form
				autoComplete="off"
				className="form-control grid grid-cols-1 gap-4 mt-5"
				onSubmit={formik.handleSubmit}>
				<div className={`relative col-span-full`}>
					<div className="swiper-controller absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-between w-full px-4 z-10">
						<div className="swiper-er-button-prev flex justify-center items-center bg-green-slimy text-white w-6 h-6 rounded-full cursor-pointer">
							<MdOutlineKeyboardArrowLeft />
						</div>
						<div className="swiper-er-button-next flex justify-center items-center bg-green-slimy text-white w-6 h-6 rounded-full cursor-pointer">
							<MdOutlineKeyboardArrowRight />
						</div>
					</div>
					<Swiper
						modules={[Navigation]}
						navigation={{
							enabled: true,
							prevEl: ".swiper-er-button-prev",
							nextEl: ".swiper-er-button-next",
							disabledClass: "swiper-er-button-disabled",
						}}
						slidesPerView={1}
						spaceBetween={50}>
						{selectedImages.length ? (
							selectedImages.map((image, idx) => (
								<SwiperSlide>
									<div className={`relative`}>
										<div
											className={`absolute top-3 right-3 space-x-1.5`}>
											<label className="relative btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case rounded">
												<TbReplaceFilled />
												<input
													type="file"
													className="absolute left-0 top-0  overflow-hidden h-0"
													onChange={(e) =>
														handleChange(
															idx,
															e.currentTarget
																.files[0]
														)
													}
												/>
											</label>
											<button
												className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
												onClick={() =>
													handleDelete(idx)
												}>
												<FaTrash />
											</button>
										</div>
										<img
											key={idx}
											src={URL.createObjectURL(image)}
											alt=""
											className={`w-full h-96 object-cover rounded`}
										/>
									</div>
								</SwiperSlide>
							))
						) : (
							<img
								src={imgPlaceHolder}
								alt=""
								className={`w-full h-96 object-cover rounded`}
							/>
						)}
					</Swiper>
				</div>

				<div className="flex flex-col gap-3">
					<select
						name="chooseHotels"
						className="input input-md h-8 bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
						value={formik.values.chooseHotels}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}>
						<option value="" selected disabled>
							{hotel?.name}
						</option>

						{/* {hotelsList?.map((i) => (
							<option key={i._id} value={i._id}>
								{i.name}
							</option>
						))} */}
					</select>
				</div>

				<div className="flex flex-col gap-3">
					<Select
						placeholder="Room Select"
						defaultValue={selectedRooms}
						options={transformedRooms}
						isMulti
						isSearchable
						closeMenuOnSelect={false}
						onKeyDown={handleKeyDown}
						onChange={setSelectedRooms}
						noOptionsMessage={() => "No room available"}
						classNames={{
							control: (state) =>
								`!input !input-md !min-h-[3rem] !h-auto !input-bordered !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none ${
									state.isFocused ? "!shadow-none" : ""
								}`,
							valueContainer: () => "!p-0",
							placeholder: () => "!m-0",
						}}
					/>
				</div>

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

				{/* mobile box */}
				<div className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="Mobile number"
						name="mobile"
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

				{/* emergency Number  box */}
				<div className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="Emergency Number"
						name="emergency_contact"
						className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
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

				{/* Address   box */}
				<div className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="Address"
						name="address"
						className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
						value={formik.values.address}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.address &&
					Boolean(formik.errors.address) ? (
						<small className="text-red-600">
							{formik.touched.address && formik.errors.address}
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
					{formik.touched.adult && Boolean(formik.errors.adult) ? (
						<small className="text-red-600">
							{formik.touched.adult && formik.errors.adult}
						</small>
					) : null}
				</div>

				{/* children box */}
				<div className="flex flex-col gap-3">
					<input
						type="number"
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
							{formik.touched.children && formik.errors.children}
						</small>
					) : null}
				</div>

				{/* advanced amount */}

				<div className="flex flex-col gap-3">
					<input
						type="number"
						placeholder="Amount"
						name="amount"
						className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
						value={formik.values.amount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>

				{/* payment method box */}
				{formik.values.amount > 0 && (
					<div className="flex flex-col gap-3">
						<select
							name="paymentMethod"
							className="select select-md bg-transparent select-bordered border-gray-500/50 rounded w-full focus:outline-none"
							value={formik.values.paymentMethod}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}>
							<option value="" selected disabled>
								Payment Method
							</option>
							<option value="Cash">Cash</option>
							<option value="Card">Card</option>
							<option value="Mobile_Banking">
								Mobile Banking
							</option>
						</select>
						{formik.touched.paymentMethod &&
						Boolean(formik.errors.paymentMethod) ? (
							<small className="text-red-600">
								{formik.touched.paymentMethod &&
									formik.errors.paymentMethod}
							</small>
						) : null}
					</div>
				)}

				{formik.values.paymentMethod &&
				formik.values.paymentMethod !== "Cash" ? (
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Transaction ID"
							name="trxID"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none"
							value={formik.values.trxID}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.trxID &&
						Boolean(formik.errors.trxID) ? (
							<small className="text-red-600">
								{formik.touched.trxID && formik.errors.trxID}
							</small>
						) : null}
					</div>
				) : null}

				{/* discount box */}
				<div className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="Discount"
						name="discount"
						className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
						value={formik.values.discount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.discount &&
					Boolean(formik.errors.discount) ? (
						<small className="text-red-600">
							{formik.touched.discount && formik.errors.discount}
						</small>
					) : null}
				</div>

				{/* From Date */}
				<div className="flex flex-col gap-3">
					<DatePicker
						dateFormat="dd/MM/yyyy"
						name="from"
						placeholderText={`From`}
						selected={formik.values.from}
						className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
						onChange={(e) => formik.setFieldValue("from", e)}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.from && Boolean(formik.errors.from) ? (
						<small className="text-red-600">
							{formik.touched.from && formik.errors.from}
						</small>
					) : null}
				</div>

				{/* Billing To box */}
				<div className="flex flex-col gap-3">
					<DatePicker
						dateFormat="dd/MM/yyyy"
						name="to"
						placeholderText={`To`}
						selected={formik.values.to}
						className={`input input-md bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy w-full`}
						onChange={(e) => formik.setFieldValue("to", e)}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.to && Boolean(formik.errors.to) ? (
						<small className="text-red-600">
							{formik.touched.to && formik.errors.to}
						</small>
					) : null}
				</div>

				{/* type Of Documents  box */}
				<div className="flex flex-col gap-3">
					<select
						name="documentsType"
						className="select select-md bg-transparent select-bordered border-gray-500/50 p-2 rounded w-full focus:outline-none"
						value={formik.values.documentsType}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}>
						<option value="" selected disabled>
							Type Of Documents
						</option>
						<option value="adarCard">Adar Card</option>
						<option value="passport">Passport</option>
						<option value="drivingLicense">Driving Licence</option>
						<option value="nid">NID</option>
					</select>
					{formik.touched.documentsType &&
					Boolean(formik.errors.documentsType) ? (
						<small className="text-red-600">
							{formik.touched.documentsType &&
								formik.errors.documentsType}
						</small>
					) : null}
				</div>

				{formik.values.documentsType &&
				formik.values.documentsType !== "nid" ? (
					<div className="flex flex-col gap-3">
						<input
							type="text"
							placeholder="Documents Number"
							name="documentsNumber"
							className="input input-md input-bordered bg-transparent rounded w-full border-gray-500/50 focus:outline-none p-2"
							value={formik.values.doc_number}
							onChange={(e) =>
								formik.setFieldValue(
									"doc_number",
									e.target.value
								)
							}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.doc_number &&
						Boolean(formik.errors.doc_number) ? (
							<small className="text-red-600">
								{formik.touched.doc_number &&
									formik.errors.doc_number}
							</small>
						) : null}
					</div>
				) : null}

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

				{/* documents */}
				<div className={`flex space-x-1.5`}>
					<div className="flex flex-col gap-3 w-full">
						<label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded  focus:outline-none bg-transparent">
							{formik.values.documents ? (
								<span>
									{formik.values.documents.length + " files"}
								</span>
							) : (
								<span
									className={`flex items-baseline space-x-1.5`}>
									<FaUpload />
									<span>Choose documents</span>
								</span>
							)}

							<input
								type="file"
								multiple
								name="documents"
								className="absolute left-0 top-0  overflow-hidden h-0"
								onChange={(e) =>
									formik.setFieldValue(
										"documents",
										e.currentTarget.files
									)
								}
								onBlur={formik.handleBlur}
							/>
						</label>
						{formik.touched.documents &&
						Boolean(formik.errors.documents) ? (
							<small className="text-red-600">
								{formik.touched.documents &&
									formik.errors.documents}
							</small>
						) : null}
					</div>
				</div>

				{/* button */}
				<div className={`flex justify-between`}>
					<button
						type={"submit"}
						className="btn btn-md w-full bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case">
						Confirm
						{bookingLoading ? (
							<span
								className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
								role="status"></span>
						) : null}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CheckIn;
