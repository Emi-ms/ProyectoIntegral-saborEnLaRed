import { Component } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

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
export class LoginComponent {

  constructor(
    public userService: UserService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({

    email: new FormControl('', [Validators.required, ]),
    password: new FormControl('', [Validators.required, ]),

  });

  get f() {
    return this.form.controls;
  }

  submit() {
   this.userService.generateToken(this.form.value).subscribe({ 
      next: (res: any) => {
        console.log(res);
        Swal.fire("Bienvenido!!", "Nos alegra volver a verte cocinilla!!", "success")
        this.router.navigateByUrl('/')
          .then();
      },
      error: (error: any) => {
        console.log(error)
        if (error.status === 400) {
          Swal.fire("Lo siento!", "El email no se encuentra registrado", "error")
        }
      }
    });
  }

}
