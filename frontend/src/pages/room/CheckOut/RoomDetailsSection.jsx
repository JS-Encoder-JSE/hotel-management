import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAmountAfterDis,
  setBookingId,
} from "../../../redux/add-order/addOrderSlice";
import { getDiscountAmount } from "../../../utils/utils";
import { updateSubTotal } from "../../../redux/checkoutInfoCal/checkoutInfoCalSlice";

const RoomDetailsSection = ({ data, roomData, bookingInfo }) => {
  // console.log(bookingInfo)
  const billingState = useSelector((state) => state.checkoutInfoCalSlice);

  // const {bookingInfo}= billingState
  const dispatch = useDispatch();
  const totalRoomRent = billingState?.calculateNOD * roomData?.rent_per_day;
  const discountPerRoom = (totalRoomRent * bookingInfo?.room_discount) / 100;

  const { subTotals } = billingState;


  // const discountPerRoom = getDiscountAmount(
  //   roomData?.total_room_rent,
  //   bookingInfo?.room_discount
  // );
  const amountAfterDis = Math.ceil(totalRoomRent - discountPerRoom);

    dispatch(updateSubTotal(amountAfterDis))

  // console.log(roomData?.total_room_rent, discountPerRoom);
  useEffect(() => {
    !isNaN(amountAfterDis) ? dispatch(setAmountAfterDis(amountAfterDis)) : "";
    dispatch(setBookingId(roomData?._id));
  }, [data]);

    dispatch(setAmountAfterDis(amountAfterDis));
 

  // const afterDiscountAm = roomData?.total_room_rent - discountAmount
  // console.log(discountAmount,"disco",afterDiscountAm)

  return (
    <section className="bg-white p-4 rounded">
      <table className="w-full border border-black/20 text-sm">
        <thead className="bg-[#e5e7eb] border border-black/20">
          <tr className="grid grid-cols-8 items-center text-left">
            <th className="py-1 px-3 text-black text-sm font-medium border-r border-black/20">
              Room No.
            </th>
            <th className="col-span-7 text-center text-black text-sm font-medium">
              Room Rent List
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="grid grid-cols-8 text-left">
            <td className="py-1 px-3 border-r border-black/20">
              {/* {data?.[0]?.room_ids
                ?.map((i) => `${i?.roomNumber} - ${i?.category}`)
                .join(", ")} */}
              {roomData?.room_id?.roomNumber}
              {/*{selectedRooms.map((room, index) => (*/}
              {/*  <div key={index}>*/}
              {/*    <p className="font-semibold">{room.label}</p>*/}
              {/*    /!* <p className="text-xs text-slate-400 font-light">VIP Guest</p> *!/*/}
              {/*    <hr className="my-2" />*/}
              {/*  </div>*/}
              {/*))}*/}
            </td>

            <td className="col-span-7 p-1 overflow-x-auto">
              <table className="bg-[#e5e7eb] w-full">
                <tbody>
                  <tr>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      From Date
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      To Date
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      NoD
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Rent/Day
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Total Rent
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Discount/Room
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Amount After Discount
                    </td>
                    {/* <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Discount
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Amount After Discount
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Paid Amount
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      (Rs.) Unpaid Amount
                    </td> */}
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {new Date(roomData?.from).toLocaleDateString()}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {new Date(billingState?.toDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {billingState?.calculateNOD}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {roomData?.rent_per_day}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {totalRoomRent}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {bookingInfo?.room_discount}%
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {Math.ceil(amountAfterDis)}
                    </td>
                    {/* <td className="p-2 border border-black/20 align-top text-xs">
                      {data?.[0]?.discount.toFixed(2)}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {data?.[0]?.amount_after_dis.toFixed(2)}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {data?.[0]?.paid_amount.toFixed(2)}
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      {data?.[0]?.total_unpaid_amount.toFixed(2)}
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default RoomDetailsSection;
