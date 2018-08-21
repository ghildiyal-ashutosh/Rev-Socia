import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkServiceClient} from "../../services/work.service.client";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

user = {username: '', crypto: '', _id : ''};
title = '';
category = '';
points;
description = '';
rubric  =  '';

workReviews = [{reviewer: {title: ''} , timeStamp: '' , score: '', review: ''}]


  constructor(private userService: UserServiceClient,
              private activatedRoute: ActivatedRoute,
              private workService : WorkServiceClient,
               private router: Router) { }

              createWork() {
                  if ((this.title !== null && this.title !== '')
                      && (this.category !== null && this.category !== '') &&
                      (this.points !== null && this.points > 0 && this.points < this.user.crypto)) {
                      const work = {
                          title: this.title, category: this.category,
                          points: this.points,
                          description: this.description,
                          rubric: this.rubric
                      }
                      console.log(work);

                      this.workService.createWork(work)
                          .then((response) => {
                              if (response !== null) {
                                  this.userService.findUserById(this.user._id)
                                      .then((user) => {
                                          this.user = user;
                                          alert('Work Created Crypto debited...Ready for review');

                                      });

                              }
                          })
                  }
                              else {
                                  alert("Title, Category and Cryptos are mandatory fields");
                              }
                          }



  ngOnInit() {

    this.userService.findCurrentUser()
        .then((response) => {
            if(response.username !== '-1')
            {
                this.userService.findUserById(response._id)
                    .then((user) => {
                        this.user = user;
                        console.log(user);
                    });
            }
            else{
                alert("No user logged in")
                this.router.navigate(['home']);
            }
        })
  }

}
