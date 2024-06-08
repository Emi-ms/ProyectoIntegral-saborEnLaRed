import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IngredientService } from '../../../../services/ingredient.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ingredient-create',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFormFieldModule,
    MatInput,
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
  ],
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
  
  }


  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.ingredientService.create(this.form.value).subscribe(res => {
      console.log('Ingrediente creado correctamente!' + res.ingredientName);
      this.router.navigateByUrl('ingredients-admin').then();
    })
  }
}
