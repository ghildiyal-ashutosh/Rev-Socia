import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome'
import {UserServiceClient} from "../services/user.service.client";
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { WorkComponent } from './work/work.component';
import {WorkServiceClient} from "../services/work.service.client";
import { ReviewerProfileComponent } from './reviewer-profile/reviewer-profile.component';
import {ReviewerServiceClient} from "../services/reviewer.service.client";
import { SubmitReviewComponent } from './submit-review/submit-review.component';
import {ReviewServiceClient} from "../services/review.service.client";
import { MovieComponent } from './movie/movie.component';
import {MovieServiceClient} from "../services/movie.service.client";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    AdminComponent,
    WorkComponent,
    ReviewerProfileComponent,
    SubmitReviewComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    AngularFontAwesomeModule
  ],
  providers: [
    UserServiceClient,
    WorkServiceClient,
    ReviewerServiceClient,
    ReviewServiceClient,
      MovieServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
