import { Link } from "react-router-dom";
import Logo from "../utils/Logo";
import { Divider } from "@nextui-org/react";
import {
  SlSocialDribbble,
  SlSocialInstagram,
  SlSocialTwitter,
} from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { RiGithubLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="flex w-full  justify-between bg-green-100 p-5 lg:p-20 flex-wrap mt-20">
      <div className="space-y-2">
        <Logo />
        <p className="text-lg max-lg:max-w-80 lg:max-w-96">
          Unleash your inner chef with KitchenTales! Explore global recipes,
          master new skills with videos, and share your creations in a vibrant
          community. Cook with confidence, one dish at a time!
        </p>
      </div>{" "}
      <div className="space-y-5 text-lg flex flex-col w-fit ">
        <h3 className="text-2xl font-semibold">Quick links</h3>
        <Link className="hover:underline" to={"/"}>
          Home
        </Link>
        <Link className="hover:underline" to={"/recipes"}>
          Recipes
        </Link>
        <Link className="hover:underline" to={"#"}>
          Blog
        </Link>
      </div>{" "}
      <div className="space-y-5 text-lg flex flex-col w-fit ">
        <h3 className="text-2xl font-semibold">Developer links</h3>
        <p className="flex items-center gap-2">
          <IoCallOutline /> +8801882477336
        </p>
        <Link
          className="hover:underline flex items-center gap-2"
          to={"https://md-siam-official.web.app/"}
        >
          <TbWorld className="stroke-1 cursor-pointer " />
          Portfolio
        </Link>
        <Link
          className="hover:underline flex items-center gap-2"
          to={"https://github.com/SiamIslamSagor"}
        >
          {" "}
          <RiGithubLine className="cursor-pointer" />
          Github
        </Link>
        <Link
          className="hover:underline flex items-center gap-2"
          to={"https://www.linkedin.com/in/mdsiamofficial/"}
        >
          {" "}
          <CiLinkedin className="cursor-pointer" />
          Linkedin
        </Link>
      </div>{" "}
      <div className="space-y-5 text-lg flex flex-col w-fit ">
        <h3 className="text-2xl font-semibold">Legal</h3>
        <Link className="hover:underline" to={"#"}>
          Terms Of Use
        </Link>
        <Link className="hover:underline" to={"#"}>
          Privacy & Cookies
        </Link>
      </div>{" "}
      <Divider className="my-4" />
      <div className="w-full flex justify-between flex-wrap gap-5">
        <h4>
          &copy; {new Date().getFullYear()} KitchenTales All Right Reserved
        </h4>
        <div className="flex items-center gap-5 text-xl *:cursor-pointer">
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
