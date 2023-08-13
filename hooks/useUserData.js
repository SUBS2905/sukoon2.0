import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useUserData = () => {
  const userToken = Cookies.get("sessionToken");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/user/getuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_token: userToken }),
          }
        );

        if (res.ok) {
            const data = await res.json();
            setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error(err);
        setUserData(null);
      }
    }

    if (userToken) {
      fetchData();
    }
  }, [userToken]);

  return userData;
};

export default useUserData;
