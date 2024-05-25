import { useState } from "react";
import SectionTitle from "../components/utils/SectionTitle";
import useDataContext from "../hooks/useDataContext";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
// import { useAxiosPublic } from "../hooks/useAxosPublic";

const AddRecipes = () => {
  const { user } = useDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log("Form submitted");
    console.log(data);
  };

  return (
    <div className="flex flex-col item-center justify-center ">
      <div>
        <SectionTitle title="Add_Recipe" />
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5 px-10">
          <Input
            isRequired
            size="lg"
            name="recipe_name"
            type="text"
            variant="bordered"
            label="Recipe Name"
            {...register("recipe_name", { required: true })}
          />
          <div className="w-full min-h-40 border-dashed rounded-2xl border-2 border-dark-green bg-green-50 relative">
            <label
              htmlFor="recipes_img"
              className="absolute z-10 top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] cursor-pointer"
            >
              <Button
                radius="none"
                className="py-2 px-6 text-lg text-white bg-dark-green rounded-full"
              >
                <IoIosAddCircleOutline className="text-2xl" />
                Add a photo
              </Button>
            </label>
            <input
              type="file"
              className="cursor-pointer w-full  absolute size-full z-10 bg-blue-400 opacity-0"
              id="recipe_img"
              {...register("recipe_img", { required: true })}
            />{" "}
          </div>
          {errors.recipe_img && (
            <p className="text-xs -top-3 relative  text-red-600 pl-2">
              Please add a recipe photo
            </p>
          )}
          <Input
            isRequired
            size="lg"
            name="recipe_details"
            type="text"
            variant="bordered"
            label="Recipe Details"
            {...register("recipe_details", { required: true })}
          />
          <Input
            isRequired
            name="youtube_video_code"
            size="lg"
            type="url"
            variant="bordered"
            label="Embedded youtube video code"
            {...register("youtube_video_code", { required: true })}
          />
          <Input
            name="country"
            isRequired
            size="lg"
            type="text"
            variant="bordered"
            label="Country"
            {...register("country", { required: true })}
          />
          <Select
            size="lg"
            name="category"
            isRequired={true}
            label="Category"
            className=""
            variant="bordered"
            {...register("category", { required: true })}
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
          <div className="text-center pt-5 pb-10">
            <Button
              className="text-base sm:text-xl text-white rounded-md bg-dark-green text-center"
              type="submit"
            >
              Submit recipes
            </Button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};

export default AddRecipes;
