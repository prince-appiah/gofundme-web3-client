import { useNavigate } from "react-router-dom";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../helpers";
import Loader from "./loader";

const Campaigns = ({ isLoading, title, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <section className="">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <Loader />}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] text-[#818183] leading-[30px]">No campaigns found</p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, idx) => (
            <CampaignCard key={idx} {...campaign} handleClick={() => handleNavigate(campaign)} />
          ))}
      </div>
    </section>
  );
};

const CampaignCard = ({ handleClick, owner, title, description, target, deadline, amountCollected, image }) => {
  const daysRemaining = daysLeft(deadline);

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img src={image} alt={title} className="object-cover  rounded-[15px] w-full h-[158px] " />

      <div className="flex flex-col p-4 ">
        <div className="flex flex-row items-center mb-[18px]">
          <img className="w-[17px] h-[17px] object-contain" src={tagType} alt="tagType" />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Category</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left truncate leading-[26px]">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue  text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <p className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</p>
            <p className="font-epilogue leading-[18px] mt-[3px] text-[12px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{daysRemaining}</p>
            <p className="font-epilogue leading-[18px] mt-[3px] text-[12px] text-[#808191] sm:max-w-[120px] truncate">
              Days left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px] ">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={thirdweb} alt="user" className="object-contain w-1/2 h-1/2 " />
          </div>

          <p className="flex-1 font-epilogue text-[#808191] truncate">
            By: <span className="text-[#b2b3bd]">{owner}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
