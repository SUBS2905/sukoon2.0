import Image from "next/image";
import React from "react";

const SectionRightImage = ({title, subtitle, text1, text2, image, className=""}) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <div className="w-1/2 flex flex-col items-center self-center">
        <h1 className="inline-block w-full text-dark font-bold text-6xl">
          {title}
        </h1>
        <h3 className="inline-block w-full pt-2 font-semibold text-gray-300 text-xl">
          {subtitle}
        </h3>
        <p className="my-4 text-base font-medium">
          {text1}
        </p>
        <p className="my-4 text-base font-medium">
          {text2}
        </p>
        <div className="flex items-center self-start mt-2"></div>
      </div>
      <div className="w-1/2 flex justify-end">
        <Image src={image} alt="" className="w-3/4 h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default SectionRightImage;
