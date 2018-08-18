import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../../services/user.service.client";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';
  password2 = '';
  contact = '';

    field1  = '';
    field2 = '';
    field3 ='';
    field4 = '';


  constructor( private userService: UserServiceClient,
                private router: Router) { }



  registerUser()
  {

    var password = this.password;
    var password2 = this.password2;
    var username = this.username;

    console.log(username,password);

    var message = '';

    if ((password!== '' && password!== null) && (username !== '' && username !== null)
      && (password === password2)) {

      this.userService
        .findByUsername(username)
        .then((response) => {
          if (response.username === '-1') {


            var field1 = this.field1;
            var field2 = this.field2;
            var field3 = this.field3;
            var field4 = this.field4;
            const interest = {field1: field1, field2: field2, field3: field3, field4: field4};
            var firstName = this.firstName;
            var lastName = this.lastName;
            var email = this.email;
            var contact = this.contact;
            var role  = 'User';


            const user = {
              firstName: firstName,
              lastName: lastName,
              username: username,
              password: password,
              email: email,
              contact: contact,
              interest: interest,
              role: role
            };

            this.userService.registerUser(user)
              .then((user) => {
                alert('user added successfully');
                this.router.navigate(['profile']);

              });
          }
          else {
            alert("Username exist....Try some other name");
          }
        });
    }


    else if (password === '')
    message = 'Password cant be empty';

  else if(password !== password2)
    message = 'password mismtach';

    else if (username === '')
      message = "username can't not be empty";


    }

    ngOnInit() {
  }

}
