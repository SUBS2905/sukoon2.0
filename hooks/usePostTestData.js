import { useEffect, useState } from "react";

const usePostTestData = (formData, userToken) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function postData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/test`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
          setMessage("Submitted Successfully!");
          console.log(data);
        }
      } catch {
        console.error("Server error");
      }
    }

    if (userToken && formData) {
      postData();
    }
  }, [formData, userToken]);

  return { message };
};

export default usePostTestData;
