import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {UserServiceClient} from "../services/user.service.client";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    AngularFontAwesomeModule
  ],
  providers: [
    UserServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
