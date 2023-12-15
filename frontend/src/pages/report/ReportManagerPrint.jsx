// import PaymentMethod from "./PaymentMethod";
// import CustomerInfoSection from "./CustomerInfoSection";
// import RoomDetailsSection from "./RoomDetailsSection";
// import { FaTrash } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import PaymentMethodPrint from "./PaymentMethodPrint";
// import BalanceDetailsPrint from "./BalanceDetailsPrint";
// import CustomerInfoPrint from "./CustomerInfoPrint";
// import { useSelector } from "react-redux";
// import AuthoInfoPrint from "./AuthoInfoPrint";
import logo from "../../assets/logo.png";
// import BillingSection from "./BillingSection";
// import BillingSectionPrint from "./BillingSectionPrint";
// import { useGetHotelByManagerIdQuery } from "../../../redux/room/roomAPI";
// import { versionControl } from "../../../utils/utils";

// current date
// const currentDate = new Date();

// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
// const day = String(currentDate.getDate()).padStart(2, "0");

// const formattedDate = `${year}-${month}-${day}`;

const ReportManagerPrint = (
  {
    // data,
    // paymentList,
    // setPll,
    // hotelInfo,
    // isHotelSuccess,
    // roomData,
  }
) => {
  // const {
  //   calculateBalance,
  //   calculateCollectedAmount,
  //   calculatePayableAmount,
  //   additionalCharge,
  //   serviceCharge,
  //   texAmount,
  // } = useSelector((state) => state.checkoutInfoCalSlice);
  // const totalPayableAmount =
  //   calculatePayableAmount + additionalCharge + serviceCharge + texAmount;
  return (
    <div>
      <div>
        <div className={`text-center mb-6`}>
          <img className="w-24 h-24 mx-auto p-2" src={logo} alt="logo" />
          <h1 className="font-bold text-2xl">DAK Hospital LTD</h1>
          <span>Customer Receipt</span> <br />
          <span>Issue Date:</span>
        </div>
      </div>

      {/* invoice From */}
      <div className="">
        <div>
          <div className="grid grid-cols-2 gap-24 px-5 mr-5">
            <div>
              <h2 className="font-bold">Invoice From</h2>
              <div>
                <div className="grid grid-cols-2 ">
                  <p>Hotel Name</p>
                  <p>:Dak Hospitality</p>
                </div>

                <div className="grid grid-cols-2">
                  <p>Email</p>
                  <p className="">
                    :dakhospitlky@gmail.com
                  </p>
                </div>

                <div className="grid grid-cols-2">
                  <p>Phone</p>
                  <p>:+884854654</p>
                </div>

                <div className="grid grid-cols-2">
                  <p>Address</p>
                  <p>:India</p>
                </div>
              </div>
            </div>
            <div className="py-2 ">
              <h2 className="font-bold">Invoice To</h2>
              <div className="flex gap-4 items-center">
                <div className="grid grid-cols-2">
                  <p>Name</p>
                  <p>:Dak Hotel</p>
                  <p>Phone</p>
                  <p>:+8545646</p>
                  <p>Address</p>
                  <p>:India</p>
                </div>
              </div>
            </div>
          </div>

          {/* blance info */}
          <div className=" px-4 py-2">
            <h2 className="font-bold">Balance Summary</h2>
            <div className="flex flex-col items-start">
              <div className="grid grid-cols-2 gap-9  ">
                <p>Advanced Balance</p>
                <p>:2500</p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-2 ">
                  <p>Total Payable Amount</p>
                  <p>:2510</p>
                </div>
              </div>
            </div>
          </div>
          {/* blance info */}
        </div>
      </div>

      {/* payment method */}
      <section className="bg-white p-4 rounded">
        <table className="w-full border border-black/20 text-sm">
          <thead className="bg-[#e5e7eb] border border-black/20">
            <tr className="grid grid-cols-8 items-center text-left">
              <th className="py-1 px-3 text-black text-sm font-medium border-r border-black/20">
                Room No
              </th>
              <th className="col-span-7 text-center text-black text-sm font-medium">
                Room Rent List
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-8 text-left">
              <td className="py-1 px-3 border-r border-black/20">100</td>

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
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-black/20 align-top text-xs"></td>
                      <td className="p-2 border border-black/20 align-top text-xs"></td>
                      <td className="p-2 border border-black/20 align-top text-xs"></td>
                      <td className="p-2 border border-black/20 align-top text-xs"></td>
                      <td className="p-2 border border-black/20 align-top text-xs"></td>
                      <td className="p-2 border border-black/20 align-top text-xs">
                        %
                      </td>
                      <td className="p-2 border border-black/20 align-top text-xs"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Billing section */}
      <section>
        <div className=" grid grid-cols-4 px-5">
          <div className="space-y-2">
            <p>SubTotal</p>
            {/* <p>Tax</p> */}
            <p>Additional Changes</p>
            <p>Service Charge</p>
            <p>Room Posted Bill</p>
            <p>Tex Amount</p>
            <p className="text-lg font-bold">GrandTotal</p>
          </div>
          <div className="space-y-2">
            <p>: Rs.</p>
            <p>: Rs.</p>
            <p>: Rs.</p>
            <p>: Rs.</p>
            <p>: Rs.</p>
            <p>: Rs.</p>
          </div>
        </div>
      </section>
      {/* Billing section */}

      <div className="text-xs px-4 mt-5">
        <h1 className="font-semibold">TERMS & CONDITIONS</h1>
        <ol className="list-decimal p-4 text-gray-500">
          <li>
            Terms of Use Our Site may use "cookies"to enhance User experience
          </li>
          <li>
            User's web browser places cookies on their hard drive for
            record-keeping purposes and sometimes to track information about
            them
          </li>
          <li>
            User may choose to set their web browser to refuse cookies, or to
            alert you when cookies are being sen
          </li>
          <li>
            If they do so, note that some parts of the Site may not function
            properly
          </li>
        </ol>
      </div>
      <div className="absolute bottom-0 w-full my-10">
        <div className="p-4 flex justify-between">
          <div>
            <p>__________________</p>
            <p>Guest Signature</p>
          </div>
          <div>
            <p>_______________________</p>
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>
      <h1 className="text-center absolute bottom-0 pb-2 w-full">
        Powered by <span className="text-xl text-green-slimy">JS Encoder</span>.
        Copyright © 2023. All rights reserved.Version
        {/* {versionControl} */}
      </h1>
    </div>
  );
};
export default ReportManagerPrint;
