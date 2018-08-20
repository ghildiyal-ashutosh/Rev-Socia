import { Component, OnInit } from '@angular/core';
import {ReviewerServiceClient} from "../../services/reviewer.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceClient} from "../../services/user.service.client";
import {WorkServiceClient} from "../../services/work.service.client";
import {ReviewServiceClient} from "../../services/review.service.client";

@Component({
  selector: 'app-reviewer-profile',
  templateUrl: './reviewer-profile.component.html',
  styleUrls: ['./reviewer-profile.component.css']
})
export class ReviewerProfileComponent implements OnInit {

  title = '';
reviewedWork = [{timeStamp: '', work: {title: '', category: ''} , score: '', }];
 fields = [];
 fields2 = [];
 user = {crypto: '', reviewer: {_id:''}, works: []}
 reviewer = {title: '', fields: [], reviewed: '', rating: '', _id: ''};
 reviewerStatus = false;
 availableWork = [{title:'' , points: '', description: '', category: '', rubric: '' ,_id: ''}];

  constructor(private reviewerService: ReviewerServiceClient,
              private activatedRoute: ActivatedRoute,
              private  userService: UserServiceClient,
              private router: Router,
              private workService: WorkServiceClient,
              private reviewService: ReviewServiceClient) { }

  createReviewer()
  {
    console.log(this.title, this.fields.length)

      if ((this.title !== '' && this.title !== null) && (this.fields.length > 0)){
        var reviewer = {title: this.title, fields: this.fields};

        this.reviewerService.createReviewer(reviewer)
          .then(response => {
            this.reviewer = response
            alert('Reviewer created');
            this.reviewerStatus = true;
          });

    }
    else
    {
      alert("Profile name and atleast one field is are mandatory");
    }
  }



  updateFields()
  {

    if (this.fields2.length > 0)
    {
      console.log(this.fields2);


      this.reviewerService.updateReviewFields(this.fields2, this.reviewer._id)
        .then(() => {
          this.reviewerService.findReviewerById(this.reviewer._id)
            . then((reviewer) => this.reviewer = reviewer);
          alert("Fields updated");

        this.findWork();



        });
    }


  }


  findAllReviewedWork()
  {
    this.reviewService.findAlldReviewsForReviewer(this.reviewer._id)
      .then((response) => this.reviewedWork = response);
  }


  findWork()
  {
    this.workService.findAllWork()
      .then((response) => {
        this.availableWork =
          response.filter((work) => {
            if ((this.reviewer.fields.indexOf(work.category) !== -1) &&
              (this.user.works.indexOf(work._id) === -1) ) {
                return work;
            }});
      });
  }

  deleteField(field)
  {
    this.reviewerService.deleteReviewField(field,this.reviewer._id)
      .then((response) => {
        this.reviewerService.findReviewerById(this.reviewer._id)
          .then((reviewer) =>
          {
            this.reviewer = reviewer;
          this.findWork();

          });
      });


  }




  ngOnInit() {

      this.userService.findCurrentUser()
        .then((response) => {
        if (response.username !== "-1") {
          this.user = response;

            if (this.user.reviewer._id !== null) {
                this.reviewerStatus = true;
                this.reviewerService.findReviewerById(this.user.reviewer)
                    .then((response) =>
                    {
                        this.reviewer = response;
                        this.findWork();

                        this.findAllReviewedWork()

                    });
            }


        }
        else {
          alert('No User Logged In');
          this.router.navigate(['home']);
        }
        })}}

