import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import useUserData from "@/hooks/useUserData";
import useSignout from "@/hooks/useSignout";

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[2px] inline-block bg-black absolute w-0 left-0 -bottom-0.5
      group-hover:w-full transition-[width] ease duration-300 ${
        isActive ? "w-full" : "w-0"
      }`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const Navbar = () => {
  const router = useRouter();
  const { userData } = useUserData();
  const signout = useSignout();
  const [isDropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!isDropdown);
  };

  const handleProfile = () => {
    router.push("/profile/view");
  };

  return (
    <header className="w-full bg-gray-200 px-32 py-8 font-medium flex items-center justify-between">
      <div className="left-[50%]">
        <Link href="/">
          <h1 className="text-2xl font-bold">Sukoon</h1>
        </Link>
      </div>
      <nav>
        <CustomLink href="/" title="Home" className="mr-4" />
        {(userData?.isProfessional === false || !userData) && (
          <CustomLink
            href="/selfassessment"
            title="Self Assessment Tests"
            className="mx-4"
          />
        )}
        <button
          className="ml-4 text-white text-lg bg-blue-600 p-2 px-4 rounded"
          onClick={
            userData ? toggleDropdown : () => router.replace("/register")
          }
        >
          {userData ? "Account" : "Get Started"}
        </button>
        {isDropdown && userData && (
          <div className="absolute right-[127px] z-10 flex justify-end">
            <div className="w-[100px] mt-2 bg-white rounded shadow">
              <p className="w-full p-1 pt-2 text-center font-bold rounded">
                {userData.username}
              </p>
              <button
                className="w-full p-1 pt-2 hover:bg-slate-300 rounded"
                onClick={handleProfile}
              >
                Profile
              </button>
              <button
                className="w-full p-1 pb-2 hover:bg-slate-300 rounded"
                onClick={signout}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
