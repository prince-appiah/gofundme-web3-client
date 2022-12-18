import { createCampaign, dashboard, logout, payment, profile, withdraw } from "../assets";

export const navLinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/payment",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/withdraw",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/logout",
    disabled: true,
  },
];
