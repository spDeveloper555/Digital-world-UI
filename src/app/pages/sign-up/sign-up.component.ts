import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class RegisterComponent {
  public username = '';
  public password = '';
  public showPwdPreview:boolean = true;
  public pwdType: string = 'password'
  constructor(public authService: AuthService, public router: Router) { }

  togglePreview() {
    this.showPwdPreview = !this.showPwdPreview;
    this.pwdType = this.showPwdPreview ? 'password' : 'text';
  }
  signIn() {
    this.router.navigate(['/login']);
  }
}
