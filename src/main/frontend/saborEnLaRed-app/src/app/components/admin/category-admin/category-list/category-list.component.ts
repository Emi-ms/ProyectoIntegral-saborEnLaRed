import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/Category';
import { CategoryService } from '../../../../services/category.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-category-list',
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
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  catergories: Category[] = [];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.catergories = data;
      console.log(this.catergories);
      this.dataSource = new MatTableDataSource(this.catergories);
    });
  }

  deleteCategory(id: any) {
    this.categoryService.logicDelete(id).subscribe(res => {
      this.catergories = this.catergories.filter(cat => cat.idCategory !== id);
      this.dataSource = new MatTableDataSource(this.catergories);
      console.log('Categoria id =' + id + ' eliminada satisfactoriamente!');
    })
  }

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
