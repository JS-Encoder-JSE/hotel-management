import React, { useState } from "react";

const CustomerInfoSection = ({ selectedRooms }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    new Array(selectedRooms.length).fill(true)
  );

  const toggleCheckbox = (index) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setSelectedCheckboxes(updatedCheckboxes);
  };

  return (
      <section className="bg-white rounded">
        <h3 className="p-5 text-xl">Customer Details</h3>
        <hr />
        <div className="p-5 grid grid-cols-4 items-center text-sm font-semibold">
          <div className="space-y-3">
            <p>Name</p>
            <p>Room No..</p>
            <p>Email ID</p>
            <p>Mobile No</p>
            <p>Address</p>
            <p>Time Format</p>
            <p>Booking Time</p>
            <p>Booking Source</p>
          </div>
          <div className="col-span-3 space-y-3">
            <p>Tajkir _ Rion</p>
            <p>108</p>
            <p>dev.tajkir@gmail.com</p>
            <p>0123456789101</p>
            <p>Banglamotor, Dhaka</p>
            <p>24 hrs</p>
            <input
              type="text"
              disabled
              placeholder="Instant"
              className="pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed block"
            />
            <input
              type="text"
              disabled
              placeholder="JS Encoder"
              className="pl-5 bg-transparent border-b focus:border-green-slimy cursor-not-allowed block"
            />
          </div>
        </div>
      </section>
  );
};

export default CustomerInfoSection;
