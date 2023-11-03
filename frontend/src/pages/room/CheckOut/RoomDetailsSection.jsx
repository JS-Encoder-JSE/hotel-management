import React from "react";

const RoomDetailsSection = ({ selectedRooms }) => {
    console.log(selectedRooms);
  return (
    <section className="bg-white p-4 rounded">
      <table className="w-full border border-black/20 text-sm">
        <thead className="bg-[#e5e7eb] border border-black/20">
          <tr className="grid grid-cols-5 items-center text-left">
            <th className="py-1 px-3 text-black text-sm font-medium border-r border-black/20">
              Room No.
            </th>
            <th className="py-1 px-3 text-black text-sm font-medium border-r border-black/20">
              Date
            </th>
            <th className="col-span-3 text-center text-black text-sm font-medium">
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

            <td className="pt-1 px-3 border-r border-black/20 space-y-2">
              <p className="text-sm">23rd Feb 12:00 to 24th Feb 10:00</p>
              <hr />
              <p className="text-sm text-slate-400 font-light">Adult: 3</p>
              <hr />
              <p className="text-sm text-slate-400 font-light">Children: 0</p>
            </td>

            <td className="col-span-6 p-1 overflow-x-auto">
              <table className="bg-[#e5e7eb]">
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
                      ($) Rent Discount
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Dis./Day
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Amt.Aft Dis
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Tot.Rent
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) VAT/GST
                    </td>
                    <td className="p-2 border border-black/20 align-bottom font-medium">
                      ($) Tot.Amt
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
                    <td className="p-2 border border-black/20 align-top text-xs">
                      (RST3.00% ) 120 (GST4.00% ) 160 (DST4.00% ) 160 (MSL3.50%
                      ) 140
                    </td>
                    <td className="p-2 border border-black/20 align-top text-xs">
                      4580
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
