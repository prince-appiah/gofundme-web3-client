import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { money } from "../../assets";
import { Button, FormField, Loader } from "../../components";
import { useWeb3Context } from "../../context";
import { checkImage } from "../../helpers";

const CreateCampaignScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", title: "", description: "", target: "", deadline: "", image: "" });
  const navigate = useNavigate();
  const { createCampaign } = useWeb3Context();

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { target, image } = form;

    checkImage(image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({ ...form, target: ethers.utils.parseUnits(target, 18) });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Image not found");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <main className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[30px] text-white">
          Start a campaign
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Your name *"
            placeholder="John Doe"
            type="text"
            value={form.name}
            name="name"
            handleChange={(e) => handleInputChange(e)}
          />
          <FormField
            label="Campaign title *"
            placeholder="Write a title"
            type="text"
            value={form.title}
            name="title"
            handleChange={(e) => handleInputChange(e)}
          />
        </div>

        <FormField
          label="Story *"
          placeholder="Write your story..."
          type="textarea"
          value={form.description}
          name="description"
          handleChange={(e) => handleInputChange(e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[24px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Goal *"
            placeholder="ETH 0.80"
            type="text"
            value={form.target}
            name="target"
            handleChange={(e) => handleInputChange(e)}
          />
          <FormField
            label="End date*"
            placeholder="End date"
            type="date"
            value={form.deadline}
            name="deadline"
            handleChange={(e) => handleInputChange(e)}
          />
        </div>

        <FormField
          label="Campaign url *"
          placeholder="Place image url of your campaign"
          type="url"
          value={form.image}
          name="image"
          handleChange={(e) => handleInputChange(e)}
        />

        <div className="justify-center items-center mt-[40px] ">
          <Button type="submit" title="Submit campaign" styles="bg-[#1dc071]" />
        </div>
      </form>
    </main>
  );
};

export default CreateCampaignScreen;
