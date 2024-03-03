import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDTO } from './dto/CreateRecipeDTO';

@Injectable()
export class RecipeService {
    constructor(private readonly prismaService: PrismaService) {}


    async getRecipe(userId: string, recipeId?: string) {
        try {
            if (userId) {
                return this.prismaService.recipe.findFirst({where: {
                    id: recipeId,
                }})
            }
            
            return this.prismaService.recipe.findMany({where: {
                userId: userId,
            }})
        }
        
        catch (e) {
            throw new HttpException("recipes not found", HttpStatus.NOT_FOUND);
        }
    }


    async createRecipe(data: CreateRecipeDTO) {
        try {
            return await this.prismaService.recipe.create({
                data: {
                    title: data.title,
                    descr: data.descr,
                    userId: data.userId,
                }
            })
        }

        catch (e) {
            throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        }
        
    }


    async deleteRecipe(id: string) {
        try {
            await this.prismaService.recipe.delete({
                where: {
                    id: id,
                }
            })

            return HttpStatus.OK;
        }

        catch (e) {
            throw new HttpException('Recipe is not exist', HttpStatus.NOT_FOUND);
        }
        
    }
}
