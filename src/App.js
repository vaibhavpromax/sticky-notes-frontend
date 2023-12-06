import { Route, Routes, BrowserRouter } from "react-router-dom";
import RoleRoutes from "./rbac/constants/RoleRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/:inviteCode" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <AuthProvider>
              <RoleRoutes />
            </AuthProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
