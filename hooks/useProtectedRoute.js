import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useProtectedRoute = () => {
  const router = useRouter();
  const sessionToken = Cookies.get("sessionToken");

  useEffect(() => {
    if (!sessionToken) router.replace("/login");
  }, [router, sessionToken]);

  return sessionToken;
};

export default useProtectedRoute;
