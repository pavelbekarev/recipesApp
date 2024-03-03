import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateRecipeDTO{
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    title: string


    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    @MinLength(1)
    descr: string
    

    @IsNotEmpty()
    @IsString()
    userId: string
}