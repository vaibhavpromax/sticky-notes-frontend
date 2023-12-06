import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { ROLE_ROUTES } from ".";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound";

const RoleRoutes = () => {
  const isAdmin = true;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <div className="w-full h-full">
      <Navbar
        routes={user?.user?.is_admin ? ROLE_ROUTES.admin : ROLE_ROUTES.user}
      />

      <div className="py-4 px-4">
        <Routes>
          {isAdmin
            ? ROLE_ROUTES.admin.map((route) => (
                <Route
                  key={route.name}
                  path={route.link}
                  element={user?.token ? route.component : <Navigate to="/" />}
                />
              ))
            : ROLE_ROUTES.user.map((route) => (
                <Route
                  key={route.name}
                  path={route.link}
                  element={user?.token ? route.component : <Navigate to="/" />}
                />
              ))}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default RoleRoutes;
