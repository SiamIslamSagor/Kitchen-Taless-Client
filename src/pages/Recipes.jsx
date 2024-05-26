import { useEffect, useState } from "react";
import SectionTitle from "../components/utils/SectionTitle";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
import RecipeCard from "../components/utils/RecipeCard";

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
    <div className="flex flex-col item-center justify-center max-lg:p-3 my-10">
      <div>
        <SectionTitle title="All_Recipes" />
        <div>
          <h3 className="text-4xl text-center mb-20">
            total recipes: {recipes.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 justify-items-center">
            {recipes?.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
