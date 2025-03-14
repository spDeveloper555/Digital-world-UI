import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public authService: AuthService) { }
  public menuList: any = [
    { name: "Notifications", path: "notifications" },
    { name: "Profile", path: "profile"},
    { name: "QR genetator", path: "qr-generator"}
  ]
  logout() {
    this.authService.logout();
  }
}
