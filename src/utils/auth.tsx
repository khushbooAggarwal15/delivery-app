// AuthContext.js
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { createContext, useContext, useState } from "react";
import { app } from "@/utils/firebase";
interface IUser {
  email: string;
  password: string;
}
interface IData {
  message: {
    intent: {
      category: {
        id: string;
      };
      name: string;
      cost: string;
      fulfillment: {
        fulfillment_type: string;
        start: {
          location: {
            gps: string;

            address: {
              area_code: string;
            };
          };
        };
        end: {
          location: {
            gps: string;
            address: {
              area_code: string;
            };
          };
        };
      };
      payload_details: {
        weight: {
          unit: string;
          value: number;
        };
        dimensions: {
          length: {
            unit: string;
            value: number;
          };
          breadth: {
            unit: string;
            value: number;
          };
          height: {
            unit: string;
            value: number;
          };
        };
        category: string;

        dangerous_goods: string;
      };
    };
  };
}

interface IAddress {
  name: string;
  contactnumber: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
interface authContextType {
  user: IUser;
  data: IData[];
  login: (email: string, password: string) => void;
  logout: () => void;
  formData: (value: any) => void;
  newformData: (value: IData) => void;
  addressData: (value: IAddress) => void;
}

const authContextDefaultValues: authContextType = {
  user: {
    email: "",
    password: "",
  },
  data: [
    {
      message: {
        intent: {
          category: {
            id: "",
          },
          name: "",
          cost: "",
          fulfillment: {
            fulfillment_type: "",
            start: {
              location: {
                gps: "",

                address: {
                  area_code: "",
                },
              },
            },
            end: {
              location: {
                gps: "",
                address: {
                  area_code: "",
                },
              },
            },
          },
          payload_details: {
            weight: {
              unit: "",
              value: 0,
            },
            dimensions: {
              length: {
                unit: "",
                value: 0,
              },
              breadth: {
                unit: "",
                value: 0,
              },
              height: {
                unit: "",
                value: 0,
              },
            },
            category: "",

            dangerous_goods: "",
          },
        },
      },
    },
  ],

  login: () => {},
  logout: () => {},
  formData: () => {},
  newformData: () => {},
  addressData: () => {},
};

const AuthContext = createContext(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};
interface Props {
  children: any;
}

export function AuthProvider({ children }: Props) {
  const [data, setData] = useState<IData[]>([]);
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const [newdata, setNewData] = useState<IData[]>([]);
  const [address, setAddress] = useState<IAddress>();
  const logout = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.setItem("email", String(null));
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

  const newformData = (value: IData) => {
    setNewData((prevData) => [...prevData, value]);
    window.localStorage.setItem("newdata", JSON.stringify(newdata));
  };

  const addressData = (value: IAddress) => {
    console.log(value);
    setAddress(value);
    window.localStorage.setItem("address", JSON.stringify(value));
  };

  const formData = (value: any) => {
    const previousDataString = window.localStorage.getItem("data");
    const previousData: IData[] = previousDataString
      ? JSON.parse(previousDataString)
      : [];
    const newData = [...previousData, value];

    setData(newData);

    window.localStorage.setItem("data", JSON.stringify(newData));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, formData, newformData, data, addressData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
