// AuthContext.js
import { createContext, useContext, useState } from "react";

interface authContextType {
  user: { email: any; role: any };
  login: (email: any, password: any) => any;
}
const authContextDefaultValues: authContextType = {
  user: {
    email: "",
    role: "",
  },
  login: () => {},
};
const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};
interface Props {
  children: any;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({
    email: "",
    role: "",
  });

  const login = (email: any, password: any) => {
    if (email === "teacher@gmail.com" && password === "teacher") {
      setUser({ email: "teacher@gmail.com", role: "teacher" });
    } else if (email === "student@gmail.com" && password === "student") {
      setUser({ email: "student@gmail.com", role: "student" });
    } else {
      console.log("authentication failed");
    }
  };
  console.log(user);
  return (
    <>
      <AuthContext.Provider value={{ user, login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
