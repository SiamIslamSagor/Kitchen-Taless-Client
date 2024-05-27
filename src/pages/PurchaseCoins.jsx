import { Button } from "@nextui-org/react";
import { FaBitcoin } from "react-icons/fa";
import SectionTitle from "../components/utils/SectionTitle";

const PurchaseCoins = () => {
  return (
    <div className="flex flex-col item-center justify-center p-3 my-10 ">
      <SectionTitle title="Purchase Coins" />
      <div className="flex gap-5 items-center justify-center flex-wrap">
        <div className="size-60 border rounded-2xl text-5xl p- text-center flex flex-col gap-5 items-center justify-center font-semibold">
          <p className="text-center">
            {" "}
            <span className="flex justify-center items-center gap-2">
              100 <FaBitcoin className="text-3xl text-yellow-400" />
            </span>
            coins
          </p>
          <Button
            className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            pay $1
          </Button>
        </div>
        <div className="size-60 border rounded-2xl text-5xl p- text-center flex flex-col gap-5 items-center justify-center font-semibold">
          <p className="text-center">
            {" "}
            <span className="flex justify-center items-center gap-2">
              500 <FaBitcoin className="text-3xl text-yellow-400" />
            </span>
            coins
          </p>
          <Button
            className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            pay $5
          </Button>
        </div>
        <div className="size-60 border rounded-2xl text-5xl p- text-center flex flex-col gap-5 items-center justify-center font-semibold">
          <p className="text-center">
            {" "}
            <span className="flex justify-center items-center gap-2">
              1000 <FaBitcoin className="text-3xl text-yellow-400" />
            </span>
            coins
          </p>
          <Button
            className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            pay $10
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoins;
