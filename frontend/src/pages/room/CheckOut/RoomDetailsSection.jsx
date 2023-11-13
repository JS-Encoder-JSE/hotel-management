import React from "react";

const RoomDetailsSection = ({ selectedRooms }) => {
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
              {selectedRooms.map((room, index) => (
                <div key={index}>
                  <p className="font-semibold">{room.label}</p>
                  {/* <p className="text-xs text-slate-400 font-light">VIP Guest</p> */}
                  <hr className="my-2" />
                </div>
              ))}
            </td>

            <td className="col-span-7 p-1 overflow-x-auto">
              <table className="bg-[#e5e7eb] w-full">
                <tbody>
                  <tr>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      1 #
                    </td>
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
                      ($) Rent/Day
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Total Rent
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Discount
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Paid Amount
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Unpaid Amount
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      1
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      2023-02-23 12:00:00
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      2023-02-24 10:00:00
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      1
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      4000
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      0
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      0
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      4000
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      4000
                    </td>
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
