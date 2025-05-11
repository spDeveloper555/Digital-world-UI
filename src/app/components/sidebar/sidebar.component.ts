import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'e-seva-sidenav',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public navItems: any = [
    {
      icon: "fa fa-tv",
      name: "Dashboard",
      url: "/administration/dashboard"
    }, {
      icon: "fa fa-tools",
      name: "Service management",
      url: "/administration/service-management"
    }, {
      icon: "fa fa-indian-rupee-sign",
      name: "Cash management",
      url: "/administration/cash-management"
    }, {
      icon: "fa fa-user",
      name: "User management",
      url: "/administration/user-management"
    }
  ];
  @Input() activePage: any = "Dashboard";
  public isSideNavOpened = false;
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getNavStatus();
  }

  getNavStatus() {
    this.appService.isSideNavOpened.subscribe((res) => {
      this.isSideNavOpened = res;
    });
  }

  toggleSideBar() {
    this.isSideNavOpened = !this.isSideNavOpened;
    this.appService.isSideNavOpened.next(this.isSideNavOpened);
  }
}
