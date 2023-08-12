import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const CustomLink = ({ href, title, borderCol = "", className = "" }) => {
  const router = useRouter();

  const isActive = router.asPath === href;

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[2px] inline-block ${borderCol} absolute w-0 left-0 -bottom-0.5
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
  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between">
      <div className="left-[50%] translate-x-[-50%]">
        <h1 className="text-2xl font-bold">Sukoon</h1>
      </div>
      <nav>
        <CustomLink
          href="/"
          title="Home"
          borderCol="bg-black"
          className="mr-4"
        />
        <CustomLink
          href="/selfassessment"
          title="Self Assessment Tests"
          borderCol="bg-black"
          className="mx-4"
        />
        <CustomLink
          href="/register"
          title="Get Started"
          className="mx-4 text-white text-lg bg-blue-600 p-2 rounded"
        />
      </nav>
    </header>
  );
};

export default Navbar;
