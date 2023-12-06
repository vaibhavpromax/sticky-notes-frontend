import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const init = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`;
    setAuthenticated(true);
  };

  useEffect(() => {
    init();
  }, [user]);

  return authenticated ? (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  ) : (
    `Loading`
  );
};
export default AuthProvider;
