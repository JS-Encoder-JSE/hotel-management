import React from "react";
import { FaArrowLeft, FaDoorOpen, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import EditBooking from "../../components/room/EditBooking.jsx";
import Modal from "../../components/Modal.jsx";
import { useGetBookingByIdQuery } from "../../redux/room/roomAPI.js";

const BookingView = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data, isLoading } = useGetBookingByIdQuery(id);

	console.log(data?.data);
	return (
		<div className={`bg-white p-10 rounded-2xl space-y-8`}>
			<div className={`flex justify-between`}>
				<div
					className={`inline-flex bg-green-slimy text-white border border-green-slimy items-center space-x-1.5 hover:bg-transparent hover:text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
					onClick={() => navigate(-1)}>
					<FaArrowLeft />
					<span>Back</span>
				</div>
				<div className={`space-x-1.5`}>
					<span
						className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
						title={`Check In`}
						onClick={() => navigate(`/dashboard/checkin/${id}`)}>
						<FaDoorOpen />
					</span>
					<span
						className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
						title={`Edit`}
						onClick={() => window.eb_modal.showModal()}>
						<FaEdit />
					</span>
				</div>
			</div>
			<div className={`flex flex-col lg:flex-row gap-10 lg:gap-16`}>
				<div>
					<h3 className={`text-2xl font-semibold mb-3`}>
						Customer Information
					</h3>
					<table>
						<tbody>
							<tr>
								<th className={`text-start`}>Name</th>
								<td className={`w-4 text-center`}>:</td>
								<td>{data?.data?.guestName}</td>
							</tr>
							<tr>
								<th className={`text-start`}>Phone</th>
								<td className={`w-4 text-center`}>:</td>
								<td>{data?.data?.mobileNumber}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<h3 className={`text-2xl font-semibold mb-3`}>
						Booking Information
					</h3>
					<table>
						<tbody>
							<tr>
								<th className={`text-start`}>Booking Date</th>
								<td className={`w-4 text-center`}>:</td>
								<td>
									{new Date(
										data?.data?.createdAt
									).toLocaleString()}
								</td>
							</tr>
							{/* <tr>
                <th className={`text-start`}>Booking No</th>
                <td className={`w-4 text-center`}>:</td>
                {/* <td>{data?.data?._id}</td>  
              </tr> */}
							<tr>
								<th className={`text-start`}>Room No</th>
								<td className={`w-4 text-center`}>:</td>
								<td>
									{data?.data?.room_ids?.map(
										(i) => i.roomNumber
									)}
								</td>
							</tr>
							<tr>
								<th className={`text-start`}>
									Advanced payment
								</th>
								<td className={`w-4 text-center`}>:</td>
								<td>
									{
										data?.data?.amount
									}
								</td>
							</tr>
							<tr>
								<th className={`text-start`}>From</th>
								<td className={`w-4 text-center`}>:</td>
								<td>
									{new Date(
										data?.data?.from
									).toLocaleString()}
								</td>
							</tr>
							<tr>
								<th className={`text-start`}>To</th>
								<td className={`w-4 text-center`}>:</td>
								<td>
									{new Date(data?.data?.to).toLocaleString()}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<Modal id={`eb_modal`}>
				{data?.data && <EditBooking data={data?.data} />}
			</Modal>
		</div>
	);
};

export default BookingView;
