import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useUserData from "@/hooks/useUserData";
import useSignout from "@/hooks/useSignout";
import Loading from "./Loading";

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
const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      href={href}
      className={`${className} my-2 relative group`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[2px] inline-block bg-white absolute w-0 left-0 -bottom-0.5
      group-hover:w-full transition-[width] ease duration-300 ${
        isActive ? "w-full" : "w-0"
      }`}
      >
        &nbsp;
      </span>
    </button>
  );
};

const Navbar = () => {
  const router = useRouter();
  const { userData, isLoading } = useUserData();
  const signout = useSignout();
  const [isDropdown, setDropdown] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!isDropdown);
  };

  const toggleNavbarMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleProfile = () => {
    if (userData?.isProfessional) router.push("/profile/viewProfessional");
    else router.push("/profile/view");
  };

  if (isLoading) {
    return <Loading type="bubbles" />;
  }

  return (
    <header className="w-full bg-gray-200 px-8 py-8 lg:px-32 font-medium flex items-center justify-between relative">
      <div className="w-1/2 lg:w-auto">
        <Link href="/">
          <h1 className="text-2xl font-bold">Sukoon</h1>
        </Link>
      </div>

      <div className="hidden lg:flex">
        <nav>
          <CustomLink href="/" title="Home" className="mr-4" />
          {(userData?.isProfessional === false || !userData) && (
            <CustomLink
              href="/selfassessment"
              title="Self Assessment Tests"
              className="mx-4"
            />
          )}
          {(userData?.isProfessional === false || !userData) && (
            <CustomLink
              href="/professionals"
              title="Professionals"
              className="mx-4"
            />
          )}
          {userData?.isProfessional === true && (
            <CustomLink href="/clients" title="Clients" className="mx-4" />
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
      </div>

      {/* Navbar for small screens */}
      {isMenuOpen && (
        <div className="min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-lg backdrop-blur-md py-32">
          <nav className="flex flex-col items-center justify-center text-white">
            <CustomMobileLink href="/" title="Home" toggle={toggleNavbarMenu} />
            {(userData?.isProfessional === false || !userData) && (
              <CustomMobileLink
                href="/selfassessment"
                title="Self Assessment Tests"
                toggle={toggleNavbarMenu}
              />
            )}
            {(userData?.isProfessional === false || !userData) && (
              <CustomMobileLink
                href="/professionals"
                title="Professionals"
                toggle={toggleNavbarMenu}
              />
            )}
            {userData?.isProfessional === true && (
              <CustomMobileLink
                href="/clients"
                title="Clients"
                toggle={toggleNavbarMenu}
              />
            )}
            <button
              className="text-white text-lg bg-blue-600 p-2 px-4 rounded"
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
        </div>
      )}

      <button
        className="flex flex-col justify-center items-center lg:hidden "
        onClick={toggleNavbarMenu}
      >
        <span
          className={`bg-black transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-black transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isMenuOpen ? "opacity-0" : "opacity-1"
          }`}
        ></span>
        <span
          className={`bg-black transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${
            isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>
    </header>
  );
};

export default Navbar;
