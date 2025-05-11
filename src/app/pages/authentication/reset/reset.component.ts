import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'e-seva-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  public username = '';
  public password = '';
  public showPwdPreview:boolean = true;
  public pwdType: string = 'password';
  public showCfmPwdPreview:boolean = true;
  public cfmPwdType: string = 'password'
  constructor(public authService: AuthService, public router: Router) { }

  togglePreview() {
    this.showPwdPreview = !this.showPwdPreview;
    this.pwdType = this.showPwdPreview ? 'password' : 'text';
  }

  togglePreviewCP() {
    this.showCfmPwdPreview = !this.showCfmPwdPreview;
    this.cfmPwdType = this.showCfmPwdPreview ? 'password' : 'text';
  }

  signIn() {
    this.router.navigate(['/login']);
  }
}
