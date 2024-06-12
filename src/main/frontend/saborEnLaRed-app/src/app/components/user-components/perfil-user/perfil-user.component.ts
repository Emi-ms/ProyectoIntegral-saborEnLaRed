import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.css'
})
export class PerfilUserComponent implements OnInit {
  currentUser?: User;

  constructor(
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserFromSessionStorage();

  }


}
