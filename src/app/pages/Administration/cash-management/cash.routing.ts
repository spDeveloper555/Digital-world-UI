import { Route } from "@angular/router";
import { authGuard } from "../../../core/services/auth.guard";
import { CashDetailsAddComponent } from "./cash-details-add/cash-details-add.component"
import { CashDetailsListComponent } from "./cash-details-list/cash-details-list.component"
export const CashRouting: Route[] = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'add', component: CashDetailsAddComponent, canActivate: [authGuard] },
    { path: 'list', component: CashDetailsListComponent, canActivate: [authGuard] },
]