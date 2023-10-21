import Loading from "@/components/Loading";
import { EnterPassword } from "@/components/icons";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [msg, setMsg] = useState(null);
  const { resetToken } = router.query;
  const [newPassword, setNewPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetToken: resetToken,
            newPassword: newPassword,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMsg("Password changed successfully");
        setLoading(false);
      } else {
        setMsg("Invalid or expired token");
        setLoading(false);
      }
    } catch {
      setMsg("Something went wrong");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading type="bubbles" />;
  }

  return (
    <>
      <Head>
        <title>Sukoon | Reset Password</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen pt-12 bg-gray-200">
        <div className="w-full flex justify-center">
          <EnterPassword />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Password Reset</h1>
          <div className="w-full flex flex-col justify-center items-center gap-3 py-4">
            <label className="font-semibold text">New Password</label>
            <input
              type="text"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-center bg-transparent border-gray-400 border-b-2 focus-within:border-black outline-none px-2 py-1 lg:w-1/6"
            />
            <button
              className="bg-black font-semibold text-white py-2 px-16 rounded-md mt-4 lg:w-1/6"
              onClick={handleClick}
            >
              Reset Password
            </button>
            <p className="text-red-600 font-bold">{msg}</p>
          </div>
          <Link
            href="/login"
            className="text-sm font-semibold text-blue-600 underline underline-offset-4"
          >
            Go to login page
          </Link>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;
