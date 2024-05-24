import { Button } from "@nextui-org/react";
import bannerImg from "../../assets/images/bannerImage1.png";
import { Link } from "react-router-dom";
import useDataContext from "../../hooks/useDataContext";
import toast from "react-hot-toast";

const HeroBanner = () => {
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
    <div
      className={`  max-sm:min-h-80 sm:min-h-96 bg-cover flex items-center justify-center text-white relative after:content-[''] after:absolute after:size-full after:bg-black after:bg-opacity-55`}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="z-50  space-y-5">
        <h3 className="text-xl sm:text-3xl md:text-4xl text-center max-w-xl">
          KitchenTales: Connect with Home Cooks, Share Your Culinary Adventures
        </h3>
        <div className=" flex justify-center gap-2 items-center ">
          <Link to={"/recipes"}>
            <Button className="text-base sm:text-xl text-white rounded-md bg-dark-green">
              See recipes
            </Button>
          </Link>
          {user ? (
            <Link to={"/add-recipes"}>
              <Button className="text-base sm:text-xl text-white rounded-md bg-terracota-brown">
                Add recipes
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleGoogleAuthSignIn}
              className="text-base sm:text-xl text-white rounded-md bg-terracota-brown"
            >
              Add recipes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
