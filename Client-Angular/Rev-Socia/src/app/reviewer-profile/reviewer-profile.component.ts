import { Component, OnInit } from '@angular/core';
import {ReviewerServiceClient} from "../../services/reviewer.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceClient} from "../../services/user.service.client";
import {WorkServiceClient} from "../../services/work.service.client";

@Component({
  selector: 'app-reviewer-profile',
  templateUrl: './reviewer-profile.component.html',
  styleUrls: ['./reviewer-profile.component.css']
})
export class ReviewerProfileComponent implements OnInit {

  title = '';

 fields = [];
 fields2 = [];
 user = {crypto: ''}
 reviewer = {title: '', fields: [], reviewed: '', rating: '', _id: ''};
 reviewerStatus = false;
 availableWork = [{title:'' , points: '', description: '', category: '', rubric: ''}];

  constructor(private reviewerService: ReviewerServiceClient,
              private activatedRoute: ActivatedRoute,
              private  userService: UserServiceClient,
              private router: Router,
              private workService: WorkServiceClient) { }

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

          this.workService.findAllWork()
            .then((response) => {
              this.availableWork =
                response.filter((work) => {
                  if (this.reviewer.fields.indexOf(work.category) !== -1) {
                    return work;
                  }});
            });



        });
    }


  }

  deleteField(field)
  {
    this.reviewerService.deleteReviewField(field,this.reviewer._id)
      .then((response) => {
        this.reviewerService.findReviewerById(this.reviewer._id)
          .then((reviewer) =>
          {
            this.reviewer = reviewer;
            this.workService.findAllWork()
              .then((response) => {
                this.availableWork =
                  response.filter((work) => {
                    if (this.reviewer.fields.indexOf(work.category) !== -1) {
                      return work;
                    }});
              });

          });
      });


  }




  ngOnInit() {

      this.userService.findCurrentUser()
        .then((response) => {
        if (response.username !== "-1") {
                   this.user = response;
          if (response.reviewer._id !== null) {
            this.reviewerStatus = true;
            this.reviewerService.findReviewerById(response.reviewer)
              .then((response) => this.reviewer = response);


            this.workService.findAllWork()
                .then((response) => {
                  this.availableWork =
                    response.filter((work) => {
                      if (this.reviewer.fields.indexOf(work.category) !== -1) {
                        return work;
                      }});
                });
            }
            }
        else {
          alert('No User Logged In');
          this.router.navigate(['home']);
        }

      })
  }

}
