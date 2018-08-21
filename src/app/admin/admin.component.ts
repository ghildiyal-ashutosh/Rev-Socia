import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../../services/user.service.client";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users = [{username: '', firstName: '', lastName: '', role:'', contact: -1, email:'' , _id : -1}];

  username;
  firstName;
  lastName;
  role;
  contact;
  email;
  _id = -1;
  searchName = '';

  constructor(private userService: UserServiceClient) { }


  loadUser(user)
  {
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.contact = user.contact;
    this.email = user.email;
    this._id = user._id;

  }

  updateUser(){
    if (this._id !== -1){
      const user = {firstName:this.firstName, lastName: this.lastName,
                      role:this.role,contact:this.contact, email:this.email, _id: this._id};

      console.log(user);

      this.userService.updateByAdmin(user)
        .then(() => {
          this._id = -1;
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.contact = '';
          this.email = "";
          this.role = 'User';
          alert("User Updated")
          this.findAllUsers();
        })


    }
    else{
      alert('cant update a user that does not exist !!!')
    }

  }

  searchUser()
  {
    console.log(this.searchName);
    if (this.searchName !== '' && this.searchName !== null)
    {
      this.userService.findByUsername(this.searchName)
        .then((user) => {
          this.loadUser(user);
          this.searchName = '';
        });
    }
    else {
      alert('cant search empty name')
    }
  }

  deleteUser(user)
  {
    this.userService
      .deleteUser(user._id)
      .then (() => {
        alert("Deleted Successfully")
        this.findAllUsers();
      });
  }

  findAllUsers()
  {
    this.userService
      .findAllUsers()
      .then((response) => this.users = response)
  }


  createUser()
  {

    console.log(this._id);
    if (this._id === -1 && (this.role !== '' && this.email !== '')
      &&(this.role !== null && this.email !== null)) {
      var username = 'username' + this.users[this.users.length - 1]._id;
      var password = 'password123';
      this.userService.findByUsername(username)
        .then((response) => {
          if (response.username === '-1') {

            var user = {
              firstName: this.firstName, lastName: this.lastName,
              role: this.role, contact: this.contact, email: this.email, username: username, password: password
            };

            this.userService.registerUser(user)
              .then((response) => {
                alert("User Created Successfully");

                this.findAllUsers();
              })
          }
          else
            alert("Username exist");
        })
    }

    else {
      alert('cant create an existing user !!!')
    }

  }

  ngOnInit() {
    this.findAllUsers();
  }

}
