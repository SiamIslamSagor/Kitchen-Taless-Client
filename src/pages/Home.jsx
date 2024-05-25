import HeroBanner from "../components/ui/HeroBanner";
import SectionTitle from "../components/utils/SectionTitle";

const Home = () => {
  return (
    <div className="my-10">
      <HeroBanner />
      <h1 className="text-4xl text-center font-bold">Home</h1>
      <SectionTitle title="Success Story" />
    </div>
  );
};

export default Home;
