import { Category } from "./Category";
import { RecipeIngredientRequest } from "./RecipeIngredientRequest";
import { User } from "./User";


export interface RecipeRequest {
    recipeName: string;
    description: string;
    userName: string;
    photo: string;
    active: boolean;
    recipeIngredients: RecipeIngredientRequest[];
    categories: Category[];
    user: User;
}