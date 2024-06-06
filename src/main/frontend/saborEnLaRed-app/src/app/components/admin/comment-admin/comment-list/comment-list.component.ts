import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentService } from '../../../../services/comment.service';
import { Comment } from '../../../../models/Comment';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-comment-list',
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
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit  {

  comments: Comment[] = [];
  dataSource: MatTableDataSource<Comment> = new MatTableDataSource();

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.commentService.getAll().subscribe((data: Comment[]) => {
      this.comments = data;
      console.log(this.comments);
      this.dataSource = new MatTableDataSource(this.comments);
    });
  }
  
  deleteComment(id: any) {
    this.commentService.logicDelete(id).subscribe(res => {
      this.comments = this.comments.filter(comment => comment.idComment !== id);
      console.log('Comentario id =' + id + ' eliminado satisfactoriamente!');
      this.dataSource = new MatTableDataSource(this.comments);
    })
  }

  displayedColumns: string[] = ['id', 'comment', 'user', 'delete'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
