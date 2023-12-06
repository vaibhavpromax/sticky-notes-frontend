import React, { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import useAdmin from "../api/useAdmin";
import { toast } from "react-toastify";

const Users = () => {
  const { getUsers, getUsersLoading, makeUserAdmin } = useAdmin();
  const [users, setusers] = useState([]);
  const fetchUsers = async () => {
    await getUsers((data) => {
      setusers(data?.data);
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const makeAdmin = async (user_id) => {
    await makeUserAdmin(user_id, () => {
      fetchUsers();
      toast.success("User is now an admin", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
    });
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      {!getUsersLoading ? (
        users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 shadow-md rounded-md"
          >
            <h2 className="text-xl font-bold ">{user.username}</h2>

            {!user?.is_admin ? (
              <svg
                style={{ cursor: "pointer" }}
                onClick={() => makeAdmin(user?.user_id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            ) : (
              <svg
                style={{ cursor: "not-allowed" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            )}
          </div>
        ))
      ) : (
        <>
          {[...Array(18)].map((_, index) => (
            <Skeleton className="w-84 h-20" key={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default Users;
