import { Get, Injectable } from '@nestjs/common';
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
            console.log(e);
        }
    }


    async createRecipe(data: CreateRecipeDTO) {
        return await this.prismaService.recipe.create({
            data: {
                title: data.title,
                descr: data.descr,
                userId: data.userId,
            }
        })
    }
}
