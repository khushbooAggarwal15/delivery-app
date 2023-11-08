import { useQuery } from "react-query";
import axiosInstance from "./AxiosInstance/axios-instance";

function useGetData(endpoint: any) {
  return useQuery("users", async () => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  });
}

export default useGetData;
