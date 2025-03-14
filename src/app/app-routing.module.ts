import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/home/dashboard.component'
import { PagesDeclaration } from './pages/pages.declaration';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetComponent } from './pages/reset/reset.component';
import { DirectivesDeclaration } from './directives/directives.declaration';
import { QrGeneratorComponent } from './pages/qr-generator/qr-generator.component';
const routes: Routes = [
  // { path: '**', redirectTo:'login'},
  { path: '', redirectTo:'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'reset-password/:token', component: ResetComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'qr-generator', component: QrGeneratorComponent}
];

@NgModule({
  declarations:[
    PagesDeclaration, 
    DirectivesDeclaration
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
