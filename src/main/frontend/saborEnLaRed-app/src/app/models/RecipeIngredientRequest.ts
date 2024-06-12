import { Ingredient } from "./Ingredient";

export interface RecipeIngredientRequest {
    
    ingredient: Ingredient;
    quantity: number;
    unitMeasure: string;
}