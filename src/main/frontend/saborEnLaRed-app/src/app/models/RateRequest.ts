import { Recipe } from "./Recipe";
import { User } from "./User";

export interface RateRequest {
    rateValue: string;
    user: User;
    recipe:Recipe;
}