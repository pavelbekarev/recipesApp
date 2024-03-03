import { Controller, Get, Param, Query, Post, Body, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDTO } from './dto/CreateRecipeDTO';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}


    @Get("getRecipe/:userId")
    async GetRecipe(
        @Param(":userId") id: string,
        @Query("recipeId") recipeId?: string
    ) {
        return this.recipeService.getRecipe(id, recipeId);
    }


    @Post("createRecipe") 
    async CreateRecipe(@Body() data: CreateRecipeDTO) {
        return this.recipeService.createRecipe(data);
    }


    @Delete("delete/:id") 
    async DeleteRecipe(@Param("id") id: string) {
        return this.recipeService.deleteRecipe(id);
    }
}
