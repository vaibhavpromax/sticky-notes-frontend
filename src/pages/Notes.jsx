import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import Skeleton from "../components/Skeleton";
import ConfirmationModal from "../components/ConfirmationModal";
import AddNoteModal from "../components/AddNoteModal";
import useNote from "../api/useNotes";
import EditNoteModal from "../components/EditNoteModal";
import { toast } from "react-toastify";

const Notes = () => {
  const {
    getMyNotes,
    getMynotesLoading,
    deleteNote,
    deleteNotesLoading,
    updateNote,
    updateNoteLoading,
  } = useNote();
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [noteData, setNoteData] = useState({});
  const [notes, setNotes] = useState([]);
  const closeAddModal = () => {
    setAddNoteModal(false);
  };
  const closeEditModal = () => {
    setEditNoteModal(false);
  };
  const closeConfirmationModal = () => {
    setConfirmationModal(false);
  };
  const onClickDelete = (id) => {
    setNoteData({ note_id: id });
    setConfirmationModal(true);
  };
  const onClickEdit = (heading, content, note_id) => {
    setNoteData({ title: heading, content, note_id });
    setEditNoteModal(true);
  };

  const fetchNotes = async () => {
    await getMyNotes((data) => {
      setNotes(data?.data);
    });
  };
  const deleteNoteHandler = async () => {
    console.log(noteData);
    await deleteNote(noteData?.note_id, () => {
      toast.success("Note deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
      fetchNotes();
    });
  };
  const changeNoteStatus = async (note_id) => {
    await updateNote(note_id, { is_public: true }, (data) => {
      toast.success("Note made public", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
      fetchNotes();
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-full h-full flex items-center ">
      <div className="flex flex-wrap gap-4">
        {!getMynotesLoading ? (
          notes.map((note, index) => (
            <Note
              key={index}
              heading={note?.title}
              content={note?.content}
              note_id={note?.note_id}
              noteUser={note?.User}
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
              onChangeNotePrivacy={changeNoteStatus}
            />
          ))
        ) : (
          <>
            {[...Array(18)].map((_, index) => (
              <Skeleton className="w-52 h-60" key={index} />
            ))}
          </>
        )}
      </div>
      <button
        onClick={() => {
          setAddNoteModal(true);
        }}
        className="fixed bottom-4 right-4 bg-blue-500 rounded-full p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <EditNoteModal
        note={noteData}
        fetchNotes={fetchNotes}
        isModal={editNoteModal}
        onClose={closeEditModal}
      />
      <AddNoteModal
        setNotes={setNotes}
        isModal={addNoteModal}
        onClose={closeAddModal}
      />
      <ConfirmationModal
        isModal={confirmationModal}
        onClose={closeConfirmationModal}
        onConfirmClick={deleteNoteHandler}
        content="Do you want to delete this note ? "
      />
    </div>
  );
};

export default Notes;
