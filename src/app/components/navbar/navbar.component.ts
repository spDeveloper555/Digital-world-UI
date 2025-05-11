import { Component, Input } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'e-seva-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() public isSideNavOpened = false;
  constructor(public authService: AuthService) { }
  isCollapsed = true;
  activePage: any = {
    "icon": "fa fa-tools",
    "name": "Service management",
    "url": "service-management"
  };
  public profileName = "SP";
  public moduleName: string = "dashboard";
  @Input() menuList: any = [{
    name:"Administration",
    url:"/admin"
  }];
  logout() {
    this.authService.logout();
  }
  changeModule(module: string) {
    this.moduleName = module;
  }
  navigation(path: string) {
  }
}
