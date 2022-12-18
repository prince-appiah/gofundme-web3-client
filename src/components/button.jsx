import React from "react";

const Button = ({ styles, type, title, handleClick, isDisabled = false }) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`font-epilogue font-semibold text-16px leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
