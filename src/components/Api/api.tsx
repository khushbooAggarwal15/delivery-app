import React from "react";
import {  useQueryClient } from "react-query";
import useGetData from "../../CustomHooks/useGet";
import usePostData from "../../CustomHooks/usePost";

function Api() {
  const { data, isLoading, isError } = useGetData("/users");
  const postMutation = usePostData("/posts");
  const queryClient = useQueryClient();
  const handleCreatePost = async () => {
    const postData = {
      userId: 10,
      name: "witslab",
      id: 98,
      body: "doloremque ex facilis sit sint culpa\nsoluta assumenda eligendi non ut eius\nsequi ducimus vel quasi\nveritatis est dolores",
    };

    try {
      const response = await postMutation.mutateAsync(postData);
      queryClient.setQueryData("users", (prevData: any) => {
        if (Array.isArray(prevData)) {
          return [...prevData, response];
        } else {
          return [response];
        }
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h1>Get Data</h1>
      {isLoading ? <p>Loading data...</p> : null}
      {isError ? <p>Error fetching data</p> : null}
      {data && (
        <ul>
          {data.map((item: any) => (
            <li key={item?.id}>{item?.name}</li>
          ))}
        </ul>
      )}

      <h1>Post Data</h1>
      <button onClick={handleCreatePost}>Create Post</button>
      {postMutation.isLoading ? <p>Creating post...</p> : null}
      {postMutation.isError ? <p>Error creating post</p> : null}
      {postMutation.isSuccess ? <p>Post created successfully</p> : null}
    </div>
  );
}

export default Api;
