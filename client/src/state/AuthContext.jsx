import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")||"null"));
  const login = ({ token, user }) => { 
    localStorage.setItem("token", token); 
    localStorage.setItem("user", JSON.stringify(user)); 
    setUser(user);
   };
  const logout = () => { 
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    setUser(null);
   };
  useEffect(()=>{},[]);
  return <Ctx.Provider value={{ user, login, logout }}>
    {children}
    </Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
