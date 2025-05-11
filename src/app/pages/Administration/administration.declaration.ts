import { DashboardComponent } from "./dashboard/dashboard.component";
import { CashManagementComponent } from "./cash-management/cash-management.component";
import { ServiceManagementComponent } from "./service-management/service-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { CashDeclaration } from "./cash-management/cash.declaration";

export const AdministrationDeclaration = [
    DashboardComponent,
    ServiceManagementComponent,
    CashManagementComponent,
    UserManagementComponent,
    CashDeclaration
];
