import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { NgFor, NgIf } from '@angular/common';
import { LoginService } from '../../../services/login-user.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  recipeDoubleCurrentRate: number = 0;
  imageSrc: any;


  constructor(
    public route: ActivatedRoute,
    private recipeService: RecipeService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.idRecipe = Number(this.route.snapshot.params['idRecipe']);
    this.recipeService.find(this.idRecipe).subscribe((data: Recipe) => {
      this.recipe = data;
      this.comments = this.recipe.comments;
      if (this.recipe.rates && this.recipe.rates.length > 0) {
        this.recipeDoubleCurrentRate = parseFloat((this.recipe.rates.map(rate => rate.rateValue).reduce((a, b) => a + b, 0) / this.recipe.rates.length).toFixed(2));
      } else {

        this.recipeDoubleCurrentRate = 0;
      }

      this.loginService.isUserLoggedIn.subscribe((value) => {
        this.userLoginOn = value;
      });

      if (this.recipe.photo) {
        this.recipeService.getRecipeImage(this.recipe.photo).subscribe(image => {
          let urlCreator = window.URL;
          this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(
            urlCreator.createObjectURL(image)
          );
        });
      }
    });
  }
}

