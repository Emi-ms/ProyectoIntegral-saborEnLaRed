import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  deleteUser(id: any) {
    this.userService.logicDelete(id).subscribe(res => {
      this.users = this.users.filter(user => user.id !== id);
      this.dataSource = new MatTableDataSource(this.users);
      console.log('Usuario id =' + id + ' eliminado satisfactoriamente!');
    })
  }

  displayedColumns: string[] = ['id', 'userName', 'userSurname', 'email', 'rol', 'delete'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
