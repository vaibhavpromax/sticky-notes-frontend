import axios from "axios";
import { useState } from "react";
const useAdmin = () => {
  const [getActivititesLoading, setGetActivititesLoading] = useState(false);
  const [getUsersLoading, setGetUsersLoading] = useState(false);
  const [makeUserAdminLoading, setMakeUserAdminLoading] = useState(false);
  const [getAllNotesLoading, setGetAllNotesLoading] = useState(false);
  const [getInvitelinkLoading, setGetInvitelinkLoading] = useState(false);
  const [deleteNoteLoading, setDeleteNoteLoading] = useState(false);
  const [updateNoteLoading, setUpdateNoteLoading] = useState(false);

  const getActivities = async (cb) => {
    setGetActivititesLoading(true);
    try {
      const res = await axios.get(`/admin/activities`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setGetActivititesLoading(false);
    }
  };
  const getUsers = async (cb) => {
    setGetUsersLoading(true);
    try {
      const res = await axios.get(`/admin/users`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setGetUsersLoading(false);
    }
  };
  const getAllNotes = async (cb) => {
    setGetAllNotesLoading(true);
    try {
      const res = await axios.get(`/admin/all_notes`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setGetAllNotesLoading(false);
    }
  };

  const getInviteLink = async (cb) => {
    setGetInvitelinkLoading(true);
    try {
      const res = await axios.get(`/admin/invite`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setGetInvitelinkLoading(false);
    }
  };

  const makeUserAdmin = async (user_id, cb) => {
    setMakeUserAdminLoading(true);
    try {
      const res = await axios.patch(`/admin/make_admin/${user_id}`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setMakeUserAdminLoading(false);
    }
  };

  const updateNoteByAdmin = async (note_id, data, cb) => {
    setUpdateNoteLoading(true);
    try {
      const res = await axios.patch(`/admin/note/${note_id}`, data);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setUpdateNoteLoading(false);
    }
  };

  const deleteNoteByAdmin = async (note_id, cb) => {
    setDeleteNoteLoading(true);
    try {
      const res = await axios.delete(`/admin/note/${note_id}`);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setDeleteNoteLoading(false);
    }
  };

  return {
    getActivities,
    getUsers,
    getAllNotes,
    makeUserAdmin,
    getInviteLink,
    updateNoteByAdmin,
    deleteNoteByAdmin,
    getActivititesLoading,
    getAllNotesLoading,
    getUsersLoading,
    makeUserAdminLoading,
    getInvitelinkLoading,
    deleteNoteLoading,
    updateNoteLoading,
  };
};

export default useAdmin;
