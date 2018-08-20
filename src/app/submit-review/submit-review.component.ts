import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceClient} from "../../services/user.service.client";
import {WorkServiceClient} from "../../services/work.service.client";
import {ReviewServiceClient} from "../../services/review.service.client";

@Component({
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.css']


})
export class SubmitReviewComponent implements OnInit {

  reviewerId = '';
  workId = '';
  work = {title:'', description: '' ,rubric: '' , timeStamp: '', points: '' ,_id: ''};
  review = '';
  score = '';
  user = {_id: ''}


  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserServiceClient,
              private workService: WorkServiceClient,
              private router:Router,
              private reviewService: ReviewServiceClient) { }



              submitReview() {
                if ((this.review !== null && this.review !== '') &&
                  (this.score !== null && this.score !== '')) {

                  const review = {review: this.review, score: this.score,
                    cost: this.work.points, upvote : 0 , reviewer: this.reviewerId,
                    work: this.work._id , timeStamp: ''};

                  this.reviewService.createReview(review)
                    .then((response) => {
                      alert("Review Submitted Successfully")
                      this.router.navigate ([`reviewer/${this.user._id}`]);
                    })

                }
                else {
                  alert("Review and score are mandatory fields")
                }
              }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      params => {
        this.workService.findWorkById(params['workId'])
          .then((response) =>{

            this.work = response
            console.log(response);
          })

        this.reviewerId = params['reviewerId'];

          this.userService.findCurrentUser()
              .then((response) => {
                  if (response.username === "-1") {

                      alert('No user logged in currently !!!');
                      this.router.navigate(['home']);
                  }
                  else
                      this.user = response
              })

      })
  }
}
