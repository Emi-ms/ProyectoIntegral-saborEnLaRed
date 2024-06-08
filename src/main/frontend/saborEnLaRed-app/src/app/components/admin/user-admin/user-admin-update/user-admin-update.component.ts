import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-admin-update',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFormFieldModule,
    MatInput,
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-admin-update.component.html',
  styleUrl: './user-admin-update.component.css'
})
export class UserAdminUpdateComponent implements OnInit {
  id: number = 0;
  user?: User;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    userSurname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d!@#$%^&*()-_=+{};:,<.>]{8,}$'), Validators.maxLength(255), Validators.minLength(8)]),
    rol: new FormControl('', Validators.required),
    active: new FormControl('')
  });


  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idUser'];
    this.userService.getUser(this.id).subscribe({
      next: (user: User) => {
        console.log(user);
        this.user = user;
        this.form.patchValue({
          userName: user.userName,
          userSurname: user.userSurname,
          email: user.email,
          active: user.active,
          rol: user.rol
        });
      }
    });
  }



  submit() {
    this.form.patchValue({ id: this.id });
    this.form.patchValue({ active: this.user?.active });


    this.userService.updateUser(this.form.value).subscribe({

      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Se han actualizado los datos correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/user-admin']);
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
