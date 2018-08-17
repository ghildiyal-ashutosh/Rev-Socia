import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {Register} from "ts-node";
import {RegisterComponent} from "./register/register.component";

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home' , component:  HomePageComponent},
  {path: '', redirectTo: 'home', pathMatch : 'full'},
  {path: 'registerUser', component: RegisterComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
