import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoggedinGuard } from './loggedin.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule',
        canActivate: [LoginGuard]
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginPageModule',
        canActivate: [LoggedinGuard]
    },
    {
        path: 'signup',
        loadChildren: './signup/signup.module#SignupPageModule',
        canActivate: [LoggedinGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
