import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  users: User[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    });
  }

  deleteUser(id: any) {
    this.userService.logicDelete(id).subscribe(res => {
      this.users = this.users.filter(user => user.id !== id);
      console.log('Usuario id =' + id + ' eliminado satisfactoriamente!');
    })
  }
}
