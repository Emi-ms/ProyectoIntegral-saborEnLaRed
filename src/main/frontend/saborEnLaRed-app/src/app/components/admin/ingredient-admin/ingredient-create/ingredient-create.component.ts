import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IngredientService } from '../../../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-create',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ReactiveFormsModule,],
  templateUrl: './ingredient-create.component.html',
  styleUrl: './ingredient-create.component.css'
})
export class IngredientCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({
    ingredientName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')])
  });

  constructor(
    private ingredientService: IngredientService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.ingredientService.create(this.form.value).subscribe(res => {
      console.log('Ingrediente creado correctamente!' + res.ingredientName);
      this.router.navigateByUrl('ingredients-admin').then();
    })
  }
}
