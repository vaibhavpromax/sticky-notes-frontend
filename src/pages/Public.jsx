import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import Skeleton from "../components/Skeleton";
import useNote from "../api/useNotes";
import { toast } from "react-toastify";

const Public = () => {
  const loading = false;
  const [notes, setNotes] = useState([]);
  const { getPublicNotes, getPublicNotesLoading, updateNote } = useNote();
  const fetchNotes = async () => {
    await getPublicNotes((data) => {
      setNotes(data?.data);
    });
  };
  const changeNoteStatus = async (note_id) => {
    await updateNote(note_id, { is_public: false }, (data) => {
      toast.success("Note made private", {
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
        {!getPublicNotesLoading ? (
          notes.map((note, index) => (
            <Note
              key={index}
              heading={note?.title}
              content={note?.content}
              note_id={note?.note_id}
              isPublic={note?.is_public}
              showButton={false}
              onChangeNotePrivacy={changeNoteStatus}
              noteUser={note?.User}
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
    </div>
  );
};

export default Public;
