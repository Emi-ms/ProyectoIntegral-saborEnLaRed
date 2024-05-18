import { Category } from "./Category";
import { Rate } from "./Rate";
import { RecipeIgnredient } from "./RecipeIngredient";

export interface Recipe {
    idRecipe: number;
    recipeName: string;
    description: string;
    userName: string;
    photo: string;
    active: boolean;
    recipeIngredients: RecipeIgnredient[];
    comments: Comment[];
    rates: Rate[];
    categories: Category[];

}