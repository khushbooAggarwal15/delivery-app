import React from "react";
import { useMutation, useQueryClient } from "react-query";
import useGetData from "../../CustomHooks/useGet";
import usePostData from "../../CustomHooks/usePost";

function Api() {
  const { data, isLoading, isError } = useGetData();
  const postMutation = usePostData();
  const queryClient = useQueryClient();
  const handleCreatePost = async () => {
    const postData = {
      id: 100,
      name: "wits lab ",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
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
