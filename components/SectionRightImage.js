import Image from "next/image";
import React from "react";

const SectionRightImage = ({title, subtitle, text1, text2, image, className=""}) => {
  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between w-full ${className}`}>
      <div className="flex flex-col items-center self-center lg:w-1/2">
        <h1 className="inline-block w-full text-dark font-bold text-2xl text-center lg:text-6xl lg:text-left">
          {title}
        </h1>
        <h3 className="inline-block w-full pt-2 font-semibold text-gray-300 text-center text-lg lg:text-xl lg:text-left">
          {subtitle}
        </h3>
        <p className="my-4 text-sm font-medium text-center lg:text-base lg:text-left">
          {text1}
        </p>
        <p className="my-4 text-sm font-medium text-center lg:text-base lg:text-left">
          {text2}
        </p>
        <div className="flex items-center self-start mt-2"></div>
      </div>
      <div className="flex justify-center lg:justify-end lg:w-1/2">
        <Image src={image} alt="" className="w-full h-auto rounded-lg lg:w-3/4" />
      </div>
    </div>
  );
};

export default SectionRightImage;
