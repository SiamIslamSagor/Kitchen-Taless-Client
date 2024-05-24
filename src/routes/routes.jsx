import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import AddRecipes from "../pages/AddRecipes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "add-recipes",
        element: <AddRecipes />,
      },
    ],
  },
]);
