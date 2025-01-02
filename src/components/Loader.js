/* Loder Component */

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="spinner-border  inline-block w-8 h-8 border-4 rounded-full text-blue-950"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
