import { Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api.service';
import { UtilityService } from '../../../../../core/services/utility.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

declare let Tagify: any;

@Component({
  selector: 'e-seva-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServiceComponent implements AfterViewInit {
  public isLoading: boolean = true;
  servicesRows: any[] = [{ service: '', amount: '', subservices: [] }];

  @ViewChildren('tagifyInput') tagifyInputs!: QueryList<ElementRef>;

  constructor(
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getServices();
  }

  async getServices() {
    this.isLoading = true;
    let res: any = await this.api.getManageService({ isList: true })?.catch((error: any) => {
      console.log(error);
    });

    if (res?.status === 'success') {
      this.servicesRows = res?.services?.map((item: any) => ({
        service: item.service ?? '',
        amount: item.amount ?? '',
        subservices: item.subservices ?? []
      })) ?? [{ service: '', amount: '', subservices: [] }];
    }

    this.isLoading = false;

    setTimeout(() => this.initializeTagify(), 0);
  }

  ngAfterViewInit() {
    this.initializeTagify();
  }

  initializeTagify() {
    this.tagifyInputs?.forEach((inputRef, index) => {
      const input = inputRef.nativeElement;
      if (!input._tagify) {
        const tagifyInstance = new Tagify(input, {
          whitelist: [], // you can add predefined tags here
          enforceWhitelist: false,
          dropdown: {
            enabled: 0
          }
        });

        // Set default values if present
        if (this.servicesRows[index].subservices?.length) {
          tagifyInstance.addTags(this.servicesRows[index].subservices);
        }

        // On tag change, update the model
        tagifyInstance.on('change', () => {
          const tags = tagifyInstance.value.map((tag: any) => tag.value);
          this.servicesRows[index].subservices = tags;
        });

        input._tagify = tagifyInstance;
      }
    });
  }

  addRow(index: number) {
    this.servicesRows.splice(index + 1, 0, {
      service: '',
      amount: '',
      subservices: []
    });
    setTimeout(() => this.initializeTagify(), 0);
  }

  removeRow(index: number) {
    this.servicesRows.splice(index, 1);
  }

  async onSubmit() {
    const payload = {
      services: this.servicesRows
    };

    let res: any = await this.api.updateManageService(payload)?.catch((error: any) => {
      console.log(error);
    });

    if (res?.status === 'success') {
      this.getServices();
    }
  }
}
