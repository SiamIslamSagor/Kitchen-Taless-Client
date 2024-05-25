import DevInfo from "../components/ui/DevInfo";
import HeroBanner from "../components/ui/HeroBanner";
import SuccessStories from "../components/ui/SuccessStories";

const Home = () => {
  return (
    <div className="my-10">
      <HeroBanner />
      <SuccessStories />
      <DevInfo />
    </div>
  );
};

export default Home;
