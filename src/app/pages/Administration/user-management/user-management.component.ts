import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'e-seva-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  public users: any = [];
  public isLoading: boolean = true;
  constructor(
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.getUserList();
  }
  getUserList() {
    let obj: any = {

    };
    this.api.userList(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        this.users = res['data'];
      }
      this.isLoading = false;
    }).catch((error: any) => {
      console.log(error)
    });
  }
}
