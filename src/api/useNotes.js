import axios from "axios";
import { useState } from "react";
const useNote = () => {
  const [getMynotesLoading, setGetMynotesLoading] = useState(false);
  const [addNotesLoading, setAddNotesLoading] = useState(false);
  const [getPublicNotesLoading, setGetPublicNotesLoading] = useState(false);
  const [deleteNotesLoading, setDeleteNotesLoading] = useState(false);
  const [updateNoteLoading, setUpdateNoteLoading] = useState(false);

  const getMyNotes = async (cb) => {
    setGetMynotesLoading(true);
    try {
      const res = await axios.get(`/note/user`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setGetMynotesLoading(false);
    }
  };

  const getPublicNotes = async (cb) => {
    setGetPublicNotesLoading(true);
    try {
      const res = await axios.get(`/note/public`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setGetPublicNotesLoading(false);
    }
  };

  const addNotes = async (data, cb) => {
    setAddNotesLoading(true);
    try {
      const res = await axios.post(`/note/create`, data);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setAddNotesLoading(false);
    }
  };

  const deleteNote = async (note_id, cb) => {
    setDeleteNotesLoading(true);
    try {
      const res = await axios.delete(`/note/${note_id}`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setDeleteNotesLoading(false);
    }
  };
  const updateNote = async (note_id, data, cb) => {
    setUpdateNoteLoading(true);
    try {
      const res = await axios.patch(`/note/${note_id}`, data);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setUpdateNoteLoading(false);
    }
  };

  return {
    getMyNotes,
    getPublicNotes,
    addNotes,
    deleteNote,
    updateNote,
    getMynotesLoading,
    addNotesLoading,
    getPublicNotesLoading,
    updateNoteLoading,
    deleteNotesLoading,
  };
};

export default useNote;
