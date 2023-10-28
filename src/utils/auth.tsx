// AuthContext.js
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { createContext, useContext, useState } from "react";
import { app } from "@/utils/firebase";

interface authContextType {
  user: { email: any; role: any };
  login: (email: any, password: any) => any;
  logout: () => void;
}
const authContextDefaultValues: authContextType = {
  user: {
    email: "",
    role: "",
  },
  login: () => {},
  logout: () => {},
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
  const logout = () => {
    setUser({ email: "", role: "" });
  };
  const login = async (email: any, password: any) => {
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo = userCredential.user;
      console.log("userInfo==auth", userInfo);
      if (userInfo.email === "teacher@gmail.com" && password === "teacher") {
        setUser({ email: "teacher@gmail.com", role: "teacher" });
      } else if (
        userInfo.email === "student@gmail.com" &&
        password === "student"
      ) {
        setUser({ email: "student@gmail.com", role: "student" });
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };
  console.log(user);
  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
