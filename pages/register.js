import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RegisterImage from "@/public/assets/signup-art.jpg";
import { GoogleIcon } from "@/components/icons";
import Link from "next/link";

const Register = () => {
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
      const res = await fetch(`http://localhost:5000/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        router.push("/");
      } else if (res.status == 409) {
        setErr("User already exists");
        // console.log(err);
      }
    } catch (error) {
      setErr("Server Error");
      // console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-2/5 h-screen flex flex-col">
        <Image
          className="w-full h-full object-cover"
          src={RegisterImage}
          alt="register-image"
        />
      </div>
      <div className="w-3/5 h-screen bg-gray-200 p-20 flex flex-col justify-between">
        <h1 className="text-md text-black font-bold ">Sukoon</h1>

        <div className="w-full flex flex-col max-w-[700px]">
          <div className="w-full flex flex-col mb-2">
            <h2 className="text-2xl text-black font-bold mb-4">Register</h2>
            <p className="text-sm text-gray-700 font-semibold">
              Welcome, Create an account to proceed
            </p>
          </div>
          <div className="w-full flex flex-col">
            <input
              className="w-full text-black bg-inherit py-2 my-2 border-b border-gray-600 outline-none focus:outline-none focus:border-b-2"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
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
              Register
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
              <span>Sign up with Google</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center max-w-[700px]">
          <p className="text-sm font-normal text-gray-600">
            Already have an account?&nbsp;
            <Link href="/login">
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                Sign in here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
