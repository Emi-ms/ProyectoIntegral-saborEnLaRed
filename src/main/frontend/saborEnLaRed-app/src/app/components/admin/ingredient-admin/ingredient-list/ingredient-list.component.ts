import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ingredient } from '../../../../models/Ingredient';
import { IngredientService } from '../../../../services/ingredient.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  dataSource: MatTableDataSource<Ingredient> = new MatTableDataSource();

  constructor(
    private ingredientService: IngredientService,
  ) { }

  ngOnInit(): void {
    this.ingredientService.getAll().subscribe((data: Ingredient[]) => {
      this.ingredients = data;
      console.log(this.ingredients);
      this.dataSource = new MatTableDataSource(this.ingredients);
    });
  }

  deleteIngredient(id: any) {
    this.ingredientService.logicDelete(id).subscribe(res => {
      this.ingredients = this.ingredients.filter(ing => ing.idIngredient !== id);
      this.dataSource = new MatTableDataSource(this.ingredients);
      console.log('Ingrediente id =' + id + ' eliminado satisfactoriamente!');
    })
  }

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
