import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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


  submit() {
    console.log(this.form.value);


    this.userService.registerUser(this.form.value).subscribe(res => {
      console.log('Usuario creada correctamente!' + res.userName);
      this.router.navigateByUrl('/').then();
    });

  }


  get f() {
    return this.form.controls;
  }
}
