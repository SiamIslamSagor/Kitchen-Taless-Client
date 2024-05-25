import SectionTitle from "../utils/SectionTitle";
import developer from "../../assets/images/developer.jpg";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { RiGithubLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const DevInfo = () => {
  return (
    <div className="flex flex-col item-center justify-center ">
      <div>
        <SectionTitle title="Developer Info" />
        <div className="flex max-md:flex-col justify-between items-center gap-5 2xl:gap-20">
          <div className="w-full flex items-center justify-center grow md:size-[500px] object-fit overflow-hidden  ">
            <img className="w-full" src={developer} alt="developer" />
          </div>

          <div className="space-y-3 max-w-2xl md:max-lg:max-w-md  max-md:px-5">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Developer Behind the Recipes!
            </h3>
            <h2 className="text-xl sm:text-2xl font-medium">
              Meet Md Siam Islam Sagor: Your MERN Stack Developer
            </h2>{" "}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-lg">
                Passionate about crafting user-centric web applications, I
                leverage the power of the MERN stack to bring your ideas to
                life.
              </p>
              <p className="text-lg">
                <span className="font-bold">Education: </span>
                Diploma in Engineering (CSE) | Bangladesh Polytechnic Institute,
                Rajshahi (2022 - Present)
              </p>
              <p className="text-lg">
                <span className="font-bold">Experience: </span>1 year + learning
                experience in MERN stack technology.
              </p>
              <p className="text-lg">
                <span className="font-bold">Technical Expertise: </span> React,
                React Router, ES6, Responsive Design, Single Page Applications
                (SPA), Tailwind CSS
              </p>
              <p className="text-lg flex gap-2 items-center flex-wrap">
                <span className="font-bold">Find Me: </span>{" "}
                <span className="gap-2 text-2xl flex items-center ">
                  <Link to={"https://md-siam-official.web.app/"}>
                    <TbWorld className="stroke-1 cursor-pointer " />
                  </Link>
                  <Link to={"https://github.com/SiamIslamSagor"}>
                    <RiGithubLine className="cursor-pointer" />
                  </Link>
                  <Link to={"https://www.linkedin.com/in/mdsiamofficial/"}>
                    <CiLinkedin className="cursor-pointer" />
                  </Link>
                </span>{" "}
                |{" "}
                <span className=" flex items-center">
                  <IoCallOutline /> +8801882477336
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default DevInfo;
