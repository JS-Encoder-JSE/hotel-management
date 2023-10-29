import React, { useState } from "react";

const CustomerInfoSection = ({ selectedRooms }) => {
  //   console.log(selectedRooms);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    new Array(selectedRooms.length).fill(true)
  );

  const toggleCheckbox = (index) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setSelectedCheckboxes(updatedCheckboxes);
  };

  return (
    <section className="grid lg:grid-cols-2 gap-5">
      {/* Left Side */}
      <div className="bg-white rounded">
        <h3 className="p-5 text-xl">Customer Details</h3>
        <hr />
        <div className="p-5 grid grid-cols-3 items-center text-sm font-semibold">
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
          <div className="col-span-2 space-y-3">
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
      </div>

      {/* Right Side */}
      <div className="bg-white rounded">
        <h3 className="p-5 text-xl">Room List</h3>
        <hr />
        <div className="p-5 max-h-[450px] overflow-y-scroll">
          {selectedRooms.map((room, index) => (
            <div
              key={index}
              className="border p-3 rounded-md flex gap-3 items-center mb-4"
            >
              <React.Fragment>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selectedCheckboxes[index]}
                  onChange={() => toggleCheckbox(index)}
                />
                <div>
                  <p className="text-sm opacity-80">{room}</p>
                  <p>2023-02-24 12:00:00 - 2023-02-25 11:00:00</p>
                </div>
              </React.Fragment>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerInfoSection;
