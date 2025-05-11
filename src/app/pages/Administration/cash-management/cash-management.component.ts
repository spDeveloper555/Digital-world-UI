import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-seva-cash-management',
  templateUrl: './cash-management.component.html',
  styleUrl: './cash-management.component.css'
})
export class CashManagementComponent {
  public cashServies: any = [];
  public isLoading: boolean = true;
  constructor(public router: Router) { }
  navigation(path: string) {
    this.router.navigate([path]);
  }
}
