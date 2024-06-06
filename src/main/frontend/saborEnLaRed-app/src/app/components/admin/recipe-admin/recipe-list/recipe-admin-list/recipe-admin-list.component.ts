import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../../../../models/Recipe';
import { RecipeService } from '../../../../../services/recipe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-recipe-admin-list',
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
  templateUrl: './recipe-admin-list.component.html',
  styleUrl: './recipe-admin-list.component.css'
})
export class RecipeAdminListComponent implements OnInit {
  recipes: Recipe[] = [];
  dataSource: MatTableDataSource<Recipe> = new MatTableDataSource();

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log(this.recipes);
      this.dataSource = new MatTableDataSource(this.recipes);
    });
  }

  deleteRecipe(id: any) {
    this.recipeService.logicDelete(id).subscribe(res => {
      this.recipes = this.recipes.filter(cat => cat.idRecipe !== id);
      console.log('Receta id =' + id + ' eliminada satisfactoriamente!');
      this.dataSource = new MatTableDataSource(this.recipes);
    })
  }

  displayedColumns: string[] = ['id', 'recipeName', 'delete'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
