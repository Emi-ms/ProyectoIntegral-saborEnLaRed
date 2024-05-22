import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/User';
import { Ingredient } from '../../../models/Ingredient';
import { Category } from '../../../models/Category';
import { RecipeService } from '../../../services/recipe.service';
import { UserService } from '../../../services/user.service';
import { IngredientService } from '../../../services/ingredient.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    FormsModule
  ],
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  user: User | null | undefined;
  ingredientsFromAPI: Ingredient[] = [];
  categoriesFromAPI: Category[] = [];
  selectedIngredientControl = new FormControl(null);
  selectedCategoryControl = new FormControl(null);

  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private userService: UserService,
    private ingredientService: IngredientService,
    private categoryService: CategoryService,
    public router: Router
  ) {
    this.recipeForm = this.fb.group({
      recipeName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]],
      description: ['',[Validators.required, Validators.maxLength(255)]],
      photo: ['', [Validators.required, Validators.maxLength(255)]],
      active: [true],
      recipeIngredients: this.fb.array([]),
      categories: this.fb.array([]),
      user: [this.userService.getUserFromSessionStorage()]
       });
  }

  ngOnInit(): void {
    this.ingredientService.getAll().subscribe((data: Ingredient[]) => {
      this.ingredientsFromAPI = data;
    });

    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categoriesFromAPI = data;
    });
    this.user = this.userService.getUserFromSessionStorage();
  }

  get recipeIngredientsFromForm() {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  addIngredient(ingredient: Ingredient, quantity: string, unitMeasure: string) {
    const quantityNumber = Number(quantity);

    if (ingredient && quantityNumber && unitMeasure) {
      this.recipeIngredientsFromForm.push(this.fb.group({
        ingredient: [ingredient, Validators.required],
        quantity: [quantityNumber, Validators.required],
        unitMeasure: [unitMeasure, Validators.required]

      
      }));

      console.log(this.recipeIngredientsFromForm.value);
    } else {
      Swal.fire('Error', 'Please fill in all ingredient fields', 'error');
    }
  }

  get categoriesFromForm() {
    return this.recipeForm.get('categories') as FormArray;
  }

  addCategory(category: Category) {
    if (category) {
      this.categoriesFromForm.push(this.fb.group({
        idCategory: [category.idCategory, Validators.required],
        categoryName: [category.categoryName, Validators.required],
        active: true
      
      
      }));
      console.log(this.categoriesFromForm.value);
    } else {
      Swal.fire('Error', 'Please select a category', 'error');
    }
  }

  createRecipe() {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
      this.recipeService.save(this.recipeForm.value).subscribe(() => {
        this.router.navigate(['/recipes']);
      });
    } else {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
    }
  }

  get f() {
    return this.recipeForm.controls;
  }
}