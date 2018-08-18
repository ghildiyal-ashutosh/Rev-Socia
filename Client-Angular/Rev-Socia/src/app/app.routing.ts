import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {Register} from "ts-node";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home' , component:  HomePageComponent},
  {path: '', redirectTo: 'home', pathMatch : 'full'},
  {path: 'registerUser', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
