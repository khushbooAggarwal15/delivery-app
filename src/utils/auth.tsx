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
    startingPoint: string;
    endingPoint: string;
    latitude: number;
    longitude: number;
    pincode: string;
  };
  payloadDetails: {
    weight: number;
    itemType: string;
    length: number;
    breadth: number;
    height: number;
    name: string;
    contact: string;
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
        latitude: 0,
        longitude: 0,
        pincode: "",
      },
      payloadDetails: {
        itemType: "",
        weight: 0,
        length: 0,
        breadth: 0,
        height: 0,
        name: "",
        contact: "",
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
  const initialDataString = window.localStorage.getItem("data");
  const initialData: IData[] = initialDataString
    ? JSON.parse(initialDataString)
    : [];

  const [data, setData] = useState<IData[]>(initialData);

  const [user, setUser] = useState<IUser>({ email: "", role: "" });

  const logout = () => {
    window.localStorage.setItem("access_token", String(null));
    window.localStorage.removeItem("access_token");
    // window.localStorage.setItem("data", String(null));
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

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo: any = userCredential.user;

      window.localStorage.setItem("email", userInfo.email);
      const token = userInfo.accessToken;
      window.localStorage.setItem("access_token", token);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const formData = (value: any) => {
    // setData([...data, value]);
    // window.localStorage.setItem("data", JSON.stringify([...data, value]));

    const previousDataString = window.localStorage.getItem("data");
    const previousData: IData[] = previousDataString
      ? JSON.parse(previousDataString)
      : [];

    const newData = [...previousData, value];

    setData(newData);
    window.localStorage.setItem("data", JSON.stringify(newData));
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
