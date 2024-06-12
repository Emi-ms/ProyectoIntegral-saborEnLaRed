import { Category } from "./Category";
import { Rate } from "./Rate";
import { RecipeIngredient } from "./RecipeIngredient";
import { User } from "./User";

export interface Recipe {
    idRecipe: number;
    recipeName: string;
    description: string;
    user:User;
    userName: string;
    photo: string;
    active: boolean;
    recipeIngredients: RecipeIngredient[];
    comments: Comment[];
    rates: Rate[];
    categories: Category[];
    rate:number;

}