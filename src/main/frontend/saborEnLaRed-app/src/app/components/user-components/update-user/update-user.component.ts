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
  id:number = 0;

  constructor(public userService: UserService,
    public loginService: LoginService,
    public router: Router) { }

  ngOnInit(): void {
    this.loginService.currentUser.subscribe({
      next:(currentUser)=>{
        
        this.id = currentUser.idUser;
        console.log(this.id);
      }
    })

  }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    userSurname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()-_=+{};:,<.>]{8,}$'), Validators.maxLength(255), Validators.minLength(8)]),

  });


  submit() {
    this.form.patchValue({id: this.id});
   
    console.log(this.form.value);
    
    this.userService.updateUser(this.form.value).subscribe({

      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'User updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });

  };

  get f() {
    return this.form.controls;
  }

}
