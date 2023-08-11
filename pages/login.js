import React, { useState } from "react";
import Image from "next/image";
import LoginImage from "@/public/assets/signin-art.jpg";
import { GoogleIcon } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        // console.log(data);
        const token = data.user_token;
        Cookies.set("sessionToken", token, { expires: 7, secure: true });
        router.push("/");
      } else if (res.status === 401) {
        setErr(data.message);
      } else if (res.status === 404) {
        setErr(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-2/5 h-screen flex flex-col">
        <Image
          className="w-full h-full object-cover"
          src={LoginImage}
          alt="login-image"
          priority
        />
      </div>
      <div className="w-3/5 h-screen bg-gray-200 p-20 flex flex-col justify-between">
        <h1 className="text-md text-black font-bold ">Sukoon</h1>

        <div className="w-full flex flex-col max-w-[700px]">
          <div className="w-full flex flex-col mb-2">
            <h2 className="text-2xl text-black font-bold mb-4">Login</h2>
            <p className="text-sm text-gray-700 font-semibold">
              Welcome Back! Please log in to proceed
            </p>
          </div>
          <div className="w-full flex flex-col">
            <input
              className="w-full text-black bg-inherit py-2 my-2 border-b border-gray-600 outline-none focus:outline-none focus:border-b-2"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="w-full text-black bg-inherit py-2 my-2 border-b border-gray-600 outline-none focus:outline-none focus:border-b-2"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex item-center justify-between my-2">
            <label className="flex items-center text-sm">
              Show Password
              <input
                className="mx-1 mt-1"
                type="checkbox"
                checked={showPassword}
                onChange={handleToggle}
              />
            </label>
            <p className="text-sm font-semibold underline underline-offset-2 cursor-pointer my-2">
              Forgot Password
            </p>
          </div>
          {err && (
            <div className="w-full flex item-center justify-center my-2 text-red-600 font-semibold">
              {err}
            </div>
          )}
          <div className="w-full flex items-center justify-center my-2">
            <button
              className="w-1/3 rounded-md p-2 text-white text-center bg-black"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative">
            <div className="w-full h-[1.5px] bg-gray-400 my-4"></div>
          </div>
          <div className="w-full flex items-center justify-center my-2">
            <div className="w-1/3 rounded-md p-2 text-black text-center bg-white flex items-center justify-center cursor-pointer">
              <div className="w-6 h-6 mr-2">
                <GoogleIcon />
              </div>
              <span>Sign in with Google</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center max-w-[700px]">
          <p className="text-sm font-normal text-gray-600">
            Don&apos;t have an account?&nbsp;
            <Link href="/register">
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                Sign up here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
