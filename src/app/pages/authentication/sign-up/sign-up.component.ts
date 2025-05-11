import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { UtilityService } from '../../../core/services/utility.service';
@Component({
  selector: 'e-seva-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class RegisterComponent {
  public showPwdPreview: boolean = true;
  public pwdType: string = 'password'
  public errorMessage: string = '';
  public errorObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  public registerForm: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
      this.registerForm[field] = value;
      this.errorObj[field] = "";
    }
  }
  onSubmit() {
    const obj = this.registerForm;
    let formValidation = this.utility.formValidation(obj, ['firstName', 'lastName', 'email', 'password']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    this.errorMessage = '';
    console.log(obj)
    this.api.register(obj)?.then((res: any) => {
      console.log(res)
      if (res['status'] == 'success') {
        this.router.navigate(['login']);
      } else {
        this.errorMessage = 'Invalid credentials.';
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }

  togglePreview() {
    this.showPwdPreview = !this.showPwdPreview;
    this.pwdType = this.showPwdPreview ? 'password' : 'text';
  }
  signIn() {
    this.router.navigate(['/login']);
  }
}
