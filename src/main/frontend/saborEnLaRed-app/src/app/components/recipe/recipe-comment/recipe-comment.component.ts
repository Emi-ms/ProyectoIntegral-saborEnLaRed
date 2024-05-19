import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RecipeService } from '../../../services/recipe.service';
import { CommentService } from '../../../services/comment.service';
import { Recipe } from '../../../models/Recipe';
import { User } from '../../../models/User';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-recipe-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
  ],
  templateUrl: './recipe-comment.component.html',
  styleUrl: './recipe-comment.component.css'
})
export class RecipeCommentComponent implements OnInit {

  recipe: Recipe | null | undefined;
  user: User | null | undefined;
  idRecipe = -1;


  constructor(
    public route: ActivatedRoute,
    private recipeService: RecipeService,
    private userService: UserService,
    private commentService: CommentService,
    public router: Router
  ) { }

  form: FormGroup = new FormGroup({
    commentText: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    active: new FormControl(''),
    user: new FormControl(''),
    recipe: new FormControl(''),

  });


  ngOnInit(): void {
    this.idRecipe = Number(this.route.snapshot.params['idRecipe']);
    this.recipeService.find(this.idRecipe).subscribe((data: Recipe) => {
      this.recipe = data;
      console.log("en el componente de comentarios")
      console.log(this.recipe);
    });

    this.user = this.userService.getUserFromSessionStorage();
    console.log("en el componente de comentarios")
    console.log(this.user);
  }


  submit() {

    this.form.patchValue({ active: true, user: this.user, recipe: this.recipe })
    console.log("en el submit de comentarios")
    console.log(this.form.value)

    this.commentService.save(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Comentario registrado correctamente');
        Swal.fire("Gracias por tu comentario cocinilla!!", ": )", "success")
        this.router.navigateByUrl('/')
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
