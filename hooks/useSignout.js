import Cookies from "js-cookie";
import { useRouter } from "next/router";

const useSignout = () => {
  const router = useRouter();

  const signOut = () => {
    Cookies.remove("sessionToken");
    router.replace("/login");
  };
  
  return signOut;
};

export default useSignout;
