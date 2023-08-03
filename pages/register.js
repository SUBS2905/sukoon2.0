import React from "react";
import Image from "next/image";
import LoginImage from "@/public/assets/signup-art.jpg";
import { GoogleIcon } from "@/components/icons";

const Register = () => {
  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-2/5 h-screen flex flex-col">
        <Image
          className="w-full h-full object-cover"
          src={LoginImage}
          alt="login-image"
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
              type="email"
              placeholder="Email"
            />
            <input
              className="w-full text-black bg-inherit py-2 my-2 border-b border-gray-600 outline-none focus:outline-none focus:border-b-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="w-full flex item-center justify-end my-2">
            {/* <p className="text-sm font-semibold underline underline-offset-2 cursor-pointer my-2">
              Forgot Password
            </p> */}
          </div>
          <div className="w-full flex items-center justify-center my-2">
            <button className="w-1/3 rounded-md p-2 text-white text-center bg-black">
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
            <span className="font-semibold underline underline-offset-2 cursor-pointer">
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
