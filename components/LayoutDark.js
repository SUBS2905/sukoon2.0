import React from "react";

const LayoutDark = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-full z-0 inline-block p-32 bg-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default LayoutDark;
