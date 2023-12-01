import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaDoorOpen, FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditBooking from "../../components/room/EditBooking.jsx";
import Modal from "../../components/Modal.jsx";
import { useGetBookingByIdQuery, useGetBookingInfoByIdQuery, useGetRoomPostedBillsQuery } from "../../redux/room/roomAPI.js";
import CheckInDyn from "./CheckInDyn.jsx";
import CheckinCardDetails from "./CheckOut/CheckinCardDetails.jsx";
import TransactionHistoryCard from "../../components/Manage-CheckIn/TransactionHistoryCard.jsx";
import PaymentMethodCard from "../../components/Manage-CheckIn/PaymentMethodCard.jsx";
import RoomRentDetails from "../../components/Manage-CheckIn/RoomRentDetails.jsx";
import TransactionHistory from "../../components/Admin/TransactionHistory.jsx";
import RestaurantBillsCard from "../../components/Manage-CheckIn/RestaurantBillsCard.jsx";
import GymBills from "../../components/Manage-CheckIn/GymBills.jsx";
import PoolsBill from "../../components/Manage-CheckIn/PoolsBill.jsx";
import { MdOutlineHail } from "react-icons/md";


const CheckinPersonInfo = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: booking, isLoading } = useGetBookingInfoByIdQuery(id);

  
  useEffect(() => {
    const roomId = booking?.data?.room_id?._id;
    setRoomId(roomId);
  }, [booking]);
  

  const { data:postedBill, error, isLoadingPostedBill } = useGetRoomPostedBillsQuery(roomId);

  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (data && modalOpen) {
      window.ci_modal.showModal();
      setModalOpen(false);
    }
  }, [modalOpen]);



const documentTypes = {
  driving_lic_img: booking?.data?.doc_images?.driving_lic_img,
  nid: booking?.data?.doc_images?.nid,
  passport: booking?.data?.doc_images?.passport
};

const validDocumentTypeKey = Object.keys(documentTypes).find(
  key => documentTypes[key] && documentTypes[key].length !== 0
);

const validDocumentType = documentTypes[validDocumentTypeKey]?.filter(value => value !== "") || [];



  return (
   <>
    <div className={`bg-white p-10 rounded-2xl space-y-8`}>
      <div className={`flex justify-between`}>
        <div
          className={`inline-flex bg-green-slimy text-white border border-green-slimy items-center space-x-1.5 hover:bg-transparent hover:text-green-slimy cursor-pointer px-3 py-1 rounded transition-colors duration-500`}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </div>
        <div className={`space-x-1.5`}>
         <span
       onClick={()=> navigate(`/dashboard/checkout?room=${roomId}`)}
         >
         <span
            className={`btn btn-sm bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy rounded normal-case`}
            title={`Check In`}
            
          >
           <MdOutlineHail />
          </span>
         </span>
          <span
            className={`btn btn-sm bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy rounded normal-case`}
            title={`Edit`}
            onClick={() => window.eb_modal.showModal()}
          >
            <FaEdit />
          </span>
        </div>
      </div>
      <div className={`flex justify-around flex-col lg:flex-row gap-10 lg:gap-16`}>
        <div>
          <h3 className={`text-2xl font-semibold mb-3`}>
            Customer Information
          </h3>
          <table>
            <tbody>
              <tr>
                <th className={`text-start`}>Name</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.guestName}</td>
              </tr>
              <tr>
                <th className={`text-start`}>Phone</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.mobileNumber}</td>
              </tr>
              <tr>
                <th className={`text-start`}>
                  Emergency <br /> Contact
                </th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.emergency_contact}</td>
              </tr>
              {/* <tr> */}
                {/* <th className={`text-start `}>
                  Document <br /> Type
                </th>
                <td className={`w-4 text-center`}>:</td>
                <td>{validDocumentType}</td>
              </tr>
              <tr>
                <th className={`text-start `}>
                  Document <br /> Number
                </th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.doc_number}</td>
              </tr> */}
              {/* <tr>
                <th className={`text-start `}>
                  Document <br /> Download
                </th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.emergency_contact}</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className={`text-2xl font-semibold mb-3`}>CheckIn Information</h3>
          <table>
            <tbody>
            {/* <tr>
                <th className={`text-start`}>Booking Mathod</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.bookingMethod}</td>
              </tr> */}
              {/* <tr>
                <th className={`text-start`}>Booking Date</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{new Date(booking?.data?.createdAt).toLocaleString()}</td>
              </tr> */}
              {/* <tr>
                <th className={`text-start`}>Booking No</th>
                <td className={`w-4 text-center`}>:</td>
                {/* <td>{data?.data?._id}</td>  
              </tr> */}
              
              <tr>
                <th className={`text-start`}>Room No</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.room_id?.roomNumber}</td>
              </tr>
              <tr>
                <th className={`text-start`}>Floor No</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.room_id?.floorNumber}</td>
              </tr>
              <tr>
                <th className={`text-start`}>Adult</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.adult}</td>
              </tr>
              <tr>
                <th className={`text-start`}>Children</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.children}</td>
              </tr>
              {/* <tr>
                <th className={`text-start`}>Payment Method</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.paymentMethod}</td>
              </tr> */}
              {/* <tr>
                <th className={`text-start`}>Advanced payment</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.paid_amount}</td>
              </tr> */}
              <tr>
                <th className={`text-start`}>From</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{new Date(booking?.data?.from).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th className={`text-start`}>To</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{new Date(booking?.data?.to).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th className={`text-start`}>Status</th>
                <td className={`w-4 text-center`}>:</td>
                <td>{booking?.data?.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Modal id={`ci_modal`}>
        <CheckInDyn data={data} />
      </Modal>
      <Modal id={`eb_modal`}>
        {booking?.data && <EditBooking data={booking?.data} />}
      </Modal>
    </div>
    <div className="mb-20 mt-10">
      <CheckinCardDetails data={booking?.data} />
    </div>
    {/* payment system */}
    <div >
            <PaymentMethodCard/>
      </div>
      {/* Room rent */}
      {/* <div className="mt-20">
        <RoomRentDetails/>
      </div> */}
      
      {/*  Bill system*/}
      <div 
      // className={`grid grid-cols-[repeat(auto-fit,_minmax(5.5rem,_1fr))]  mb-20`}
      className="grid md:grid-cols-3 gap-3"
      >
<div >
<RestaurantBillsCard food_bills={postedBill?.data?.food_bills}/>
</div>
<div >
  <GymBills GymBill={postedBill?.data?.gym_bills
}/>
</div>
<div>
  <PoolsBill poolBills={postedBill?.data?.pool_bills
}/>
</div>
      </div>
   </>
  );
};

export default CheckinPersonInfo;
