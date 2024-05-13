import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from './components/login/login.component';
import { AdminSectionComponent } from './components/admin/admin-section/admin-section.component';
import { UpdateUserComponent } from './components/user-components/update-user/update-user.component';
import { AdminGuard } from './services/auth/admin-user.guard';
import { PerfilUserComponent } from './components/user-components/perfil-user/perfil-user.component';
import { UserGuard } from './services/auth/normal-user.guard';
import { CategoryAdminComponent } from './components/admin/category-admin/category-admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-menu', component: AdminSectionComponent, canActivate: [AdminGuard] },
  { path: 'category-admin', component: CategoryAdminComponent, canActivate: [AdminGuard] },
  { path: 'update-user', component: UpdateUserComponent, canActivate: [UserGuard] },
  { path: 'perfil-user', component: PerfilUserComponent, canActivate: [UserGuard] }
];
