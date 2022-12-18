import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navLinks } from "../navigation/constants";

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <aside className="relative hidden mr-10 sm:flex">
      <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
        <Link to="/">
          <Icon styles="w-[52px] h-[52px] bg-[#2c2f32] " imgUrl={logo} isActive />
        </Link>

        <div className="flex-1 py-4 mt-12 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px]">
          <div className="flex flex-col items-center justify-center gap-3">
            {navLinks.map((item) => (
              <Icon
                key={item.name}
                {...item}
                isActive={isActive}
                handleClick={() => {
                  if (!item.disabled) {
                    setIsActive(item.name);
                    navigate(item.link);
                  }
                }}
              />
            ))}
          </div>

          <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
        </div>
      </div>
    </aside>
  );
};

export const Icon = ({ styles, imgUrl, name, isActive, disabled, handleClick }) => (
  <div
    onClick={handleClick}
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${!disabled && "cursor-pointer"} ${styles}`}
  >
    {!isActive ? (
      <img src={imgUrl} alt="site-logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="site-logo" className={`"w-1/2 h-1/2 ${isActive !== name && "grayscale"}"`} />
    )}
  </div>
);

export default Sidebar;
