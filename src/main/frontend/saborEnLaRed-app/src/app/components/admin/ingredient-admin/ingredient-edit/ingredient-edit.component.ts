import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Ingredient } from '../../../../models/Ingredient';
import { IngredientService } from '../../../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './ingredient-edit.component.html',
  styleUrl: './ingredient-edit.component.css'
})
export class IngredientEditComponent implements OnInit {

  id: number = 0;
  ingredient: Ingredient = { idIngredient: 0, ingredientName: 'VOID', active: true};

  form: FormGroup = new FormGroup({
    ingredientName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')])
  });

  constructor(
    public ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idIngredient'];
    this.ingredient.idIngredient = this.id;

    this.ingredientService.find(this.id).subscribe((data: Ingredient) => {
      this.ingredient = data;
      console.log(this.ingredient);

      this.form.get('ingredientName')?.setValue(this.ingredient.ingredientName);
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    const updateIngredient: Ingredient = {
      idIngredient: this.ingredient.idIngredient,
      ingredientName: this.form.value.ingredientName,
      active: this.ingredient.active

    };
    console.log(updateIngredient);

    this.ingredientService.update(this.id, updateIngredient).subscribe(res => {
      console.log('Ingrediente actualizado satisfactoriamente!');
      this.router.navigateByUrl('ingredients-admin').then();
    })
  }


}
