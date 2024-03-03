import { createStore } from "effector";
import { RecipeType } from "../types/recipeType";
import { createRecipeFx, getRecipeFx } from "../api/recipe";


export const $recipes = createStore<RecipeType[]>([]);

$recipes.on(createRecipeFx.doneData, (recipe, newRecipe) => [...recipe, newRecipe]);

$recipes.on(getRecipeFx.doneData, (_, recipe) => recipe);