import React, { useState } from "react";
import Modal from "./Modal";
import useNote from "../api/useNotes";

const AddNoteModal = ({ isModal, onClose, setNotes }) => {
    const [noteData, setNoteData] = useState({
      title: "",
      content: "",
    });
  const { addNotes, addNotesLoading } = useNote();
  const addNotesHandler = async () => {
    await addNotes(noteData, (data) => {
      setNotes((prev) => [...prev, data?.data]);
      onClose();
    });
  };

  return (
    <Modal
      showCloseButton={true}
      className="flex flex-col w-96 h-72"
      onClose={onClose}
      isModal={isModal}
    >
      <h3 className=" text-lg font-bold">Add Note</h3>
      <label className="mt-5  text-lg font-normal">Heading</label>
      <input
        value={noteData.title}
        onChange={(e) => {
          setNoteData({ ...noteData, title: e.target.value });
        }}
        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
      />
      <label className="heading-label text-lg font-normal">Content</label>
      <textarea
        value={noteData.content}
        onChange={(e) => {
          setNoteData({ ...noteData, content: e.target.value });
        }}
        className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
      />
      <button
        onClick={addNotesHandler}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Note
      </button>
    </Modal>
  );
};

export default AddNoteModal;
