import { useMutation } from "react-query";
import axiosInstance from "./AxiosInstance/axios-instance";

function usePostData() {
  const postMutation = useMutation(async (postData: any) => {
    const response = await axiosInstance.post("posts", postData);
    console.log(response.data);
    return response.data;
  });

  return postMutation;
}

export default usePostData;
