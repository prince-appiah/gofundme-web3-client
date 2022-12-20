import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { thirdweb } from "../../assets";
import { Button, Loader } from "../../components";
import { useWeb3Context } from "../../context";
import { calculateBarPercentage, daysLeft } from "../../helpers";

const CampaignDetailScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const [donators, setDonators] = useState([]);
  const { state } = useLocation();
  const { contract, address, donateToCampaign, getDonations } = useWeb3Context();

  const daysRemaining = daysLeft(state.deadline);

  const fetchDonators = async () => {
    try {
      const data = await getDonations(state.pid);
      setDonators(data);
    } catch (error) {
      console.log("🚀 ~ error fetching donators", error);
    }
  };

  const handleDonate = async () => {
    try {
      setIsLoading(true);

      await donateToCampaign(state.pid, amount);
      navigate("/");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("🚀 ~ error donating", error);
    }
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  return (
    <main className="">
      {isLoading && <Loader />}

      <section className="w-full flex md:flex-row flex-col mt-10 gap-[30px] ">
        <div className="flex-col flex-1">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl " />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: "100%" }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <StatsCard title="Days left" value={daysRemaining} />
          <StatsCard title={`Raised of ${state.target} `} value={state.amountCollected} />
          <StatsCard title="Total backers" value={donators.length} />
        </div>
      </section>

      <section className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-2 flex flex-col gap-[40px]">
          <div className="">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

            <div className="flex mt-[20px] gap-[14px] flex-wrap flex-row items-center">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="profile" className="w-[60%] h-[60%] object-contain" />
              </div>

              <div className="">
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-4 font-epilogue font-normal text-[#808191]">
                  10 <span className="">campaigns</span>{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal leading-[26px] text-justify text-[#808191]">
                {state.description}
              </p>
            </div>
          </div>

          <div className="">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <p className="font-epilogue text-[#b2b3bd] leading-[26px] break-all">
                      {idx + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue text-[#808191] leading-[26px] break-all"> {item.donation}</p>
                  </div>
                ))
              ) : (
                <div className="">
                  <p className="font-epilogue font-normal leading-[26px] text-justify text-[#808191]">
                    Be the first to donate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="flex-1 ">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>

            <div className="mt-[30px] ">
              <input
                type="number"
                value={amount}
                onChange={(ev) => setAmount(ev.target.value)}
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              />
            </div>

            <div className="p-4 bg-[#13131a] rounded-[10px] mt-5 ">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white ">
                Back it because you believe in it
              </h4>
              <p className="mt-5 font-epilogue font-normal leading-[22px] text-[#808191] ">
                Support the project for no reward, just because it speaks to you
              </p>
            </div>

            <Button
              title="Fund campaign"
              isDisabled={amount === 0}
              styles="w-full bg-[#8c6dfd]"
              type="button"
              handleClick={handleDonate}
            />
          </div>
        </section>
      </section>
    </main>
  );
};

const StatsCard = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CampaignDetailScreen;
