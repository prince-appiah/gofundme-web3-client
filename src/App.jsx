import { Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { CampaignDetailScreen, CreateCampaignScreen, HomeScreen, ProfileScreen } from "./pages";

const App = () => {
  return (
    <main className="relative sm:-8 p-4 bg-[#13131A] min-h-screen flex flex-row">
      <Sidebar />

      <section className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/campaign-details/:id" element={<CampaignDetailScreen />} />
          <Route path="/create-campaign" element={<CreateCampaignScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </section>
    </main>
  );
};

export default App;
