import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import CountUp from "react-countup";
import { MdArrowOutward } from "react-icons/md";
import useDataContext from "../../hooks/useDataContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

/* eslint-disable react/prop-types */
const RecipeCard = ({ recipe, setReFetchRecipe }) => {
  const { user, googleAuth, setReFetchUser } = useDataContext();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleRecipeDetails = recipe => {
    console.log("handleRecipeDetails clicked");
    if (recipe.purchased_by.includes(user?.email)) {
      console.log(recipe.purchased_by, user?.email);
      console.log("this dish i have already booked");
      return navigate(`/recipe-details/${recipe._id}`);
    }
    if (user.email === recipe.creatorEmail) {
      console.log("user in the home");
      return navigate(`/recipe-details/${recipe._id}`);
    }
    if (loggedUser.coin >= 10) {
      console.log("user coins > 10");
      onOpen();
      return;
    } else {
      console.log("user coins < 10");
      toast.error(
        "you don't have enough coins to view the recipe. please purchase coins."
      );
      navigate("/purchase-coins");
      return;
    }
  };

  const handleRecipePurchase = async () => {
    console.log("purchase");
    const res = await axiosSecure.patch(
      `update-user/coins/${loggedUser?.email && loggedUser?.email}?amount=-10`
    );
    console.log(res.data);
    if (res.data.updatedUser.acknowledged) {
      const res = await axiosSecure.patch(`/update-recipe/${recipe._id}`, {
        creatorEmail: recipe.creatorEmail,
        userEmail: loggedUser.email,
      });
      setReFetchUser(state => !state);
      setReFetchRecipe(state => !state);
      console.log(res.data);
    }
  };

  useEffect(() => {
    axiosPublic
      .get(`/user/${user?.email && user?.email}`)
      .then(res => {
        setLoggedUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosPublic, user?.email]);

  //   console.log(userCoins);

  return (
    <div className="border rounded-2xl p-3 sm:p-5 max-w-md w-full space-y-2 sm:space-y-3 hover:shadow-xl duration-300 group">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4 className="text-2xl">Are you sure?</h4>
              </ModalHeader>
              <ModalBody>
                <p>
                  are you sure? you want to purchase the recipe by 10 coins?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  onPress={onClose}
                  onClick={handleRecipePurchase}
                  className=" sm:text-base text-white rounded-md bg-dark-green text-center"
                  type="submit"
                >
                  Continue
                  <MdArrowOutward className="group-hover: group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
          <Button
            onClick={() => handleRecipeDetails(recipe)}
            className=" sm:text-base text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            View The Recipe{" "}
            <MdArrowOutward className="group-hover: group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
          </Button>
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
        {/* {user ? (
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
        )} */}
      </div>
    </div>
  );
};

export default RecipeCard;
