import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import Skeleton from "../components/Skeleton";
import useNote from "../api/useNotes";
import useAdmin from "../api/useAdmin";
import EditNoteModal from "../components/EditNoteModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";

const notes = [
  {
    heading: "header",
    content:
      "hello how are you doing hello how are you doing hello how are you doing hello how are you doing",
  },
  {
    heading: "header",
    content:
      "hello how are you doing hello how are you doing hello how are you doing hello how are you doing",
  },
  {
    heading: "header",
    content:
      "hello how are you doing hello how are you doing hello how are you doing hello how are you doing",
  },
  {
    heading: "header",
    content:
      "hello how are you doing hello how are you doing hello how are you doing hello how are you doing",
  },
  {
    heading: "header",
    content:
      "hello how are you doing hello how are you doing hello how are you doing hello how are you doing",
  },
  {
    heading: "header",
    content:
      "hello how are you doing hello how are you doing hello how are you doing hello how are you doing",
  },
  {
    heading: "header",
    content:
      "hello how are you doing hello how are you doing hello how are you doing hello how are you doing",
  },
];

const AllNotes = () => {
  const { getAllNotes, getAllNotesLoading, deleteNoteByAdmin } = useAdmin();
  const [notes, setNotes] = useState([]);
  const [noteData, setNoteData] = useState({});
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const closeConfirmationModal = () => {
    setConfirmationModal(false);
  };
  const closeEditModal = () => {
    setEditNoteModal(false);
  };
  const fetchAllNotes = async () => {
    await getAllNotes((data) => {
      setNotes(data?.data);
    });
  };
  useEffect(() => {
    fetchAllNotes();
  }, []);
  const onClickDelete = (id) => {
    setNoteData({ note_id: id });
    setConfirmationModal(true);
  };
  const deleteNoteHandler = async () => {
    console.log(noteData);
    await deleteNoteByAdmin(noteData?.note_id, () => {
      toast.success("Note deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
      closeConfirmationModal();
      fetchAllNotes();
    });
  };
  const onClickEdit = (heading, content, note_id) => {
    setNoteData({ title: heading, content, note_id });
    setEditNoteModal(true);
  };

  return (
    <div className="w-full h-full flex items-center ">
      <div className="flex flex-wrap gap-4">
        {!getAllNotesLoading ? (
          notes.map((note, index) => (
            <Note
              key={index}
              heading={note?.title}
              content={note?.content}
              showButton={true}
              noteUser={note.User}
              note_id={note.note_id}
              is_public={note.is_public}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              showPrivacyButton={false}
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
      <EditNoteModal
        fetchNotes={fetchAllNotes}
        isModal={editNoteModal}
        onClose={closeEditModal}
        note={noteData}
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

export default AllNotes;
