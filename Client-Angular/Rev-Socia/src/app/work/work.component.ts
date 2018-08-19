import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../../services/user.service.client";
import {ActivatedRoute} from "@angular/router";
import {WorkServiceClient} from "../../services/work.service.client";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

user = {username: '', bitcoins: ''};
title = '';
category = '';
points = '';
description = '';
rubric  =  '';


  constructor(private userService: UserServiceClient,
              private activatedRoute: ActivatedRoute,
              private workService : WorkServiceClient) { }

              createWork()
              {
                if ((this.title !== null && this.title !== '')
                  && (this.points !== '' && this.points !== null))
                {
                const work = {title: this.title, category: this.category,
                  points: this.points,
                  description:this.description,
                rubric: this.rubric}
                console.log(work);

                this.workService.createWork(work)
                   .then((response) => alert('Work Created...Ready for review'));
              }
              else {
                  alert("Title and points are mandatory fields");
                }
              }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      params => this.userService.findUserById(params['userId'])
        .then((user) => this.user = user));
  }

}
