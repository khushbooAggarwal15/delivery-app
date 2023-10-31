// AuthContext.js
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { createContext, useContext, useState } from "react";
import { app } from "@/utils/firebase";

interface IUser {
  email: string;
  role: string;
}
interface IData {
  location: {
    endingPoint: string;
    startingPoint: string;
  };
  payloadDetails: {
    itemType: string;
    weight: number;
  };
}
interface authContextType {
  user: IUser;
  data: IData[];
  login: (email: string, password: string) => void;
  logout: () => void;
  formData: (value: IData) => void;
}

const authContextDefaultValues: authContextType = {
  user: {
    email: "",
    role: "",
  },
  data: [
    {
      location: {
        endingPoint: "",
        startingPoint: "",
      },
      payloadDetails: {
        itemType: "",
        weight: 0,
      },
    },
  ],
  login: () => {},
  logout: () => {},
  formData: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};
interface Props {
  children: any;
}

export function AuthProvider({ children }: Props) {
  const [data, setData] = useState<IData[]>([]);
  const [user, setUser] = useState<IUser>({ email: "", role: "" });

  const login = async (email: string, password: string) => {
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo = userCredential.user;
      console.log("userInfo==auth", userInfo);
      if (userInfo.email === "user@gmail.com" && password === "user1234") {
        setUser({ email: "user@gmail.com", role: "user" });
      } else if (
        userInfo.email === "admin@gmail.com" &&
        password === "admin1234"
      ) {
        setUser({ email: "admin@gmail.com", role: "admin" });
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const logout = () => {
    setUser({ email: "", role: "" });
  };

  const formData = (value: IData) => {
    setData([...data, value]);
  };

  // console.log(user);
  return (
    <>
      <AuthContext.Provider value={{ user, login, logout, formData, data }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
