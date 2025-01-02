import React from "react";

// UpdateButton Component
const UpdateButton = ({ onClick, isDisabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`bg-blue-950 text-white font-bold rounded-md px-4 py-2 shadow-lg absolute right-3 bottom-8 ${
        isDisabled && "opacity-50 cursor-not-allowed"
      }`}
    >
      Update
    </button>
  );
};

export default UpdateButton;
