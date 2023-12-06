import React from "react";
import Modal from "./Modal";

const ConfirmationModal = ({ content, onConfirmClick, isModal, onClose }) => {
  return (
    <Modal onClose={onClose} isModal={isModal}>
      <div className="text-center text-gray-800">{content}</div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onConfirmClick}
      >
        Confirm
      </button>
    </Modal>
  );
};

export default ConfirmationModal;
