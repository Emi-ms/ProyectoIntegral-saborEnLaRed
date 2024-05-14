import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/Category';
import { CategoryService } from '../../../../services/category.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  catergories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.catergories = data;
      console.log(this.catergories);
    });
  }

  deleteCategory(id: any){
    this.categoryService.delete(id).subscribe(res => {
      this.catergories = this.catergories.filter(cat => cat.idCategory !== id);
      console.log('Categoria id =' + id + ' eliminada satisfactoriamente!');
    })
  }
}
