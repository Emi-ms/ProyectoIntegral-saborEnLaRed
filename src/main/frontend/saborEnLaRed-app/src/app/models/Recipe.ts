import { Category } from "./Category";
import { Rate } from "./Rate";
import { RecipeIngredient } from "./RecipeIngredient";

export interface Recipe {
    idRecipe: number;
    recipeName: string;
    description: string;
    userName: string;
    photo: string;
    active: boolean;
    recipeIngredients: RecipeIngredient[];
    comments: Comment[];
    rates: Rate[];
    categories: Category[];

}