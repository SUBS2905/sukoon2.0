import useUserData from "@/hooks/useUserData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SectionLeftImage = ({
  title,
  subtitle,
  text1,
  text2,
  image,
  className = "",
}) => {
  const { userData } = useUserData();
  return (
    <div className={`flex justify-between items-center w-full ${className}`}>
      <div className="w-1/2">
        <Image src={image} alt="" className="w-3/4 h-auto rounded-lg" />
      </div>
      <div className="w-1/2 flex flex-col items-center self-center">
        <h1 className="inline-block w-full text-dark font-bold text-6xl">
          {title}
        </h1>
        <h3 className="inline-block w-full pt-2 font-semibold text-gray-700 text-xl">
          {subtitle}
        </h3>
        <p className="my-4 text-base font-medium">{text1}</p>
        <p className="my-4 text-base font-medium">{text2}</p>
        <div className="flex items-center self-start mt-2">
          {(userData?.isProfessional === false || !userData) && (
            <Link
              href="/selfassessment"
              className="flex items-center bg-gray-600 text-white p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark "
            >
              Take Self Assessment Test
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionLeftImage;
