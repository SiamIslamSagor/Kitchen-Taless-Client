import { useEffect, useState } from "react";
import SectionTitle from "../components/utils/SectionTitle";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
import RecipeCard from "../components/utils/RecipeCard";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { MdArrowOutward } from "react-icons/md";
import { useForm } from "react-hook-form";

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
