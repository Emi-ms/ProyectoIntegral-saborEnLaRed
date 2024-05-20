import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/User';
import { Ingredient } from '../../../models/Ingredient';
import { Category } from '../../../models/Category';
import { RateService } from '../../../services/rate.service';
import { RecipeService } from '../../../services/recipe.service';
import { UserService } from '../../../services/user.service';
import { IngredientService } from '../../../services/ingredient.service';
import { CategoryService } from '../../../services/category.service';
import { SourceTextModule } from 'vm';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css'
})
export class RecipeCreateComponent  implements OnInit{
 
  user: User | null | undefined;
  ingredients: Ingredient[] = [];
  categories: Category[] = [];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private rateService: RateService,
    private ingredientService: IngredientService,
    private categoryService: CategoryService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.ingredientService.getAll().subscribe((data: Ingredient[]) => {
      this.ingredients = data;
      console.log("en el componente de creacion")
      console.log(this.ingredients);
    });

    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
      console.log("en el componente de creacion")
      console.log(this.categories);
    });
    this.user = this.userService.getUserFromSessionStorage();
    console.log("en el componente de creacion")
    console.log(this.user);
  }
}
