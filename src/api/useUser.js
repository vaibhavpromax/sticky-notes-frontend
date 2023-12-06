import axios from "axios";
import { useState } from "react";
const useUser = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (data, cb) => {
    setLoginLoading(true);
    setError("");
    try {
      const res = await axios.post(`/user/login`, data);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      setError(err?.response?.data?.msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const registerUser = async (data, cb) => {
    setRegisterLoading(true);
    setError("");
    try {
      const res = await axios.post(`/user/register`, data);
      if (cb && typeof cb === "function") cb(res.data);
    } catch (err) {
      setError(err?.response?.data?.msg);
      // throw new Error(err);
    } finally {
      setRegisterLoading(false);
    }
  };
  return {
    loginUser,
    registerUser,
    loginLoading,
    registerLoading,
    error,
  };
};

export default useUser;
