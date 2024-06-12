import { Recipe } from "./Recipe";
import { User } from "./User";

export interface CommentRequest {
    commentText: string;
    active: boolean;
    user: User;
    recipe:Recipe;
}