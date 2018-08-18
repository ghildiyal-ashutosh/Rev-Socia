import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../../services/user.service.client";


import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {contact: 0, firstName:'',lastName:'',email: '',
    interest:{field1: '', field2: '' ,field3: '', field4: ''}, role: '' , username: '' , _id: -1 };

  contact;
  firstName = '';
  lastName = '';
  email = '';
  field1 = '';
  field2 = '';
  field3 = '';
  field4 = '';
  role: '';


  constructor(private userService: UserServiceClient,
               private router: Router) { }


  logout()
  {
    this.userService
         .logout()
          .then(() => {
            this.router.navigate(['home']);
          });
  }


  updateUser()
  {
    const interest =  {field1: this.field1, field2:this.field2 , field3:this.field3,field4:this.field4};
    const user = {firstName: this.firstName,
                  lastName:this.lastName,
                  email:this.email,
                  contact:this.contact,
                   interest: interest,
                    role: this.role}

                   console.log(user);

                   this.userService.updateUser(user)
                      .then((response) => {
                        if (response.username !== -1)
                        {
                          this.user = response;
                          this.assignValues(this.user);
                        }
                        else
                          alert("Didnt update Something went wrong");
                      });

  }

  assignValues(user)
  {
   this.contact = user.contact;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
   this.email =  user.email;
   this.field1 = user.interest.field1;
   this. field2 = user.interest.field2;
    this.field3 = user.interest.field3;
   this. field4 = user.interest.field3;
    this.role =  user.role;


      }


  ngOnInit() {
    this.userService.findCurrentUser()
      .then((response) => {
        if(response.username !== '-1') {
          this.user = response;
          this.assignValues(this.user);
          }
        else {
          alert('No User Logged In');
          this.router.navigate(['home']);
        }
      });

    }

}
