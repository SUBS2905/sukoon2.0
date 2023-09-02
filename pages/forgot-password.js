import { EnterPassword, Thinking } from "@/components/icons";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (res.ok) {
        setMessage(`Email sent to ${email}.`);
      } else {
        setMessage("User with this email doesn't exist");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Sukoon | Reset Password</title>
      </Head>
      <main className="flex flex-col gap-8 w-full min-h-screen pt-12 bg-gray-200">
        <div className="w-full flex justify-center">
          <Thinking />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <div className="w-full flex flex-col justify-center items-center gap-3 py-4">
            <label className="font-semibold text">
              Enter the registered email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-1/6 text-center bg-transparent border-gray-400 border-b-2 focus-within:border-black outline-none px-2 py-1"
            />
            <button
              className="w-1/6 bg-black font-semibold text-white py-2 px-16 rounded-md mt-4"
              onClick={handleClick}
            >
              Get Reset Link
            </button>
            <p className="text-red-600 font-bold">{message}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
