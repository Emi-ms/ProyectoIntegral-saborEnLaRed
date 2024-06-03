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

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginError: String = "";
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  constructor(
    public userService: UserService,
    public router: Router,
    public loginService: LoginService
  ) {
  }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
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
        Swal.fire("Bienvenido!!", "Nos alegra volver a verte cocinilla!!", "success");
        this.router.navigateByUrl('/')
          .then();
      },
      error: (errorMsg) => {
        if (errorMsg.status == 501) {
          Swal.fire({
            title: 'Acceso denegado',
            text: 'No tienes permiso para acceder.',
            icon: 'error',
            timer: 15000
          });
        } else {
          Swal.fire("Datos incorrectos", "Vuelva a intentarlo", "error");
        }
      }
    });
  }
}