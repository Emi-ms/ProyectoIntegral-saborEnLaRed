import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { NgFor, NgIf } from '@angular/common';
import { LoginService } from '../../../services/login-user.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe | null | undefined;
  idRecipe = -1;
  userLoginOn: boolean = false;
  comments: any[] = [];
  recipeCurrentRate: number = 0;
  recipeDoubleCurrentRate: number = 0;

  constructor(
    public route: ActivatedRoute,
    private recipeService: RecipeService,
    private loginService: LoginService,
  ) {

  }

  ngOnInit(): void {
    this.idRecipe = Number(this.route.snapshot.params['idRecipe']);
    this.recipeService.find(this.idRecipe).subscribe((data: Recipe) => {
      this.recipe = data;
      this.comments = this.recipe.comments;
      if (this.recipe.rates && this.recipe.rates.length > 0) {
        this.recipeCurrentRate = Math.min(5, Math.round(this.recipe.rates.map(rate => rate.rateValue).reduce((a, b) => a + b, 0) / this.recipe.rates.length));
        this.recipeDoubleCurrentRate = this.recipe.rates.map(rate => rate.rateValue).reduce((a, b) => a + b, 0) / this.recipe.rates.length;
      } else {
        this.recipeCurrentRate = 0;
        this.recipeDoubleCurrentRate = 0;
      }
      console.log(this.recipeCurrentRate);
      console.log(this.recipe);
    });

    this.loginService.currentUserLoginOn.subscribe({
      next: (loginOn) => {
        this.userLoginOn = loginOn;
        console.log("En el detalle de receta: " + this.userLoginOn);
      }
    })


  }



}
