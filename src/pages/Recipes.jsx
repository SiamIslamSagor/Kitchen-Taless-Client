import { useEffect, useState } from "react";
import SectionTitle from "../components/utils/SectionTitle";
import { useAxiosPublic } from "../hooks/useAxiosPublic";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get(`/all-recipe`)
      .then(res => {
        console.log(res.data.recipes);
        setRecipes(res.data.recipes);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosPublic]);

  return (
    <div className="flex flex-col item-center justify-center border p-5 my-10">
      <div>
        <SectionTitle title="All_Recipes" />
        <div>
          <h3 className="text-4xl text-center">
            total recipes: {recipes.length}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
