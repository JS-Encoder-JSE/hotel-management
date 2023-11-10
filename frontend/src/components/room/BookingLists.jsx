import React, { useState } from "react";
import { FaDoorOpen, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import EditBooking from "./EditBooking.jsx";

const BookingLists = ({ bookingList, setCurrentPage }) => {
	const navigate = useNavigate();
	// const [bookingPerPage] = useState(10);
	// const [pageCount, setPageCount] = useState(0);
	const handlePageClick = ({ selected: page }) => {
		setCurrentPage(page);
	};
	// "_id": "654dd87a1baa8311561d8e16",
	// "room_ids": [
	// 	"654dce531baa8311561d8bf0"
	// ],
	// "hotel_id": "654a14726bb8816a0a034569",
	// "guestName": "test",
	// "address": "dhaka",
	// "mobileNumber": "0123455",
	// "emergency_contact": "2342343242",
	// "adult": 3,
	// "children": 3,
	// "paymentMethod": "Cash",
	// "transection_id": "",
	// "amount": 0,
	// "total_amount": 0,
	// "paid_amount": 0,
	// "total_unpaid_amount": 0,
	// "discount": 44,
	// "from": "2023-11-17T18:00:00.000Z",
	// "to": "2023-11-24T18:00:00.000Z",
	// "status": "Active",
	// "nationality": "bd",
	// "doc_number": "",
	// "__v": 0

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
														Hasan
													</div>
													<div className="text-sm opacity-50">
														Rooms: 1, 2
													</div>
												</div>
											</div>
										</td>
										<td>{item?.mobileNumber}</td>
										<td>i{item?.amount}</td>
										<td>{item?.createdAt}</td>
										<td>{item?.to}</td>
										<td>{item?.from}</td>

										<td className={`space-x-1.5`}>
											<span
												className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
												title={`View`}
												onClick={() =>
													navigate(`${++idx}`)
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
												onClick={() =>
													window.eb_modal.showModal()
												}>
												<FaEdit />
											</span>
											<span
												className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
												title={`Delete`}>
												<FaTrash />
											</span>
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
					<EditBooking />
				</Modal>
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
					pageCount={bookingList?.data?.totalPages}
					pageRangeDisplayed={2}
					marginPagesDisplayed={2}
					onPageChange={handlePageClick}
					renderOnZeroPageCount={null}
				/>
			</div>
		</div>
	);
};

export default BookingLists;
