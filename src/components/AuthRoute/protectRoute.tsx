import { useEffect } from "react";
import { useRouter } from "next/router";

function useProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    // console.log("value" + token);
    const render = () => {
      if (!token || token == null) {
        router.push("/");
      } else if (token) {
        router.push("/dashboardpage");
      }
    };
    render();
  }, []);
}

export default useProtectedRoute;
