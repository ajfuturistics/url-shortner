import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const persistToken = JSON.parse(localStorage.getItem("token"));
  const persistUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(persistUser || null);
  const [token, setToken] = useState(persistToken || null);

  const loginUser = ({ user, jwttoken }) => {
    setUser(user);
    setToken(jwttoken);

    // for persisting user when page refresh
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(jwttoken));
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;

// custom hook to get auth state
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const data = useContext(AuthContext);
  return data;
};
