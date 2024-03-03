import { createEvent, createStore } from "effector";
import { Recipe } from "../types/Recipe";
import { createRecipeFx, getRecipeFx } from "../api/recipe";


export const $recipes = createStore<Recipe[]>([]);

export const filterRecipes = createEvent<string>();

$recipes.on(createRecipeFx.doneData, (recipe, newRecipe) => [...recipe, newRecipe]);

$recipes.on(getRecipeFx.doneData, (_, recipe) => recipe);
$recipes.on(filterRecipes, (recipes, recipeId) => recipes.filter(item => item.id != recipeId))
