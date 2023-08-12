import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-full z-0 inline-block p-32 bg-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
