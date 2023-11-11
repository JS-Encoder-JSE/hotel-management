import React, { useEffect, useState } from "react";
import { FaDoorOpen, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import EditBooking from "./EditBooking.jsx";
import { useUpdateBookingMutation } from "../../redux/room/roomAPI.js";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BookingLists = ({ bookingList, setCurrentPage }) => {
	const navigate = useNavigate();
	const [updateBooking, { isLoading: isCancelledLoading, error }] = useUpdateBookingMutation();
	// const [bookingPerPage] = useState(10);
	// const [pageCount, setPageCount] = useState(0);
	const handlePageClick = ({ selected: page }) => {
		setCurrentPage(page);
	};

	// console.log(bookingList)
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Booking will be delete.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#35bef0",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Deleted!",
					showConfirmButton: false,
					timer: 1500,
				}).then(() => {
					updateBooking({ id, data: { status: "Canceled" } });
				});
			}
		});
	};

	const [editBookedData, setEditBookedData] = useState(null);
	return (
		<div>
			<div className="overflow-x-auto border">
				{bookingList ? (
					<table className="table">
						<thead>
							<tr className={`text-lg`}>
								<th>Name</th>
								<th>Phone</th>
								<th>
									Booking <br /> Amount
								</th>
								<th>
									Booking <br /> Date
								</th>
								<th>From</th>
								<th>To</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{bookingList?.data.docs.map((item, idx) => {
								return (
									<tr
										className={
											idx % 2 === 0
												? "bg-gray-100 hover"
												: "hover"
										}>
										<td>
											<div className="flex items-center space-x-3">
												<div>
													<div className="font-bold">
														{item.guestName}
													</div>
													<div className="text-sm opacity-50">
														Rooms:{" "}
														{item.room_ids.map(
															(i) => i.roomNumber
														)}
													</div>
												</div>
											</div>
										</td>
										<td>{item?.mobileNumber}</td>
										<td>{item?.amount}</td>
										<td>
											{new Date(
												item?.createdAt
											).toLocaleString()}
										</td>
										<td>
											{new Date(
												item?.to
											).toLocaleString()}
										</td>
										<td>
											{new Date(
												item?.from
											).toLocaleString()}
										</td>

										<td className={`space-x-1.5`}>
											<span
												className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
												title={`View`}
												onClick={() =>
													navigate(`${item._id}`)
												}>
												<FaEye />
											</span>
											{/* <span
                      className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
                      title={`chekin`}
                    
                    >
                      <FaDoorOpen />
                    </span> */}
											<span>
												<button
													className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
													onClick={() =>
														navigate(
															`/dashboard/checkin/${item._id}`
														)
													}>
													<FaDoorOpen />
												</button>
											</span>
											<span
												className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
												title={`Edit`}
												onClick={() => {
													setEditBookedData(item);
													window.eb_modal.showModal();
												}}>
												<FaEdit />
											</span>
											<button
												onClick={() => {
													handleDelete(item?._id);
												}}
												className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
												title={`Delete`}>
												<FaTrash />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<p className="text-center">Please Choose Hotel</p>
				)}
				<Modal id={`eb_modal`}>
				{editBookedData&&	<EditBooking data={editBookedData} />}
				</Modal>
			</div>
			{bookingList?.data?.docs?.length && (
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
						pageCount={bookingList?.data?.totalPages}
						pageRangeDisplayed={2}
						marginPagesDisplayed={2}
						onPageChange={handlePageClick}
						renderOnZeroPageCount={null}
					/>
				</div>
			)}
		</div>
	);
};

export default BookingLists;
