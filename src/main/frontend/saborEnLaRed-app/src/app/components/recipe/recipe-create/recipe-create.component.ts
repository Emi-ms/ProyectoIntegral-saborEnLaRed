import { NgForOf, NgIf, NgOptimizedImage, AsyncPipe } from '@angular/common';
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

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    FormsModule,
    MatButtonModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  user: User | null | undefined;
  ingredientsFromAPI: Ingredient[] = [];
  categoriesFromAPI: Category[] = [];
  selectedCategoryControl = new FormControl(null);
  filteredIngredients: Observable<Ingredient[]> = new Observable<Ingredient[]>();
  ingredientControl = new FormControl();
  recipeForm: FormGroup;
  photoFile: File | null = null;

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
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      photo: null,
      active: [true],
      recipeIngredients: this.fb.array([]),
      categories: this.fb.array([]),
      user: {
        id: this.userService.getUserFromSessionStorage().id
      },
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      unitMeasure: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    Swal.fire({
      title: '¡Ten en cuenta las siguientes consideraciones!',
      html:  '<div style="text-align: start;"><li><strong>Foto Atractiva:</strong> Usa buena iluminación y un fondo limpio.</li>' 
              + '<li><strong>Paso a Paso Detallado:</strong> Describe cada paso claramente.</li>'
              + '<li><strong>Lista de Ingredientes:</strong> Incluye cantidades exactas.</li>'
              + '<li><strong>Tiempo Total:</strong> Indica el tiempo de preparación y cocción.</li>'
              + '<li><strong>Revisar Ortografía y Gramática:</strong> Corrige errores antes de publicar.</li></div>',
      icon: 'info',
      confirmButtonText: '¡Vamos a cocinar!'
    });
    this.ingredientService.getAll().subscribe((data: Ingredient[]) => {
      this.ingredientsFromAPI = data;
      this.filteredIngredients = this.ingredientControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
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

      const duplicatedIngredient = this.recipeIngredientsFromForm.value.find((ingredientFromForm: any) => ingredientFromForm.ingredient.idIngredient === ingredient.idIngredient);
      if (duplicatedIngredient) {
        Swal.fire('Lo siento', 'Este ingrediente ya está incluído', 'error');

      } else {

        this.recipeIngredientsFromForm.push(this.fb.group({
          ingredient: [ingredient, Validators.required],
          quantity: [quantityNumber, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
          unitMeasure: [unitMeasure, Validators.required]
        }));

        console.log(this.recipeIngredientsFromForm.value);
        this.ingredientControl.reset();
      }
    } else {
      Swal.fire('Lo siento!!', 'Tienes que rellenar todos los campos del ingrediente', 'error');
    }
  }

  get categoriesFromForm() {
    return this.recipeForm.get('categories') as FormArray;
  }

  addCategory(category: Category) {
    if (category) {

      const duplicatedCategory = this.categoriesFromForm.value.find((categoryFromForm: any) => categoryFromForm.idCategory === category.idCategory);

      if (duplicatedCategory) {
        Swal.fire('Lo siento', 'Esta categoría ya está incluída', 'error');

      } else {
        this.categoriesFromForm.push(this.fb.group({
          idCategory: [category.idCategory, Validators.required],
          categoryName: [category.categoryName, Validators.required],
          active: true

        }));
        console.log(this.categoriesFromForm.value);
      }
    } else {
      Swal.fire('Error', 'Por favor, selecciona una categoría', 'error');
    }
  }

  createRecipe() {
    if (this.recipeForm.valid) {
      console.log(this.photoFile);
      console.log(this.recipeForm.value);
      if (this.photoFile) {
        this.recipeService.save(this.recipeForm.value, this.photoFile).subscribe(() => {
          Swal.fire('Receta creada', 'Gracias por tu aportación cocinilla!!', 'success');
          this.router.navigate(['/recipes']);
        });
      } else {
        Swal.fire('Lo siento!!', 'Tienes que seleccionar una foto', 'error');
      }
    } else {
      Swal.fire('Lo siento!!', 'Tienes que rellenar todos los campos', 'error');
    }
  }

  get f() {
    return this.recipeForm.controls;
  }

  displayFn(ingredient: Ingredient): string {
    return ingredient && ingredient.ingredientName ? ingredient.ingredientName : '';
  }

  private _filter(value: string): Ingredient[] {
    return this.ingredientsFromAPI.filter(ingredient => ingredient.ingredientName.toLowerCase().includes(value));
  }

  removeIngredient(index: number) {
    this.recipeIngredientsFromForm.removeAt(index);
    console.log(this.recipeIngredientsFromForm.value);
  }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.photoFile = file;
    }
  }
}
