import React from "react";

const Modal = ({ id, children }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box scrollbar-none">
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
