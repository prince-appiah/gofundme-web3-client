import React from "react";
import { loader } from "../assets";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10  h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img src={loader} alt="loader" className="w-[100px] object-contain h-[100px]" />

      <p className="mt-[20px] font-epilogue text-white font-bold text-[20px] text-center">
        Transaction in progress, please wait...
      </p>
    </div>
  );
};

export default Loader;
