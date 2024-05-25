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
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, googleAuth, handleSignOut } = useDataContext();

  // google auth handler
  const handleGoogleAuthSignIn = () => {
    const toastId = toast.loading("processing...");

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
                  <li>Home</li>
                </Link>
                <Link to={"/"}>
                  <li>Recipes</li>
                </Link>
                <Link to={"/"}>
                  <li>Add_Recipes</li>
                </Link>
                <Link to={"/"}>
                  {user ? (
                    <li onClick={handleSignOut}>Sign out</li>
                  ) : (
                    <li onClick={handleGoogleAuthSignIn}>Sign in</li>
                  )}
                </Link>
              </ul>
            </div>
          </Fade>
        </div>
      )}
      <nav className="z-[98] sticky top-0 md:top-5 flex flex-col item-center justify-center max-sm:px-2 sm:max-lg:px-5 my-5 md:my-8 lg:my-10">
        <div className="flex items-center bg-green-100 w-full rounded-full py-2 px-5">
          {/* logo */}
          <Logo />
          {/* routes */}
          <div className="     flex w-full justify-between items-center">
            <div className="max-lg:hidden">
              <ul className="flex items-center justify-center  text-[22px] font-medium text-black gap-10 w-full">
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/"}>
                  <li>Recipes</li>
                </Link>
                {user && (
                  <Link to={"/"}>
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
                      50 <FaBitcoin className="text-2xl text-yellow-400" />
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
                    onClick={handleGoogleAuthSignIn}
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
