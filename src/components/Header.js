
  /* Header */
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-950 text-white p-9 font-serif  ">
      <div className="container mx-auto flex justify-between items-center ">
        <img
          src="/favicon1.ico"
          alt="Ford Logo"
          className=" absolute left-4 right-4 w-auto h-10"
        />
      </div>
    </header>
  );
};

export default Header;
