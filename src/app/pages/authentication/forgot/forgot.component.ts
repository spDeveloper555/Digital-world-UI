import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../../core/services/utility.service';
import { ApiService } from '../../../core/services/api.service';
@Component({
  selector: 'e-seva-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  public errorMessage: string = '';
  public resetForm: any = {
    email: ''
  };
  public errorObj: any = {
    email: ''
  };
  constructor(
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) { }
  fieldChange(field: any, type: any, e: any) {
    let value = e['target']['value']
    if (type == 'text') {
      value = value.trim();
      this.resetForm[field] = value;
      this.errorObj[field] = "";
    }
  }
  resetPassword() {
    const obj = this.resetForm;
    let formValidation = this.utility.formValidation(obj, ['email']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    this.errorMessage = '';
    // this.api.login(obj)?.then((res: any) => {
    //   if (res['status'] == 'success') {
    //     if (this.authService.login(res['token'])) {
    //       this.router.navigate(['/dashboard']);
    //     }
    //   } else {
    //     this.errorMessage = 'Invalid credentials.';
    //   }
    // }).catch((error: any) => {
    //   console.log(error)
    // });
  }
  signIn() {
    this.router.navigate(['/login']);
  }
}
