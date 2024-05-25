import { useState } from "react";
import SectionTitle from "../components/utils/SectionTitle";
import useDataContext from "../hooks/useDataContext";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { useAxiosPublic } from "../hooks/useAxosPublic";

const AddRecipes = () => {
  const { user } = useDataContext();
  const [formData, setFormData] = useState({
    RecipeName: "",
    RecipeImage: "",
    RecipeDetails: "",
    YoutubeVideo: "",
    country: "",
    category: "",
    creatorEmail: user?.email ? user?.email : "unknown",
    watchCount: 0,
    purchased_by: [],
  });

  // const axiosPublic = useAxiosPublic()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // const res = await axios.post("/api/recipes", formData);
    // if (res.status === 200) {
    // }
    console.log(formData);
    alert("Recipe added successfully");
  };

  return (
    <div className="flex flex-col item-center justify-center ">
      <div>
        <SectionTitle title="Add_Recipe" />
        <form onSubmit={handleSubmit} className=" space-y-5 px-10">
          <Input
            isRequired
            size="lg"
            type="text"
            variant="bordered"
            label="Recipe Name"
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
              id="recipes_img"
            />
          </div>
          <Input
            isRequired
            size="lg"
            type="text"
            variant="bordered"
            label="Recipe Details"
          />
          <Input
            isRequired
            size="lg"
            type="text"
            variant="bordered"
            label="Embedded youtube video code"
          />
          <Input
            isRequired
            size="lg"
            type="email"
            variant="bordered"
            label="Country"
          />
          <Select
            size="lg"
            isRequired
            label="Category"
            defaultSelectedKeys={["Breakfast, Lunch, Dinner"]}
            className=""
            key={""}
            variant="bordered"
          >
            <SelectItem
              className={{
                base: "hidden",
              }}
              key={""}
              value={"Breakfast"}
            >
              Breakfast
            </SelectItem>
            <SelectItem
              className={{
                base: "hidden",
              }}
              key={""}
              value={"Lunch"}
            >
              Lunch
            </SelectItem>
            <SelectItem
              className={{
                base: "hidden",
              }}
              key={""}
              value={"Dinner"}
            >
              Dinner
            </SelectItem>
          </Select>
          <div className="text-center pt-5 pb-10">
            <Button className="text-base sm:text-xl text-white rounded-md bg-dark-green text-center">
              Submit recipes
            </Button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};

export default AddRecipes;
