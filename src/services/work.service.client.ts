import {Injectable} from "@angular/core";

// const WORK_API_URL = 'http://localhost:3000/api/work'

const WORK_API_URL = 'https://rev-socia-node-server.herokuapp.com/api/work'

Injectable ()

export class WorkServiceClient {

  createWork(work){
    return fetch(WORK_API_URL, {
      credentials : 'include',
      body : JSON.stringify(work),
      method:'POST',
      headers : {
        'content-type' : 'application/json'
      }
    }).then ((response) => response.json())
  }

  deleteWork(workId){
    return fetch(WORK_API_URL + '/' + workId,{
      credentials : 'include',
      method :'DELETE'
    }).then((response) => response.json());
  }

  findWorkForUser()
  {
    return fetch (WORK_API_URL.replace('work','userWork'),{
      credentials : 'include'
    }).then((response) => response.json());

  }

  findWorkById(workId)
  {
    return fetch((WORK_API_URL + '/' + workId),{
      credentials: 'include'
  }).then ((response) => response.json())
  }

  findAllWork()
  {
    return fetch((WORK_API_URL),{
      credentials : 'include'
    }).then((response) => response.json());
  }
}
