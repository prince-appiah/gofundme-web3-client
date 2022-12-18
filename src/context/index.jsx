import { createContext, useContext } from "react";

import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const { contract } = useContract(import.meta.env.VITE_THIRDWEB_CONTRACT_ID);
  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async ({ title, description, target, image, deadline }) => {
    try {
      const campaign = await createCampaign([
        address, // owner of the campaign
        title,
        description,
        target,
        new Date(deadline).getTime(),
        image,
      ]);
      console.log("🚀 ~ campaign created", campaign);

      return campaign;
    } catch (error) {
      console.log("🚀 ~ error creating campaign", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call("getCampaigns");

      const formattedCampaigns = campaigns.map((campaign, idx) => ({
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pid: idx,
        owner: campaign.owner,
      }));

      return formattedCampaigns;
    } catch (error) {
      console.log("🚀 ~ error getting all campaigns", error);
    }
  };

  const getUserCampaigns = async () => {
    try {
      const campaigns = await contract.call("getCampaigns");

      const filteredCampaigns = campaigns
        .filter((campaign) => campaign.owner === address)
        .map((campaign, idx) => ({
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
          image: campaign.image,
          pid: idx,
          owner: campaign.owner,
        }));

      return filteredCampaigns;
    } catch (error) {
      console.log("🚀 ~ error getting all campaigns", error);
    }
  };

  const donateToCampaign = async (pid, amount) => {
    const data = await contract.call("donateToCampaign", pid, { value: ethers.utils.parseEther(amount) });

    return data;
  };

  const getDonations = async (pid) => {
    const data = await contract.call("getDonators", pid);

    const numberOfDonations = data[0].length;

    const formattedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      formattedDonations.push({
        donator: data[0][i],
        donation: ethers.utils.formatEther(data[1][i].toString()),
      });
    }

    return formattedDonations;
  };

  return (
    <Web3Context.Provider
      value={{
        publishCampaign,
        getCampaigns,
        getUserCampaigns,
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        donateToCampaign,
        getDonations,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);
