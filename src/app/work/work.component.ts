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

user = {username: '', crypto: ''};
title = '';
category = '';
points = '';
description = '';
rubric  =  '';

workReviews = [{reviewer: {title: ''} , timeStamp: '' , score: '', review: ''}]


  constructor(private userService: UserServiceClient,
              private activatedRoute: ActivatedRoute,
              private workService : WorkServiceClient,
               private router: Router) { }

              createWork()
              {
                if ((this.title !== null && this.title !== '')
                  && (this.category !== null && this.category !== ''))
                {
                const work = {title: this.title, category: this.category,
                  points: 0,
                  description:this.description,
                rubric: this.rubric}
                console.log(work);

                this.workService.createWork(work)
                   .then((response) => alert('Work Created...Ready for review'));
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
                this.user = response;
            }
            else{
                alert("No user logged in")
                this.router.navigate(['home']);
            }
        })
  }

}
