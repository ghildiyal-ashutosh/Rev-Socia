import {Injectable} from "@angular/core";

const REVIEWER_API_URL = 'http://localhost:3000/api/reviewer'



@Injectable ()
export class ReviewerServiceClient {

   createReviewer(reviewer)
  {
    return fetch(REVIEWER_API_URL, {
      method :'POST',
      body : JSON.stringify(reviewer),
      credentials : 'include',
      headers:
        {'content-type' : 'application/json'}
    }).then((response) => response.json())

  }
  findReviewerByCategory(fields)
  {
    return fetch(REVIEWER_API_URL + '/category',{
      body: JSON.stringify(fields),
      headers:{
        'content-type':'application/json'
      }
    }).then((response) => response.json());
  }

  findReviewerById(reviewerId)
  {
    return fetch(REVIEWER_API_URL + '/' + reviewerId,{
      credentials : 'include'
    }).then((response) => response.json());
  }



updateReviewFields(fields, reviewerId)
{
  return fetch(REVIEWER_API_URL + '/' + reviewerId,{
    method: 'PUT',
    body: JSON.stringify(fields),
    credentials:'include',
    headers : {
      'content-type' : 'application/json'
    }
  }).then((response) => response.json());

}

deleteReviewField(field, reviewerId)
{
  return fetch ((REVIEWER_API_URL) + '/' + reviewerId + '/field/' + field, {
    method: 'DELETE',
    credentials : 'include'
  }).then((response) => response.json()

  )
}

addReviewed(reviewerId, submissionId)
{
  return fetch(REVIEWER_API_URL+ '/' + reviewerId + '/submission/' + submissionId,{
    method: 'POST',
    credentials : 'include'
  }).then((response) => response.json());
}

increaseRating(reviewerId)
{
  return fetch(REVIEWER_API_URL+ '/increaseRating/' + reviewerId,{
    method: 'PUT',
    credentials: 'include'
  }).then((response) => response.json());
}


  decreaseRating(reviewerId)
  {
    return fetch(REVIEWER_API_URL+ '/decreaseRating/' + reviewerId,{
      method: 'PUT',
      credentials: 'include'
    }).then((response) => response.json());
  }

  findReviewerByRating(rating)
  {
    return fetch(REVIEWER_API_URL + '/rating/' + rating)
      .then((response) => response.json());
  }

  findAllUsers()
  {
    return fetch(REVIEWER_API_URL,{

    }).then((response) => response.json());
  }


}

