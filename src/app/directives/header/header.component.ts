import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService, public router: Router) { }
  public profileName = "SP";
  public moduleName:string = "dashboard";
  @Input() menuList:any = [];
  logout() {
    this.authService.logout();
  }
  changeModule(module:string){
    this.moduleName = module;
  }
  navigation(path:string) {
    this.router.navigate([path]);
  }
}
