import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { LoginService } from '../../services/login-user.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf

  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit{
  errorMessage:String = "";
  user?:User;
  userLoginOn:boolean = false;
  currentUser?:User;

  
  protected readonly RouterLink = RouterLink;

  constructor(
    private userService:UserService,
    private loginService:LoginService
  
  ) {

  //   this.userService.getUser(68).subscribe({
  //     next: (user) => {
  //       this.user = user;
  //       console.log(user);
  //     },
  //     error: (error) => {
  //       this.errorMessage = error;
  //       console.log(error);
  //     },
  //     complete: () => {
  //       console.log("Completed, no errors.");
  //     }
  //   })
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (loginOn) => {
        this.userLoginOn = loginOn;
      }
    })

    this.loginService.currentUser.subscribe({
      next:(currentUser)=>{
        console.log("Current User")
        console.log(currentUser)
        this.currentUser = currentUser;
      }
    })
  }

  logout() {
    Swal.fire("Hasta luego cocinilla!!", "Esperamos verte pronto ; )", "success");
    this.loginService.logout();
  }


}
