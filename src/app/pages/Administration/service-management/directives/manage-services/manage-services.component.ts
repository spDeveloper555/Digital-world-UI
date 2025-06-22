import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api.service';
import { UtilityService } from '../../../../../core/services/utility.service';
@Component({
  selector: 'e-seva-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrl: './manage-services.component.css'
})
export class ManageServiceComponent {
  public isLoading: boolean = true;
  constructor(
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) { }
  public servicesRows: any = [{ service: '', amount: '' }];
  public subServicesRows: any = [{ subService: '' }];
  ngOnInit() {
    this.getServices();
  }
  async getServices() {
    this.isLoading = true;
    let res: any = await this.api.getManageService({ 'isList': true })?.catch((error: any) => { console.log(error) });
    if (res['status'] == 'success') {
      this.servicesRows = res?.['services'] ?? [{ service: '', amount: '' }];
      this.subServicesRows = res?.['subServices'] ?? [{ subService: '' }];
      this.isLoading = false;
    }
  }
  addRow(index: number) {
    this.servicesRows.splice(index + 1, 0, { service: '', amount: '' });
  }

  removeRow(index: number) {
    if (this.servicesRows.length > 1) {
      this.servicesRows.splice(index, 1);
    }
  }
  addSubRow(index: number) {
    this.subServicesRows.splice(index + 1, 0, { subService: '' });
  }

  removeSubRow(index: number) {
    if (this.subServicesRows.length > 1) {
      this.subServicesRows.splice(index, 1);
    }
  }
  async onSubmit() {
    let obj: any = {
      services: this.servicesRows,
      subServices: this.subServicesRows
    };
    let res: any = await this.api.updateManageService(obj)?.catch((error: any) => { console.log(error) });
    if (res['status'] == 'success') {
      this.getServices();
    }
  }

}
