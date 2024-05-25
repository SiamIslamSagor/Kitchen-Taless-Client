import { Link } from "react-router-dom";
import Logo from "../utils/Logo";
import { Divider } from "@nextui-org/react";
import {
  SlSocialDribbble,
  SlSocialInstagram,
  SlSocialTwitter,
} from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex w-full  justify-between bg-green-100 p-5 lg:p-20 flex-wrap">
      <div>
        <Logo />
        <p className="text-lg max-lg:max-w-80 lg:max-w-96">
          Unleash your inner chef with KitchenTales! Explore global recipes,
          master new skills with videos, and share your creations in a vibrant
          community. Cook with confidence, one dish at a time!
        </p>
      </div>{" "}
      <div className="space-y-5 text-lg flex flex-col w-fit ">
        <h3 className="text-2xl font-semibold">Quick links</h3>
        <Link to={"/"}>Home</Link>
        <Link to={"/recipes"}>Recipes</Link>
        <Link to={"#"}>Blog</Link>
      </div>{" "}
      <div className="space-y-5 text-lg flex flex-col w-fit ">
        <h3 className="text-2xl font-semibold">Quick links</h3>
        <Link to={"#"}>Share Recipes</Link>
        <Link to={"#"}>About Us</Link>
        <Link to={"#"}>Contact</Link>
      </div>{" "}
      <div className="space-y-5 text-lg flex flex-col w-fit ">
        <h3 className="text-2xl font-semibold">Legal</h3>
        <Link to={"#"}>Terms Of Use</Link>
        <Link to={"#"}>Privacy & Cookies</Link>
      </div>{" "}
      <Divider className="my-4" />
      <div className="w-full flex justify-between flex-wrap gap-5">
        <h4>
          &copy; {new Date().getFullYear()} KitchenTales All Right Reserved
        </h4>
        <div className="flex items-center gap-5 text-xl">
          <SlSocialTwitter />
          <FaXTwitter />
          <SlSocialDribbble />
          <SlSocialInstagram />
        </div>
      </div>
    </div>
  );
};

export default Footer;
