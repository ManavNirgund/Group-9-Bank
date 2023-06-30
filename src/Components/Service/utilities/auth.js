import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState("");

  const login = (email, password, jwt) => {
    setEmail(email);
    setPassword(password);
    console.log(jwt)
    setJwt(jwt);
    console.log(password);
    console.log(jwt);
  };

  const logout = () => {
    setEmail(null);
    setPassword(null);
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ jwt, email, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
