import { useEffect } from "react";
import { useRouter } from "next/router";

function useProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    console.log("router", router);
    const token = window.localStorage.getItem("access_token");
    // console.log("value" + token);
    if (!token || token == null) {
      router.push("/");
    } else if (token) {
      router.push("/dashboardpage");
    }
  }, []);
}
console.log("18");
export default useProtectedRoute;
