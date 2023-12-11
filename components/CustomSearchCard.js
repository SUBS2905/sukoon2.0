import React from "react";
import { ExternalLinkIcon } from "./icons";
import Link from "next/link";

const CustomSearchCard = ({ title, displayLink, snippet, link }) => {
  return (
    <div className="w-full flex items-center justify-between bg-blue-50 p-2 rounded-md ">
      <div className="w-11/12 flex flex-col px-4 py-1">
        <h1 className="text-black font-semibold">{title}</h1>
        <h5 className="text-green-700">{displayLink}</h5>
        <h3 className="text-gray-800">{snippet}</h3>
      </div>
      <div className="w-1/12 flex items-center justify-end px-4">
        <Link href={link} target="_blank">
          <ExternalLinkIcon />
        </Link>
      </div>
    </div>
  );
};

export default CustomSearchCard;
