import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useVerifyUser = ({ vtoken }) => {
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    async function verifyUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/user/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ verification_token: vtoken }),
          }
        );
        const data = await res.json();
        if (res.status === 200) {
          console.log(data);
          setVerify(true);
          const token = data.user_token;
          Cookies.set("sessionToken", token, { expires: 7, secure: true });
        } else {
          setVerify(false);
          console.log(res.status);
        }
      } catch (error) {
        setVerify(false);
        console.error(error);
      }
    }
    if (vtoken) {
      verifyUser();
    }
  }, [vtoken]);

  return verify;
};

export default useVerifyUser;
