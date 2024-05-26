import { Button } from "@nextui-org/react";
import CountUp from "react-countup";
import { MdArrowOutward } from "react-icons/md";
import useDataContext from "../../hooks/useDataContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const RecipeCard = ({ recipe }) => {
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
    <div className="border rounded-2xl p-3 sm:p-5 max-w-md w-full space-y-2 sm:space-y-3 hover:shadow-xl duration-300 group">
      <div className="">
        <img
          src={recipe.recipe_img}
          alt={recipe.recipe_name}
          className="h-64 sm:h-72 w-full rounded-lg"
        />
      </div>
      <div className="sm:space-y-1">
        <h1 className="text-2xl font-semibold">{recipe.recipe_name}</h1>
        <p>
          purchased by{" "}
          <CountUp
            className="font-semibold"
            duration={2.5}
            end={recipe.purchased_by.length}
          />{" "}
          people
        </p>
        <p className="truncate  max-sm:text-sm">
          creator email{" "}
          <span className=" font-semibold">{recipe.creatorEmail}</span>
        </p>
        <p>
          country : <span className="font-semibold">{recipe.country}</span>
        </p>
      </div>
      <div className="text-right">
        {user ? (
          <Link to={`/recipe-details/${recipe._id}`}>
            <Button
              className=" sm:text-base text-white rounded-md bg-dark-green text-center"
              type="submit"
            >
              View The Recipe{" "}
              <MdArrowOutward className="group-hover: group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleGoogleAuthSignIn}
            className=" sm:text-base text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            View The Recipe
            <MdArrowOutward className="group-hover: group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
