import React from 'react';
import { Link } from 'react-router-dom';
import EditFood from './EditFood';

const FoodCardShow = () => {
    return (
        <div>
   <div className="card bg-white">
      <figure className={`relative`}>
        {/* <span className="badge absolute top-3 right-3 h-auto">Available</span> */}
        <img
          src="https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675"
          alt=""
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Chiken Chowmin 
        
        {/* {generateID} */}
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
          asperiores beatae commodi cumque eligendi est illo ipsam iusto
          praesentium quibusdam.
        </p>
        <div className="card-actions mt-5 justify-end">
          {/* <Link
            // to={`/dashboard/edit-food/
            //  ${generateID}
            // `}
            to="/dashboard/edit-food"
            className="btn btn-sm min-w-[8rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case"
          >
            View
            </Link> */}
           
<button   className="btn btn-sm min-w-[8rem] bg-green-slimy hover:bg-transparent text-white hover:text-green-slimy !border-green-slimy normal-case" onClick={()=>document.getElementById('my_modal_5').showModal()}>View</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    {/* <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p> */}

    <EditFood></EditFood>
    <div className="modal-action">
      <form method="dialog">
        <button  className="btn btn-sm min-w-[8rem] bg-red-400 hover:bg-transparent text-white hover:text-green-300 !border-green-slimy normal-case">Close</button>
      </form>
    </div>
  </div>
</dialog>
         
          {/* <Link
            // to={``}
            className="btn btn-sm min-w-[8rem] bg-transparent hover:bg-green-slimy text-green-slimy hover:text-white !border-green-slimy normal-case"
          >
            Manage
          </Link> */}
        </div>
      </div>
    </div>
        </div>
    );
};

export default FoodCardShow;