import { useEffect, useState } from "react";
import SectionTitle from "../components/utils/SectionTitle";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
import RecipeCard from "../components/utils/RecipeCard";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { MdArrowOutward } from "react-icons/md";
import { useForm } from "react-hook-form";
import useDataContext from "../hooks/useDataContext";

const Recipes = () => {
  const { recipeLoading, setRecipeLoading } = useDataContext();
  const [recipes, setRecipes] = useState([]);
  const [reFetchRecipe, setReFetchRecipe] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    setRecipeLoading(true);
    axiosPublic
      .get(`/all-recipe?limit=15`)
      .then(res => {
        setRecipes(res.data.recipes);
        setRecipeLoading(false);
      })
      .catch(err => {
        console.log(err);
        setRecipeLoading(false);
      });
  }, [axiosPublic, reFetchRecipe, setRecipeLoading]);

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    ////////////////////
    const url = `/all-recipe?category=${
      data.category && data.category
    }&country=${data.country && data.country}&search=${
      data.recipe_name && data.recipe_name
    }`;
    axiosPublic
      .get(url)
      .then(res => {
        console.log(res.data.recipes);
        setRecipes(res.data.recipes);
      })
      .catch(err => {
        console.log(err);
      });
    ////////////////////
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col item-center justify-center max-lg:p-3 my-10">
      <div>
        <SectionTitle title="All_Recipes" />
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-4xl max-w4xl mx-auto text-center mb-20 flex max-sm:flex-col items-center gap-5 sm:px-5"
          >
            <Input
              variant="underlined"
              size="lg"
              type="text"
              radius="none"
              className="rounded-2xl"
              label={"Recipe Name"}
              {...register("recipe_name")}
            />
            <Input
              variant="underlined"
              size="lg"
              type="text"
              radius="none"
              className="rounded-2xl"
              label={"Country Name"}
              {...register("country")}
            />
            <Select
              size="lg"
              radius="none"
              name="category"
              label="Category"
              className=""
              variant="underlined"
              {...register("category")}
            >
              <SelectItem key={"Breakfast"} value={"Breakfast"}>
                Breakfast
              </SelectItem>
              <SelectItem key={"Lunch"} value={"Lunch"}>
                Lunch
              </SelectItem>
              <SelectItem key={"Dinner"} value={"Dinner"}>
                Dinner
              </SelectItem>
            </Select>
            <div>
              <Button
                className=" sm:text-base text-white rounded-md bg-dark-green text-center"
                type="submit"
              >
                Search
                <MdArrowOutward className="group-hover: group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
              </Button>
            </div>
          </form>

          {recipeLoading ? (
            <div className="min-h-[80vh] flex items-center justify-center ">
              <Spinner color="success" label="Loading..." size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 justify-items-center">
              {recipes?.map(recipe => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  setReFetchRecipe={setReFetchRecipe}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
