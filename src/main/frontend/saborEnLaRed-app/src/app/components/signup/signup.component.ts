import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { nextTick } from 'process';

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
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {



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


  // submit() {
  //   console.log(this.form.value);
  //   this.userService.registerUser(this.form.value).pipe(
  //     catchError((error) => {
  //       Swal.fire("Lo siento!", "El email ya se encuentra registrado", "error")
  //       return throwError(error);
  //     })
  //   ).subscribe(res => {
  //     console.log('Usuario creado correctamente!' + res.userName);
  //     Swal.fire("Enhorabuena!!","Usuario registrado con éxito!!", "success")
  //     this.router.navigateByUrl('/')
  //     .then();
  //   });
  // }

 submit() {
    console.log(this.form.value);
    this.userService.registerUser(this.form.value).subscribe({
      next: (res: any) => {
        console.log("en el next")
        console.log("res.body")
        if (res.status === 200) {
          console.log('Usuario creado correctamente!' + res.body);
          Swal.fire("Enhorabuena!!","Usuario registrado con éxito!!", "success")
          this.router.navigateByUrl('/')
          .then();
        } else {
          console.log("otro tipo de error")
          console.log(res.status)
          Swal.fire("Error!", "Se produjo un error al procesar su solicitud", "error")
        }
      },
      error: (error: any) => {
        if (error.status === 409) {
          
          console.log("error 409")
          console.log(error.status)
          Swal.fire("Lo siento!", "El email ya se encuentra registrado", "error")
        } else {
          console.log(error.body)
          console.log("otro tipo de error")
          console.log(error.status)
          Swal.fire("Error!", "Se produjo un error al procesar su solicitud", "error")
        }
      }
    });
      
  }

  get f() {
    return this.form.controls;
  }
}
