import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LogoutComponent } from "./logout/logout.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
