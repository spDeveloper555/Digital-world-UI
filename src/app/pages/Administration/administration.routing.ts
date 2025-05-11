import { Route } from "@angular/router";
import { authGuard } from "../../core/services/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServiceManagementComponent } from "./service-management/service-management.component";
import { CashManagementComponent } from "./cash-management/cash-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { CashRouting } from "./cash-management/cash.routing";

export const AdministrationRouting: Route[] = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'service-management', component: ServiceManagementComponent, canActivate: [authGuard] },
    { path: 'cash-management', component: CashManagementComponent, canActivate: [authGuard] },
    { path: 'user-management', component: UserManagementComponent, canActivate: [authGuard] },
    { path: 'cash-management', children: CashRouting, canActivate: [authGuard] }
]