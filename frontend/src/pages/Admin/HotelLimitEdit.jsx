import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Rings } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useUpdateUserMutation } from "../../redux/admin/subadmin/subadminAPI";
const HotelLimitEdit = ({ hotels }) => {
	const [updateUser, { isLoading, error, isError, isSuccess }] =
		useUpdateUserMutation();
	const closeRef = useRef(null);
	const [user, setUser] = useState(0);
	const { id } = useParams();
	const increment = () => {
		setUser(user + 1);
	};
	const decrement = () => {
		if (user > 0) {
			setUser(user - 1);
		} else {
			setUser(0);
		}
	};

	const handleHotelNumChange = () => {
		if (hotels === user) return "";
		updateUser({ id, data: { maxHotels: user } });
	};

	useEffect(() => {
		isSuccess && (closeRef.current.click(), Swal.fire("Updated"));
		isError &&
			(closeRef.current.click(), toast.success(error?.data?.message));
	}, [error, isSuccess, isError]);

	useEffect(() => {
		setUser(hotels);
	}, [hotels]);

	return (
		<>
			<Toaster />
			<form autoComplete="off" method="dialog">
				<button
					ref={closeRef}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					onClick={() => formik.handleReset()}>
					✕
				</button>
			</form>
			<div className={`flex flex-col gap-10 mt-10`}>
				<div className="flex gap-5">
					<h2 className="mt-1">Number Of Hotels :</h2>
					<div className={`flex gap-1.5`}>
						{/* decrement */}
						<button
							onClick={decrement}
							className="btn btn-sm bg-white input-bordered border-gray-500 rounded">
							<AiOutlineMinus />
						</button>
						<h1 className="btn btn-sm bg-white input-bordered border-gray-500 rounded">
							{user}
						</h1>
						{/* increment */}
						<button
							onClick={increment}
							className="btn btn-sm bg-white input-bordered border-gray-500 rounded">
							<AiOutlinePlus />
						</button>
					</div>
					<div>
						<button
							onClick={handleHotelNumChange}
							className="btn btn-sm bg-white input-bordered border-gray-500 rounded normal-case">
							{isLoading ? (
								<Rings
									width="50"
									height="50"
									color="#37a000"
									wrapperClass="flex items-center"
								/>
							) : (
								"Save"
							)}
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="table border">
						<thead>
							<tr>
								<th>Sl</th>
								<th>Hotel Name</th>
								<th>Hotel Branch</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{[...Array(5)].map((_, idx) => {
								return (
									<tr
										className={
											idx % 2 === 0
												? "bg-gray-100 hover"
												: "hover"
										}>
										<th> {++idx}</th>
										<td className="font-bold">Jon Doe</td>
										<td>Motijheel</td>
										<td className={`space-x-1.5`}>
											<span
												className={`btn btn-sm bg-transparent hover:bg-red-500 text-red-500 hover:text-white !border-red-500 rounded normal-case ms-2`}
												onClick={() =>
													navigate(
														`/dashboard/adminowner-view/${idx}`
													)
												}>
												<MdDelete />
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default HotelLimitEdit;
