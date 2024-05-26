import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    FormsModule,

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

  constructor(
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = data;
      this.recipesFiltered = this.recipes;
      console.log(this.recipes);
  
      this.recipesFiltered.forEach((recipe) => {
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