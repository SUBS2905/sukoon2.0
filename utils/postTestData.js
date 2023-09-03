export async function postTestData(formData, userToken) {
  let message = "";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      message = "Data submitted successfully";
      console.log(data);
    }
  } catch {
    message = "Something went wrong";
    console.error("Server error");
  }

  return message;
}
