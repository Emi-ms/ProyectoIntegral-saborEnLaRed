import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../../../../models/Recipe';
import { RecipeService } from '../../../../../services/recipe.service';

@Component({
  selector: 'app-recipe-admin-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './recipe-admin-list.component.html',
  styleUrl: './recipe-admin-list.component.css'
})
export class RecipeAdminListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
  ) { }


  ngOnInit(): void {


    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log(this.recipes);
    });
  }

  deleteRecipe(id: any) {
    this.recipeService.logicDelete(id).subscribe(res => {
      this.recipes = this.recipes.filter(cat => cat.idRecipe !== id);
      console.log('Receta id =' + id + ' eliminada satisfactoriamente!');
    })
  }


}
