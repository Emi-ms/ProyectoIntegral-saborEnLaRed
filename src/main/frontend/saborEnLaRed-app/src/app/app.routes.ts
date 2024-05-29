import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from './components/login/login.component';
import { AdminSectionComponent } from './components/admin/admin-section/admin-section.component';
import { UpdateUserComponent } from './components/user-components/update-user/update-user.component';
import { AdminGuard } from './services/auth/admin-user.guard';
import { PerfilUserComponent } from './components/user-components/perfil-user/perfil-user.component';
import { UserGuard } from './services/auth/normal-user.guard';
import { CategoryListComponent } from './components/admin/category-admin/category-list/category-list.component';
import { CategoryCreateComponent } from './components/admin/category-admin/category-create/category-create.component';
import { CategoryEditComponent } from './components/admin/category-admin/category-edit/category-edit.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeCommentComponent } from './components/recipe/recipe-comment/recipe-comment.component';
import { RecipeRateComponent } from './components/recipe/recipe-rate/recipe-rate.component';
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component';
import { RecipeAdminListComponent } from './components/admin/recipe-admin/recipe-list/recipe-admin-list/recipe-admin-list.component';
import { IngredientListComponent } from './components/admin/ingredient-admin/ingredient-list/ingredient-list.component';
import { IngredientCreateComponent } from './components/admin/ingredient-admin/ingredient-create/ingredient-create.component';
import { IngredientEditComponent } from './components/admin/ingredient-admin/ingredient-edit/ingredient-edit.component';
import { UserListComponent } from './components/admin/user-admin/user-list/user-list.component';
import { UserCreateComponent } from './components/admin/user-admin/user-create/user-create.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/detail/:idRecipe', component: RecipeDetailComponent },


  { path: 'admin-menu', component: AdminSectionComponent, canActivate: [AdminGuard] },
  { path: 'category-admin', component: CategoryListComponent, canActivate: [AdminGuard] },
  { path: 'category/create', component: CategoryCreateComponent, canActivate: [AdminGuard] },
  { path: 'category/edit/:idCategory', component: CategoryEditComponent, canActivate: [AdminGuard] },
  { path: 'recipes-admin', component: RecipeAdminListComponent, canActivate: [AdminGuard] },
  { path: 'ingredients-admin', component: IngredientListComponent, canActivate: [AdminGuard] },
  { path: 'ingredient/create', component: IngredientCreateComponent, canActivate: [AdminGuard] },
  { path: 'ingredient/edit/:idIngredient', component: IngredientEditComponent, canActivate: [AdminGuard] },
  { path: 'user-admin', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'user/create', component: UserCreateComponent, canActivate: [AdminGuard] },


  { path: 'update-user', component: UpdateUserComponent, canActivate: [UserGuard] },
  { path: 'perfil-user', component: PerfilUserComponent, canActivate: [UserGuard] },
  { path: 'recipes/comment/:idRecipe', component: RecipeCommentComponent, canActivate: [UserGuard] },
  { path: 'recipes/rate/:idRecipe', component: RecipeRateComponent, canActivate: [UserGuard] },
  { path: 'create-recipe', component: RecipeCreateComponent, canActivate: [UserGuard] }
];
