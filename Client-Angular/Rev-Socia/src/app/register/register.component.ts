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



            var firstName = this.firstName;
            var lastName = this.lastName;
            var email = this.email;
            var contact = this.contact;
            var role  = 'User';
            var crypto  = 500;


            const user = {
              firstName: firstName,
              lastName: lastName,
              username: username,
              password: password,
              email: email,
              contact: contact,
              role: role,
             crypto: crypto
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

    alert(message);


    }

    ngOnInit() {
  }

}
