import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, menu, search, thirdweb } from "../assets";
import { useWeb3Context } from "../context";
import { navLinks } from "../navigation/constants";
import Button from "./button";

const Navbar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navigate = useNavigate();
  const { address, connect } = useWeb3Context();

  return (
    <nav className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 rounded-[100px] flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24]">
        <input
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          placeholder="Search for campaigns"
          type="text"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="Search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

      <div className="flex-row items-center justify-end hidden gap-4 sm:flex">
        <Button
          type="button"
          title={address ? "Create campaign" : "Connect wallet"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) {
              navigate("create-campaign");
            } else {
              connect();
            }
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* small screen */}
      <div className="relative flex items-center justify-between sm:hidden">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] cursor-pointer object-contain"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navLinks.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setIsActive(item.name);
                  setToggleDrawer(false);
                  navigate(item.link);
                }}
                className={`flex p-4 ${isActive === item.link && "bg-[#3a3a443]"}`}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === item.name ? "grayscale-0" : "grayscale"}`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === item.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {item.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <Button
              type="button"
              title={address ? "Create campaign" : "Connect wallet"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) {
                  navigate("create-campaign");
                } else {
                  connect();
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
