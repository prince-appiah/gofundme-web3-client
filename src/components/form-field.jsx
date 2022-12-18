import React from "react";

const FormField = ({ name, label, placeholder, type, value, handleChange, isTextArea }) => {
  return (
    <label htmlFor="" className="flex flex-col flex-1 w-full">
      {label && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{label}</span>
      )}

      {isTextArea ? (
        <textarea
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          type={type}
          name={name}
          required
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={10}
        ></textarea>
      ) : (
        <input
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          type={type}
          name={name}
          required
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          step="0.1"
        />
      )}
    </label>
  );
};

export default FormField;
