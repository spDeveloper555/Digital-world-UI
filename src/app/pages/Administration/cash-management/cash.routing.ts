import { Route } from "@angular/router";
import { authGuard } from "../../../core/services/auth.guard";
import { CashDetailsAddComponent } from "./cash-details-add/cash-details-add.component"
import { CashDetailsListComponent } from "./cash-details-list/cash-details-list.component"
import { CashDetailsEditComponent } from "./cash-details-edit/cash-details-edit.component";
export const CashRouting: Route[] = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'add', component: CashDetailsAddComponent, canActivate: [authGuard] },
    { path: 'edit/:cashDataID', component: CashDetailsEditComponent, canActivate: [authGuard]},
    { path: 'list/:cashDataID', component: CashDetailsListComponent, canActivate: [authGuard] },
]