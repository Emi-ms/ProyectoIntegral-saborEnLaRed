import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-create',
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
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent implements OnInit{

  form: FormGroup =  new FormGroup({
    categoryName:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ])
  });

constructor(
    private categoryService: CategoryService,
    private router: Router,
) { }

  ngOnInit(): void {
   
  }


  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.categoryService.create(this.form.value).subscribe(res => {
      console.log('Categoria creada correctamente!' + res.categoryName);
      this.router.navigateByUrl('category-admin').then();
    })
  }
}
