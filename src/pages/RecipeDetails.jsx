import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
import CountUp from "react-countup";
import PurchaseCoins from "./PurchaseCoins";

const RecipeDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [recipe, setRecipe] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get(`/recipe/${id && id}`)
      .then(res => {
        console.log(res.data);
        setRecipe(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosPublic, id]);

  return (
    <div className="flex flex-col item-center justify-center p-5 my-10 space-y-10">
      <div className="mx-auto w-[340px] h-[195px] sm:w-[560px] sm:h-[315px] md:w-[760px] md:h-[515px] lg:w-[920px] lg:h-[615px] xl:w-[1120px] xl:h-[695px] 2xl:w-[1236px] 2xl:h-[695px]">
        <iframe
          src={recipe?.youtube_video_code}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="size-full"
        ></iframe>
      </div>
      <div>
        <div className="space-y-1 sm:space-y-4">
          <h1 className="text-2xl font-semibold">{recipe?.recipe_name}</h1>
          <p>
            purchased by{" "}
            <CountUp
              className="font-semibold"
              duration={2.5}
              end={recipe?.purchased_by?.length}
            />{" "}
            people
          </p>
          <p className="truncate  max-sm:text-sm">
            creator email{" "}
            <span className=" font-semibold">{recipe?.creatorEmail}</span>
          </p>
          <p>
            country : <span className="font-semibold">{recipe?.country}</span>
          </p>
          <p>
            Watch count :{" "}
            <span className="font-semibold">{recipe?.watchCount}</span>
          </p>
          <p>
            category : <span className="font-semibold">{recipe?.category}</span>
          </p>

          <p>
            recipe details :{" "}
            <span className="font-semibold">{recipe?.recipe_details}</span>
          </p>
        </div>
      </div>
      <PurchaseCoins />
    </div>
  );
};

export default RecipeDetails;
