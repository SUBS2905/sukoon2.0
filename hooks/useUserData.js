import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useUserData = () => {
  const userToken = Cookies.get("sessionToken");
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userToken}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setUserData(data);
          setLoading(false);
        }else{
          console.log("Status: "+res.status);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    if (userToken) {
      fetchData();
    }else{
      setLoading(false);
    }
  }, [userToken]);

  return {userData, isLoading};
};

export default useUserData;
