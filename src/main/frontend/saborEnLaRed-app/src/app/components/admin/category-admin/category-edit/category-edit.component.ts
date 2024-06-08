import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/Category';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgOptimizedImage,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {

  id: number = 0;
  category: Category = { idCategory: 0, categoryName: 'VOID', active: true };

  form: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
    active: new FormControl(true),
  
  });

  constructor(
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idCategory'];
    this.category.idCategory = this.id;
    

    this.categoryService.find(this.id).subscribe((data: Category) => {
      this.category = data;
      console.log(this.category);
   

      this.form.get('categoryName')?.setValue(this.category.categoryName);
    });

  }

  get f() {
    return this.form.controls;
  }

  submit() {
    const updateCategory: Category = {
      idCategory: this.category.idCategory,
      categoryName: this.form.value.categoryName,
      active: true
    };
    console.log(updateCategory);

    this.categoryService.update(this.id, updateCategory).subscribe(res => {
      console.log('Categoria actualizado satisfactoriamente!');
      this.router.navigateByUrl('category-admin').then();
    })
  }

}
