import { AdministrationDeclaration } from "./Administration/administration.declaration";
import { RegisterComponent } from "./authentication/sign-up/sign-up.component";
import { ForgotComponent } from "./authentication/forgot/forgot.component";
import { ResetComponent } from "./authentication/reset/reset.component";
import { LoginComponent } from "./authentication/sign-in/sign-in.component"

export const PagesDeclaration = [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    AdministrationDeclaration,
];
