import React, { useState } from "react";
import Select from "react-select";
import CustomerInfoSection from "./CustomerInfoSection";
import RoomDetailsSection from "./RoomDetailsSection";
import BillingSection from "./BillingSection";
import PaymentSection from "./PaymentSection";
import {
  useGetRoomsAndHotelsQuery,
	useRoomNumbersQuery,
	useRoomsQuery,
} from "../../../redux/room/roomAPI";

const CheckOut = () => {
	const { isLoading, data: rooms } = useRoomNumbersQuery();
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [showRooms, setShowRooms] = useState(false);

	const handleGetRooms = () => {
		setShowRooms(true);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 32) {
			e.preventDefault();
		}
	};

	const transformedRooms = rooms?.data?.map((room) => ({
		value: room.roomNumber,
		label: `${room.roomNumber} - ${room.category}`,
	}));

	const { data: hotelsList } = useGetRoomsAndHotelsQuery();
	return (
		<div className="space-y-8">
			<div className="max-w-3xl mx-auto flex gap-5 items-center"></div>
			{/* Select Room Section */}
			<section className="max-w-3xl mx-auto flex gap-5 items-center justify-start">
				<select
					name="chooseHotels"
					className="input input-md  bg-transparent input-bordered border-gray-500/50 rounded focus:outline-none focus:border-green-slimy"
					// 		value={formik.values.chooseHotels}
					// 		onChange={formik.handleChange}
					// onBlur={formik.handleBlur}
				>
					<option value="" selected disabled>
						Choose Hotel
					</option>
					{hotelsList?.map((i) => (
						<option key={i._id} value={i._id}>
							{i.name}
						</option>
					))}
        </select>
        


				<p>Room No. :</p>
				<div className="w-[353px]">
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
								`!input !input-md !min-h-[3rem] !h-auto !input-bordered !bg-transparent !rounded !w-full !border-gray-500/50 focus-within:!outline-none
								${
									state.isFocused ? "!shadow-none" : ""
								}`,
							valueContainer: () => "!p-0",
							placeholder: () => "!m-0",
						}}
					/>
				</div>
				<button
					onClick={handleGetRooms}
					disabled={selectedRooms.length === 0}
					className=" btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case p-4 h-auto">
					Go
				</button>
			</section>

			{/* Customer Info and Set them to default */}
			{showRooms && (
				<>
					<CustomerInfoSection />
					<RoomDetailsSection selectedRooms={selectedRooms} />
					<BillingSection />
					<PaymentSection />
				</>
			)}
		</div>
	);
};

export default CheckOut;
