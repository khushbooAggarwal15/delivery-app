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
    window.localStorage.setItem("access_token", String(null));
    window.localStorage.removeItem("access_token");

    setUser({ email: "", role: "" });
  };
  // const login = async (email: any, password: any) => {
  //   const auth = getAuth(app);

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const userInfo = userCredential.user;
  //     console.log("userInfo==auth", userInfo);
  //     if (userInfo.email === "user@gmail.com" && password === "user1234") {
  //       setUser({ email: "user@gmail.com", role: "user" });
  //     } else if (
  //       userInfo.email === "admin@gmail.com" &&
  //       password === "admin1234"
  //     ) {
  //       setUser({ email: "admin@gmail.com", role: "admin" });
  //     }
  //   } catch (error) {
  //     console.error("Authentication failed:", error);
  //   }
  // };
  const login = async (email: any, password: any) => {
    const auth = getAuth(app);
    console.log("auth", auth);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo: any = userCredential.user;
      window.localStorage.setItem("access_token", userInfo.accessToken);
      console.log("userInfo.email", userInfo.email);
      window.localStorage.setItem("email", userInfo.email);
    } catch (error) {
      alert("invalid");
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
