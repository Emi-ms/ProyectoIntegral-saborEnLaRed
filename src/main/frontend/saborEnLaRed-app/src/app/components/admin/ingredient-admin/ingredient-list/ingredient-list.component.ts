import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ingredient } from '../../../../models/Ingredient';
import { IngredientService } from '../../../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  
  constructor(
    private ingredientService: IngredientService,
  ) { }

  ngOnInit(): void {
    this.ingredientService.getAll().subscribe((data: Ingredient[]) => {
      this.ingredients = data;
      console.log(this.ingredients);
    });
  }

  deleteIngredient(id: any) {
    this.ingredientService.logicDelete(id).subscribe(res => {
      this.ingredients = this.ingredients.filter(ing => ing.idIngredient !== id);
      console.log('Ingrediente id =' + id + ' eliminado satisfactoriamente!');
    })
  }
}
