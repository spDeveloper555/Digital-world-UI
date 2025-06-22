import { Route } from "@angular/router";
import { authGuard } from "../../../../core/services/auth.guard";
import { ManageServiceComponent } from "./manage-services/manage-services.component";

export const ServiceRouting: Route[] = [
    { path: 'manage', component: ManageServiceComponent, canActivate: [authGuard] },
]