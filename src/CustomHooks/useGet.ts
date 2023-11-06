import { useQuery } from "react-query";
import axiosInstance from "./AxiosInstance/axios-instance";

function useGetData() {
  return useQuery("users", async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  });
}

export default useGetData;
