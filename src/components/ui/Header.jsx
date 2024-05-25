import { Button, User } from "@nextui-org/react";
import { FaBitcoin } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import useDataContext from "../../hooks/useDataContext";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../utils/Logo";
import CountUp from "react-countup";
import { useAxiosPublic } from "../../hooks/useAxosPublic";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, googleAuth, handleSignOut } = useDataContext();

  const axiosPublic = useAxiosPublic();

  const handleGoogleLogin = () => {
    const toastId = toast.loading("processing...");

    googleAuth()
      .then(res => {
        const userData = {
          displayName: res?.user?.displayName,
          photoURL: res?.user?.photoURL,
          email: res?.user?.email,
          coin: 50,
        };

        axiosPublic
          .post("/users", userData)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
            toast.error("Failed to login.", { id: toastId });
          });

        toast.success("Sign in successfully.", { id: toastId });
      })
      .catch(() => {
        toast.error("Sign in Failed.", { id: toastId });
      });
  };

  return (
    <>
      <Toaster />
      {isMenuOpen && (
        <div className="fixed lg:hidden text-white  top-0 min-h-screen w-full  z-[99] flex  justify-center">
          <div
            className="mx-5 sm:mx-10 md:mx-20  border absolute right-0 top-10 sm:top-20 z-[99]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MdOutlineRestaurantMenu className="text-4xl lg:hidden cursor-pointer z-[99]" />
          </div>
          <Fade duration={500} className=" bg-dark-green w-full">
            <div className="lg:hidden  mt-60">
              <ul className="text-center flex items-center flex-col gap-8 text-3xl sm:text-4xl   font-medium w-full">
                <Link to={"/"}>
                  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>Home</li>
                </Link>
                <Link to={"/recipes"}>
                  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>Recipes</li>
                </Link>
                <Link to={"/add-recipes"}>
                  <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    Add_Recipes
                  </li>
                </Link>
                <span className="cursor-pointer">
                  {user ? (
                    <li onClick={handleSignOut}>Sign out</li>
                  ) : (
                    <li onClick={handleGoogleLogin}>Sign in</li>
                  )}
                </span>
              </ul>
            </div>
          </Fade>
        </div>
      )}
      <nav className="z-[98] sticky top-0 md:top-5 flex flex-col item-center justify-center max-sm:px-2 sm:max-lg:px-5 my-5 md:my-8 lg:my-10">
        <div className="flex items-center bg-green-100 w-full rounded-full py-2 px-5 lg:px-10">
          {/* logo */}
          <Logo />
          {/* routes */}
          <div className="     flex w-full justify-between items-center">
            <div className="max-lg:hidden">
              <ul className="flex items-center justify-center  text-[22px] font-medium text-black gap-10 w-full">
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/recipes"}>
                  <li>Recipes</li>
                </Link>
                {user && (
                  <Link to={"/add-recipes"}>
                    <li>Add_Recipes</li>
                  </Link>
                )}
              </ul>
            </div>
            <div className="flex items-center gap-2 sm:gap-5  justify-end w-full">
              {user && (
                <>
                  <div>
                    <p className="flex items-center gap-2 sm:gap-2 leading-none text-xl">
                      <CountUp duration={2.5} end={50} />{" "}
                      <FaBitcoin className="text-2xl text-yellow-400" />
                    </p>
                  </div>
                  <User
                    avatarProps={{
                      src: user?.photoURL,
                    }}
                  />
                </>
              )}
              <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <HiOutlineMenuAlt1 className="text-2xl lg:hidden cursor-pointer" />
              </div>

              <div>
                {user ? (
                  <Button
                    onClick={handleSignOut}
                    radius="none"
                    className="max-lg:hidden h-[30px] py-2 px-6 text-xl text-white bg-dark-green  rounded-full"
                  >
                    Sign out
                  </Button>
                ) : (
                  <Button
                    onClick={handleGoogleLogin}
                    radius="none"
                    className="max-lg:hidden h-[30px] py-2 px-6 text-xl text-white bg-dark-green  rounded-full"
                  >
                    Sign in
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
