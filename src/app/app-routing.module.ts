import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/services/auth.guard';
import { LoginComponent } from './pages/authentication/sign-in/sign-in.component';
import { RegisterComponent } from './pages/authentication/sign-up/sign-up.component';
import { PagesDeclaration } from './pages/pages.declaration';
import { ComponentDeclaration } from './components/components.declaration'
import { ForgotComponent } from './pages/authentication/forgot/forgot.component';
import { ResetComponent } from './pages/authentication/reset/reset.component';
import { DirectivesDeclaration } from './directives/directives.declaration';
import { PipeDeclaration } from './Pipes/pipe.declaration'
import { AdministrationRouting } from './pages/Administration/administration.routing';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'reset-password/:token', component: ResetComponent },
  { path: 'administration', children: AdministrationRouting, canActivate: [authGuard]}
];

@NgModule({
  declarations: [
    PagesDeclaration,
    ComponentDeclaration,
    DirectivesDeclaration,
    PipeDeclaration
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
