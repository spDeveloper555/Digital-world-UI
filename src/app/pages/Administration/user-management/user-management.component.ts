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
    public deleteUserID: any = '';
  trashUserDetail(userDataID: any) {
    this.showConfirm = true;
    this.deleteUserID = userDataID;
  }
  editUserDetail(userDataID: any) {
    let path = 'administration/User-management/edit/' + userDataID;
    this.router.navigate([path]);
  }
  viewUserDetail(userDataID: any) {
    let path = 'administration/User-management/list/' + userDataID;
    this.router.navigate([path]);
  }
  showConfirm = false;

  handleConfirm(result: boolean) {
    this.showConfirm = false;
    if (result) {
      // this.api.UserDetailsDelete({ UserDataID: +this.deleteUserID })?.then((res: any) => {
      //   if (res['status'] == 'success') {
      //     this.isLoading = true;
      //     this.getUserList();
      //   }
      // }).catch((error: any) => {
      //   console.log(error)
      // });
    }
    this.deleteUserID = '';
  }
}
