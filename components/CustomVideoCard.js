import React from "react";
import { ExternalLinkIcon } from "./icons";
import Link from "next/link";
import Image from "next/image";

const CustomVideoCard = ({
  title,
  thumbnail,
  channelTitle,
  videoId,
  publishTime,
}) => {
  return (
    <div className="w-full lg:w-[320px] flex flex-col gap-3 items-center justify-between bg-blue-50 rounded-md ">
      <div className=" rounded-t-md overflow-hidden">
        <Link
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
        >
          <Image src={thumbnail} alt="" width={320} height={180} />
        </Link>
      </div>
      <div className="w-full px-4 py-2">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <h4 className="text-sm font-semibold text-gray-600">{channelTitle}</h4>
        <h5 className="text-xs font-semibold text-gray-600">Published: {publishTime}</h5>
      </div>
    </div>
  );
};

export default CustomVideoCard;
