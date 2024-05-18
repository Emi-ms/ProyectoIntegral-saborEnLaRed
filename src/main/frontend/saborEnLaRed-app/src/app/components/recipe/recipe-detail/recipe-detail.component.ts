import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{


  recipe:Recipe |null| undefined;
  idRecipe = -1;

constructor(
  public route: ActivatedRoute,
  private recipeService: RecipeService,
){

}

  ngOnInit(): void {
    this.idRecipe = Number(this.route.snapshot.params['idRecipe']);
    this.recipeService.find(this.idRecipe).subscribe((data: Recipe) => {
      this.recipe = data;
      console.log(this.recipe);
    });
  }



}
