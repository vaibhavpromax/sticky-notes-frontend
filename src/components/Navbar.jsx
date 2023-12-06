import axios from "axios";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAdmin from "../api/useAdmin";
import { toast } from "react-toastify";

const Navbar = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getInviteLink } = useAdmin();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    axios.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("user");
    navigate("/");
  };
  const onInviteHandler = async () => {
    await getInviteLink((data) => {
      toast.success("Invite link copied to clipboard");
      //take the url and copy the main url only before any '/'
      let link = window.location.href.split("/");
      console.log(link);
      navigator.clipboard.writeText(
        `${link[0]}//${link[2]}/register/${data?.data}`
      );
    });
  };
  const allRoutes = routes.map((route) => route.link);
  return (
    <div
      className={`${
        allRoutes.includes(location.pathname) ? "flex" : "hidden"
      } justify-between items-center w-full bg-blue-500 p-4 `}
    >
      <div
        className="
      flex items-center"
      >
        {routes?.map((route, index) => {
          return (
            <Link
              key={index}
              className="
              text-white hover:text-blue-200
              mr-4
            transition duration-300
            ease-in-out
            "
              to={route.link}
            >
              {route.name}
            </Link>
          );
        })}
        {user?.user?.is_admin && (
          <div
            className="text-white hover:text-blue-200
        mr-4
      transition duration-300
      ease-in-out cursor-pointer"
            onClick={onInviteHandler}
          >
            {" "}
            Invite
          </div>
        )}
      </div>

      <div
        className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-200 cursor-pointer transition duration-300 ease-in-out"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Navbar;
