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
export class RecipeDetailComponent implements OnInit{

  recipe:Recipe |null| undefined;
  idRecipe = -1;
  userLoginOn:boolean = false;
  comments: any[] = [];

constructor(
  public route: ActivatedRoute,
  private recipeService: RecipeService,
  private loginService:LoginService,
){

}

  ngOnInit(): void {
    this.idRecipe = Number(this.route.snapshot.params['idRecipe']);
    this.recipeService.find(this.idRecipe).subscribe((data: Recipe) => {
      this.recipe = data;
      this.comments = this.recipe.comments;
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
