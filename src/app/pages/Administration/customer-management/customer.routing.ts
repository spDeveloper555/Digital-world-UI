import { Route } from "@angular/router";
import { authGuard } from "../../../core/services/auth.guard";
import { CustomerManagementAddComponent } from "./customer-management-add/customer-management-add.component";
import { CustomerManagementEditComponent } from "./customer-management-edit/customer-management-edit.component";

export const CustomerRouting: Route[] = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'add', component: CustomerManagementAddComponent, canActivate: [authGuard] },
    { path: 'edit/:cashDataID', component: CustomerManagementEditComponent, canActivate: [authGuard]}
]