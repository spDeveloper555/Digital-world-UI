import { DashboardComponent } from "./dashboard/dashboard.component";
import { CashManagementComponent } from "./cash-management/cash-management.component";
import { ServiceManagementComponent } from "./service-management/service-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { CashDeclaration } from "./cash-management/cash.declaration";
import { CustomerManagementComponent } from "./customer-management/customer-management.component";
import { CustomerDeclaration } from "./customer-management/customer.declaration"
import { ServiceDeclaration } from "./service-management/directives/service.declaration";
export const AdministrationDeclaration = [
    DashboardComponent,
    ServiceManagementComponent,
    CashManagementComponent,
    UserManagementComponent,
    CustomerManagementComponent,
    CashDeclaration,
    CustomerDeclaration,
    ServiceDeclaration
];
