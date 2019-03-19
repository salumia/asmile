import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//This is my case
const routes: Routes = [
  {
    path: '',
    redirectTo: 'vendor-login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
