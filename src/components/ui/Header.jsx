import { Button, User } from "@nextui-org/react";
import { FaBitcoin } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isMenuOpen && (
        <div className="fixed lg:hidden text-white  top-0 min-h-screen w-full  z-[999999999999999999] flex  justify-center">
          <div
            className="mx-5 sm:mx-10 md:mx-20  border absolute right-0 top-10 sm:top-20 z-[9999999999]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MdOutlineRestaurantMenu className="text-4xl lg:hidden cursor-pointer z-[9999999999]" />
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
              </ul>
            </div>
          </Fade>
        </div>
      )}
      <nav className="z-[99999999] sticky top-0 md:top-5 flex flex-col item-center justify-center max-sm:px-2 sm:max-lg:px-5 my-5 md:my-8 lg:my-10">
        <div className="flex items-center bg-green-100 w-full rounded-full px-5">
          {/* logo */}
          <div className="flex border-blue-800 items-center gap-1 scale-75 sm:scale-85 lg:scale-100 duration-700 w-min md:mr-10 lg:mr-20">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="61"
                viewBox="0 0 51 61"
                fill="none"
              >
                <g clipPath="url(#clip0_2605_4730)">
                  <path
                    d="M24.6754 4.40607C20.1634 2.31981 14.5334 4.89585 12.0997 10.1594C10.0159 14.666 10.9518 19.683 14.0961 22.3399L2.54945 43.7596C2.36246 44.0977 2.24765 44.4709 2.21228 44.8556C2.17692 45.2404 2.22176 45.6283 2.34397 45.9948C2.46619 46.3613 2.66312 46.6985 2.92232 46.985C3.18152 47.2715 3.49734 47.5012 3.84982 47.6594L5.21133 48.2889C6.70898 48.9814 8.42341 48.2901 9.02477 46.7536L17.8647 24.0824C21.9268 24.7542 26.354 22.2203 28.4377 17.7137C30.8715 12.4502 29.1874 6.49232 24.6754 4.40607ZM47.7747 15.0866L39.2112 27.6528L37.5093 26.8659L42.669 12.7259L41.5335 12.2009L34.1028 25.2909L32.4009 24.504L36.4279 9.84014L35.2924 9.31511L27.1086 27.0146C26.9416 27.3757 26.9249 27.7884 27.0622 28.1618C27.1995 28.5351 27.4795 28.8387 27.8406 29.0057L31.3859 30.645L19.974 51.8162C19.787 52.1543 19.6722 52.5276 19.6368 52.9123C19.6015 53.2971 19.6463 53.6849 19.7685 54.0515C19.8907 54.418 20.0877 54.7552 20.3469 55.0417C20.6061 55.3282 20.9219 55.5578 21.2744 55.7161L22.6359 56.3456C24.1335 57.0381 25.848 56.3468 26.4493 54.8103L35.1872 32.4026L38.7326 34.0419C39.0937 34.2088 39.5063 34.2255 39.8797 34.0883C40.2531 33.951 40.5567 33.671 40.7236 33.3099L48.9075 15.6104L47.772 15.0854L47.7747 15.0866Z"
                    fill="#2E5834"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2605_4730">
                    <rect
                      width="39.36"
                      height="48"
                      fill="white"
                      transform="translate(15.145) rotate(24.8147)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-2xl text-dark-green text-center font-bold [font-family:Potta_One] w-min">
              Kitchen Tales
            </p>
          </div>
          {/* routes */}
          <div className="  border-blue-800   flex w-full justify-between items-center">
            <div className="max-lg:hidden">
              <ul className="flex items-center justify-center  text-[22px] font-medium text-black gap-10 w-full">
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/"}>
                  <li>Recipes</li>
                </Link>
                <Link to={"/"}>
                  <li>Add_Recipes</li>
                </Link>
              </ul>
            </div>
            <div className="flex items-center gap-2 sm:gap-5  justify-end w-full">
              <div>
                <p className="flex items-center gap-2 sm:gap-5">
                  50 <FaBitcoin className="text-2xl text-yellow-400" />
                </p>
              </div>
              <User
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
              <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <HiOutlineMenuAlt1 className="text-2xl lg:hidden cursor-pointer" />
              </div>

              <div>
                <Button
                  radius="none"
                  className="max-lg:hidden h-[30px] py-2 px-6 text-xl text-white bg-dark-green  rounded-full"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
