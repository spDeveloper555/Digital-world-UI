import { Component } from '@angular/core';

@Component({
  selector: 'e-seva-service-management',
  templateUrl: './service-management.component.html',
  styleUrl: './service-management.component.css'
})
export class ServiceManagementComponent {
  public servies: any = [];
  public isLoading: boolean = true;
}
