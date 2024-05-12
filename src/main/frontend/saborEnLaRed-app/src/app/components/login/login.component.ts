import { Component, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login-user.service';
import { LoginRequest } from '../../models/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginError: String = "";

  constructor(
    public userService: UserService,
    public router: Router,
    public loginService: LoginService
  ) {
  }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({

    email: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),

  });

  get f() {
    return this.form.controls;
  }

  login() {
    console.log(this.form.value);
    this.loginService.login(this.form.value as LoginRequest).subscribe({
      next: (userData) => {
        console.log(userData);
      },
      error: (errorData) => {
        console.log(errorData);
        Swal.fire("Datos incorrectos", "Vuelva a intentarlo", "error")
        this.loginError = errorData;
      },
      complete: () => {
        console.info("Login completo");
        Swal.fire("Bienvenido!!", "Nos alegra volver a verte cocinilla!!", "success")
        this.router.navigateByUrl('/').then();
      }

    });










    //  this.authUserService.generateToken(this.form.value).subscribe({ 
    //     next: (res: any) => {
    //       console.log(res);
    //       this.authUserService.loginUser(res.token);


    //       this.authUserService.getCurrentUser().subscribe({
    //         next: (user: any) => {
    //           console.log(user);
    //           this.authUserService.setUser(user);

    //           if(user.rol ==='ADMIN'){
    //             this.router.navigateByUrl('/admin')
    //               .then();
    //           }

    //         },
    //         error: (error: any) => {
    //           console.log(error);
    //           Swal.fire("Datos incorrectos", "Vuelva a intentarlo", "error")
    //         }
    //       });
    //       Swal.fire("Bienvenido!!", "Nos alegra volver a verte cocinilla!!", "success")
    //       this.router.navigateByUrl('/')
    //         .then();

    //     },
    //     error: (error: any) => {
    //       console.log(error)
    //       if (error.status === 400) {
    //         Swal.fire("Lo siento!", "El email no se encuentra registrado", "error")
    //       }
    //     }
    //   });
  }

}
