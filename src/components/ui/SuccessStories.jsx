import CountUp from "react-countup";
import SectionTitle from "../utils/SectionTitle";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import useDataContext from "../../hooks/useDataContext";
import { Link } from "react-router-dom";

const SuccessStories = () => {
  const { user, googleAuth } = useDataContext();

  // google auth handler
  const handleGoogleAuthSignIn = () => {
    const toastId = toast.loading("processing...");
    toast("Please Sign in first.", {
      icon: "⚠️",
    });

    googleAuth()
      .then(() => {
        console.log("google authorized successfully");
        // navigate("/");
        toast.success("Sign in successfully.", { id: toastId });
      })
      .catch(err => {
        console.log("something is wrong. ERR:", err);
        toast.error("Sign in Failed.", { id: toastId });
      });
  };

  return (
    <section>
      <SectionTitle title="Success Stories" />
      <div className="flex items-center flex-col lg:flex-row">
        <div className="w-full  bg-blue-200">
          <img
            className="w-full"
            src={
              "https://t3.ftcdn.net/jpg/02/61/98/24/360_F_261982444_jDzDlgClqQDc5DX47Qy4PSayvcn89vQi.jpg"
            }
            alt=""
          />
        </div>
        <div className="lg:max-w-2xl px-5 max-md:my-5 max-lg:my-10 space-y-3">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Dinnertime Woes to &ldquo;Wow!&ldquo; with KitchenTales
          </h3>
          <p className="text-lg">
            Sarah, once a takeout queen, found her culinary confidence with
            KitchenTales. Easy recipes, clear instructions, and a supportive
            community helped her transform into a mealtime hero. Now, she cooks
            delicious dishes that impress everyone!
          </p>
          <div className="space-y-2">
            <p className="text-xl sm:text-2xl font-medium">
              Over{" "}
              <span className="text-dark-green font-bold">
                <CountUp duration={2.5} end={100} />+
              </span>{" "}
              Delicious Recipes to Explore!
            </p>
            <p className="text-xl sm:text-2xl font-medium">
              <span className="text-dark-green font-bold">
                <CountUp duration={2.5} end={50} />+
              </span>{" "}
              Happy Cooks Sharing & Learning!
            </p>
          </div>

          {user ? (
            <Link to={"/add-recipes"}>
              <Button className="mt-3 text-base sm:text-xl text-white rounded-md bg-dark-green">
                Join Community
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleGoogleAuthSignIn}
              className=" text-base sm:text-xl text-white rounded-md bg-dark-green"
            >
              Join Community
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
