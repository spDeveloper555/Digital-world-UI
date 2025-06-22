import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'e-seva-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() public isSideNavOpened = false;
  constructor(public authService: AuthService, public router: Router) { }
  @Input() menuList: any = [{
    name:"Add more services",
    path:"administration/service-management/manage",
  }];
  logout() {
    this.authService.logout();
  }
  navigation(path: string) {
    console.log('Navigating to:', path);
    this.router.navigate([path]);
  }
}
