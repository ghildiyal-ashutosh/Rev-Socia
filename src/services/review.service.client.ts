import {Injectable} from "@angular/core";

//const REVIEW_API_URL = 'http://localhost:3000/api/review'
const REVIEW_API_URL  = 'https://rev-socia-node-server.herokuapp.com/api/review'

@Injectable ()
export class ReviewServiceClient {

  createReview(review){
    return fetch (REVIEW_API_URL,{
      method: 'POST',
      credentials : 'include',
      body : JSON.stringify(review),
      headers : {
        'content-type' : 'application/json'
      }
    }).then((response) => response.json())
  }

  findAllReviews()
  {
    return fetch (REVIEW_API_URL)
      .then((response) => response.json());

  }

  findReviewById (reviewId)
  {
    return fetch(REVIEW_API_URL + '/' + reviewId,{
      credentials : 'include'
    }).then((response) => response.json());
  }

  findReviewForWork (reviewId, workId)
  {
    return fetch((REVIEW_API_URL + '/' + reviewId + '/work/' + workId),{
      credentials: 'include'
    }).then((response) => response.json());
  }

  findReviewForReviewer(reviewId,reviewerId){
    return fetch((REVIEW_API_URL + '/' + reviewId + '/reviewer/' + reviewerId),{
      credentials : 'include'
    }).then((response) => response.json());
  }

  findAllReviewsForWork(workId)
  {
    return fetch((REVIEW_API_URL + '/work/' + workId),{
      credentials: 'include'
    }).then((response) => response.json())
  }

  findAlldReviewsForReviewer(reviewerId){
    return fetch((REVIEW_API_URL + '/reviewer/' + reviewerId),{
      credentials : 'include'
    }).then((response) => response.json())
  }


}
