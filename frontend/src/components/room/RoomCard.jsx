import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const generateID = ++room;

  return (
    <div className="card bg-white">
      <figure className={`relative`}>
        <span className="badge absolute top-3 right-3 h-auto">Available</span>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt=""
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Room {generateID}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
          asperiores beatae commodi cumque eligendi est illo ipsam iusto
          praesentium quibusdam.
        </p>
        <div className="card-actions mt-5">
          <Link
            to={`/dashboard/edit-room/${generateID}`}
            className="btn btn-sm min-w-[8rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case"
          >
            Edit
          </Link>
          <Link
            to={`${generateID}`}
            className="btn btn-sm min-w-[8rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy normal-case"
          >
            Manage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
