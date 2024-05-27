import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import AddRecipes from "../pages/AddRecipes";
import PrivetRoute from "../hoc/PriverRoute";
import RecipeDetails from "../pages/RecipeDetails";
import PurchaseCoins from "../pages/PurchaseCoins";
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
        path: "recipe-details/:id",
        element: (
          <PrivetRoute>
            <RecipeDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "add-recipes",
        element: (
          <PrivetRoute>
            <AddRecipes />
          </PrivetRoute>
        ),
      },
      {
        path: "purchase-coins",
        element: <PurchaseCoins />,
      },
    ],
  },
]);
