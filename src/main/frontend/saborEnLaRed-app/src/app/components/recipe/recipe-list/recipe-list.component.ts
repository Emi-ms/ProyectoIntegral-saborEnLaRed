import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {


  recipes: Recipe[] = [];
  recipesFiltered: Recipe[] = [];
  imageSrcs: { [key: string]: SafeUrl } = {};
  nameFilter: string = '';
  categoryFilter: string = '';
  ingredientFilter: string = '';
  categories: Category[] = [];

  constructor(
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer,
    private categoriesService: CategoryService,

  ) { }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);
    });
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = data;
      this.recipesFiltered = this.recipes;
     

      this.recipesFiltered.forEach((recipe) => {
        recipe.rate = recipe.rates.length > 0
          ? +(recipe.rates.reduce((sum, rating) => sum + rating.rateValue, 0) / recipe.rates.length).toFixed(2)
          : 0;
        if (recipe.photo) {
          this.recipeService.getRecipeImage(recipe.photo).subscribe(image => {
            let urlCreator = window.URL;
            this.imageSrcs[recipe.photo] = this.sanitizer.bypassSecurityTrustUrl(
              urlCreator.createObjectURL(image)
            );
          });
        }
      });
    });
  }

  filterRecipes(): void {
    console.log(this.nameFilter);
    console.log(this.categoryFilter);
    if (this.nameFilter === '' && this.categoryFilter === '' && this.ingredientFilter === '') {
      this.recipesFiltered = this.recipes;
    } else {
      this.recipesFiltered = this.recipes.filter(recipe =>
        (this.nameFilter === '' || recipe.recipeName.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
        (this.categoryFilter === '' || recipe.categories.some(category => category.categoryName.toLowerCase().includes(this.categoryFilter.toLowerCase()))) &&
        (this.ingredientFilter === '' || recipe.recipeIngredients.some(ingredient => ingredient.ingredientName.toLowerCase().includes(this.ingredientFilter.toLowerCase())))
      );
    }
  }
}