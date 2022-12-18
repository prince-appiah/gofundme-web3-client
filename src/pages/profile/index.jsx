import { useEffect, useState } from "react";
import { Campaigns } from "../../components";
import { useWeb3Context } from "../../context";

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useWeb3Context();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const response = await getUserCampaigns();
      console.log("🚀 ~ response", response);
      setIsLoading(false);
      setCampaigns(response);
    };

    if (contract) fetchCampaigns();
  }, [address, contract]);

  return <Campaigns title="All campaigns" isLoading={isLoading} campaigns={campaigns} />;
};

export default ProfileScreen;
