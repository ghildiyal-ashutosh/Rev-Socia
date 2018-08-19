import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../../services/user.service.client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username ='';
  password = '';


  constructor(private router: Router,
    private userService: UserServiceClient) { }



login(username, password)
{

  console.log(username, password);
  if ((username !== '' && username !== null) &&(password !== null && password !== '')) {
    const credentials = {username:username, password: password};

    this.userService.login(credentials)
      .then(((response) => {
        if (response.username === '-1') {
          alert("wrong initials...Try Again");
          }
        else {
          this.router.navigate(['profile']);
        }

        }));
  }
  else {
    alert("Initials cant be empty....Try Again");
  }

}



ngOnInit() {
  }

}
