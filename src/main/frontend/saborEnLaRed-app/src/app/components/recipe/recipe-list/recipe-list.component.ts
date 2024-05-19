import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {


  recipes: Recipe[] = [];
  recipesFiltered: Recipe[] = [];

  constructor(private recipeService: RecipeService,

  ) { }

  ngOnInit(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = data;
      this.recipesFiltered = this.recipes;
      console.log(this.recipes);
    });
  }

}
