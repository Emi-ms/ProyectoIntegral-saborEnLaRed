import { Component, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFormFieldModule,
    MatInput,
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule, 
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  constructor(
    public userService: UserService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    userSurname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()-_=+{};:,<.>]{8,}$'), Validators.maxLength(255), Validators.minLength(8)]),

  });


  submit() {
    console.log(this.form.value);
    this.userService.registerUser(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Usuario creado correctamente!');
        Swal.fire("Enhorabuena!!", "Usuario registrado con éxito!!", "success")
        this.router.navigateByUrl('/')
          .then();
      },
      error: (error: any) => {
        console.log("en el error del registro", error)
        if (error.status == 400) {
          Swal.fire("Lo siento!", "El email ya se encuentra registrado", "error")
        } else {
          console.log("otro tipo de error de servidor")
          Swal.fire("Error!", "Se produjo un error al procesar su solicitud", "error")
        }
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}
