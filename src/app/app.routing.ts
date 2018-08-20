import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {Register} from "ts-node";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {WorkComponent} from "./work/work.component";
import {ReviewerProfileComponent} from "./reviewer-profile/reviewer-profile.component";
import {SubmitReviewComponent} from "./submit-review/submit-review.component";
import {MovieComponent} from "./movie/movie.component";

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
    {path: '', component: HomePageComponent},
  {path: 'home' , component:  HomePageComponent},
  {path: 'registerUser', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component : AdminComponent},
  {path: 'work/:userId', component: WorkComponent},
  {path: 'reviewer/:userId', component: ReviewerProfileComponent},
  {path: 'submitReview/work/:workId/reviewer/:reviewerId', component : SubmitReviewComponent},
    {path: 'movie', component : MovieComponent},
  {path: '', redirectTo: 'home', pathMatch : 'full'}
];

export const routing = RouterModule.forRoot(appRoutes);
