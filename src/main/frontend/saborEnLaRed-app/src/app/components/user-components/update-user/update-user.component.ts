import { Component, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { LoginService } from "../../../services/login-user.service";

import Swal from 'sweetalert2';
import { User } from '../../../models/User';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFormFieldModule,
    MatInput,
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
  id: number = 0;
  rol: string = "";
  active: boolean = false;
  currentUser?: User;

  constructor(
    public userService: UserService,
    public loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginService.currentUser.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
        this.id = currentUser.id;
        this.rol = currentUser.rol;
        this.active = currentUser.active;
        this.form.patchValue({
          userName: currentUser.userName,
          userSurname: currentUser.userSurname,
          email: currentUser.email,
        });
      }
    })
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    userSurname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()-_=+{};:,<.>]{8,}$'), Validators.maxLength(255), Validators.minLength(8)]),
    rol: new FormControl(''),
    active: new FormControl('')
  });


  submit() {
    this.form.patchValue({ id: this.id });
    this.form.patchValue({ rol: this.rol });
    this.form.patchValue({ active: this.active });

    this.userService.updateUser(this.form.value).subscribe({

      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Se han actualizado los datos correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/perfil-user']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha fallado, vuelve a internarlo!',
        });
      }
    });
  };

  get f() {
    return this.form.controls;
  }

}
