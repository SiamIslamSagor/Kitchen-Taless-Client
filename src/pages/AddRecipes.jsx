import SectionTitle from "../components/utils/SectionTitle";
import useDataContext from "../hooks/useDataContext";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { IoIosAddCircleOutline, IoMdCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddRecipes = () => {
  const { user } = useDataContext();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [recipeImage, setRecipeImage] = useState("");
  const [isImgUploading, setIsImgUploading] = useState(false);

  const onSubmit = async data => {
    const toastId = toast.loading("processing...");
    const recipeInfo = {
      recipe_name: data.recipe_name,
      recipe_img: recipeImage,
      recipe_details: data.recipe_details,
      youtube_video_code: data.youtube_video_code,
      country: data.country,
      category: data.category,
      creatorEmail: user?.email ? user?.email : "unknown",
      watchCount: 0,
      purchased_by: [],
    };
    console.log(recipeInfo);
    axiosSecure
      .post("/add-recipe", recipeInfo)
      .then(res => {
        console.log(res);
        toast.success("Recipe added successfully.", { id: toastId });
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to add recipe.", { id: toastId });
      });

    /////////////////////////
    toast.success("Recipe added successfully.", { id: toastId });

    console.log("Form submitted");
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
          {recipeImage ? (
            <div className="flex items-center justify-center ">
              <div className="relative my-5">
                <img
                  src={recipeImage}
                  alt="recipe_image"
                  className="min-h-60 sm:min-h-80 "
                />
                <IoMdCloseCircle
                  onClick={() => setRecipeImage("")}
                  className="absolute -top-5 sm:-top-6 text-3xl sm:text-4xl -right-5 sm:-right-6 cursor-pointer opacity-90"
                />
              </div>
            </div>
          ) : (
            <div className="w-full min-h-40 border-dashed rounded-2xl border-2 border-dark-green bg-green-50 relative">
              <label
                htmlFor="recipes_img"
                className="absolute z-10 top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] cursor-pointer"
              >
                {isImgUploading ? (
                  <Spinner color="success" />
                ) : (
                  <Button
                    radius="none"
                    className="py-2 px-6 text-lg text-white bg-dark-green rounded-full"
                  >
                    <IoIosAddCircleOutline className="text-2xl" />
                    Add a photo
                  </Button>
                )}
              </label>
              <input
                type="file"
                className="cursor-pointer w-full  absolute size-full z-10 bg-blue-400 opacity-0"
                id="image"
                {...register("image", {
                  required: true,
                  onChange: async e => {
                    setIsImgUploading(true);
                    const imageFile = { image: e.target.files[0] };
                    console.log(imageFile);
                    const res = await axiosPublic.post(
                      image_hosting_api,
                      imageFile,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    if (res.data.success) {
                      setRecipeImage(res.data.data.display_url);
                      console.log("image hosted on imgbb successfully.");
                      setIsImgUploading(false);
                    }
                    setIsImgUploading(false);
                  },
                })}
              />{" "}
            </div>
          )}
          {errors.image && (
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
              className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
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
