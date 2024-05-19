import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recipe } from '../../../models/Recipe';
import { User } from '../../../models/User';
import { RecipeService } from '../../../services/recipe.service';
import { UserService } from '../../../services/user.service';
import { RateService } from '../../../services/rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-rate',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './recipe-rate.component.html',
  styleUrl: './recipe-rate.component.css'
})
export class RecipeRateComponent implements OnInit{
  recipe: Recipe | null | undefined;
  user: User | null | undefined;
  idRecipe = -1;

  constructor(
    public route: ActivatedRoute,
    private recipeService: RecipeService,
    private userService: UserService,
    private rateService: RateService,
    public router: Router
  ) { }


  form: FormGroup = new FormGroup({
    rateValue: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]*$')]),
    user: new FormControl(''),
    recipe: new FormControl(''),

  });

  ngOnInit(): void {
    this.idRecipe = Number(this.route.snapshot.params['idRecipe']);
    this.recipeService.find(this.idRecipe).subscribe((data: Recipe) => {
      this.recipe = data;
      console.log("en el componente de puntuacion")
      console.log(this.recipe);
    });

    this.user = this.userService.getUserFromSessionStorage();
    console.log("en el componente de puntuacion")
    console.log(this.user);
  }

  submit() {

    this.form.patchValue({ active: true, user: this.user, recipe: this.recipe })
    console.log("en el submit de puntuacion")
    console.log(this.form.value)

    this.rateService.save(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Puntuación registrada correctamente');
        Swal.fire("Gracias por tu puntuación cocinilla!!", "❤❤❤", "success")
        this.router.navigateByUrl('/recipes/detail/' + this.recipe?.idRecipe)
          .then();
      },
      error: (error: any) => {
        console.log("en el error del comentario", error)


        Swal.fire("Se produjo un error al registrar tu comentario!", "Por favor vuelve a intentarlo", "error")

      }
    });
  }


  get f() {
    return this.form.controls;
  }







}