import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentService } from '../../../../services/comment.service';
import { Comment } from '../../../../models/Comment';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit  {

  comments: Comment[] = [];

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.commentService.getAll().subscribe((data: Comment[]) => {
      this.comments = data;
      console.log(this.comments);
    });
  }
  
  deleteComment(id: any) {
    this.commentService.logicDelete(id).subscribe(res => {
      this.comments = this.comments.filter(comment => comment.idComment !== id);
      console.log('Comentario id =' + id + ' eliminado satisfactoriamente!');
    })
  }
}
