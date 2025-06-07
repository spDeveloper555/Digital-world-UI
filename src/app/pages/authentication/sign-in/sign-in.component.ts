import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { UtilityService } from '../../../core/services/utility.service';
@Component({
  selector: 'e-seva-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class LoginComponent {
  public showPwdPreview: boolean = true;
  public pwdType: string = 'password'
  public errorMessage: string = '';
  public errorObj: any = {
    email: '',
    password: ''
  }
  public loginForm: any = {
    email: '',
    password: ''
  }
  constructor(
    public authService: AuthService,
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) { }
  fieldChange(field: any, type: any, e: any) {
    let value = e['target']['value']
    if (type == 'text') {
      value = value.trim();
      this.loginForm[field] = value;
      this.errorObj[field] = "";
    }
  }
  onSubmit() {
    const obj = this.loginForm;
    let formValidation = this.utility.formValidation(obj, ['email', 'password']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    this.errorMessage = '';
    this.api.login(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        if (this.authService.login(res['token'])) {
          this.getProfileView();
          this.router.navigate(['administration/cash-management']);
        }
      }else {
        this.errorMessage = 'Invalid credentials.';
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
  getProfileView() {
    this.api.profileView({})?.then((res: any) => {
      if (res['status'] == 'success') {
        localStorage.setItem('userDetails', JSON.stringify(res['data']));
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
  togglePreview() {
    this.showPwdPreview = !this.showPwdPreview;
    this.pwdType = this.showPwdPreview ? 'password' : 'text';
  }
  forgetPassword() {
    this.router.navigate(['/forgot-password']);
  }

  signUp() {
    this.router.navigate(['/register']);
  }
}
