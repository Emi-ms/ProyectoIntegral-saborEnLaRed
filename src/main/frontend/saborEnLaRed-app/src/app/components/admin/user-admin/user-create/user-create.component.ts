import { NgOptimizedImage, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
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
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {

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
    rol: new FormControl('', [Validators.required])

  });

  submit() {
    console.log(this.form.value);
    this.userService.createUserByAdmin(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Usuario creado correctamente!');
        Swal.fire("Enhorabuena!!", "Usuario registrado con éxito!!", "success")
        this.router.navigateByUrl('/')
          .then();
      },
      error: (errorMsg) => {
        console.log("en el error del registro",errorMsg)
        if (errorMsg.status == 502) {
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
