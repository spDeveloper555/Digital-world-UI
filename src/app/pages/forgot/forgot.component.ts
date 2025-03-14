import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  public username = '';
  constructor(public authService: AuthService, public router: Router) { }

  signIn() {
    this.router.navigate(['/login']);
  }
}
