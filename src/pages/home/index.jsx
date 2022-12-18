import { useEffect, useState } from "react";
import { Campaigns } from "../../components";
import { useWeb3Context } from "../../context";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useWeb3Context();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const response = await getCampaigns();
      console.log("🚀 ~ response", response);
      setIsLoading(false);
      setCampaigns(response);
    };

    if (contract) fetchCampaigns();
  }, [address, contract]);

  return <Campaigns title="All campaigns" isLoading={isLoading} campaigns={campaigns} />;
};

export default HomeScreen;
