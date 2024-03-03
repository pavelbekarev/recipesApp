import { createEffect } from "effector";
import { RecipeType } from "../types/recipeType";
import { api } from "./axiosInstance";


export const createRecipeFx = createEffect(async (recipe: RecipeType) => {
    const { data } = await api.post("api/recipe/createRecipe", recipe);
    return data;
});


export const getRecipeFx = createEffect(async (userId: string) => {
    const { data } = await api.get("api/recipe/getRecipe/" + userId);
    return data;
})