// const USER_API_URL = 'http://localhost:3000/api/user'
const USER_API_URL = 'https://rev-socia-node-server.herokuapp.com/api/user'
import {Injectable} from "@angular/core";

@Injectable ()

export class UserServiceClient {

  logout()
  {
    return fetch(USER_API_URL + '/logout', {
      credentials : 'include',
      method : 'POST'
    }).then (response => response.json());
  }

  login(credentials)
  {
    return fetch((USER_API_URL + '/login'),{
      method: 'POST',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers:{
        'content-type' : 'application/json'
      }
    }).then(response => response.json())
  }

  registerUser(user)
  {
    return fetch(USER_API_URL, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type' : 'application/json'
      }
    }).then (function (response) {

      return response.json();

    })
  }

  deleteUser(userId)
  {
    return fetch(USER_API_URL + '/' + userId,{
      method: 'DELETE',
      credentials : 'include'
    }).then(response => response.json())
  }

  updateUser(user)
  {
    return fetch((USER_API_URL),{
      method:'PUT',
      credentials :'include',
      body: JSON.stringify(user),
      headers: {
        'content-type' : 'application/json'
      }
    }).then((response) =>response.json());
  }


  findByUsername(username)
  {
    return fetch((USER_API_URL)+ '/username/' + username, {
      credentials : 'include'
    }).then(response =>response.json());
  }

  findCurrentUser()
  {
    return fetch(USER_API_URL + '/profile',  {
      credentials: 'include'

    }).then((response) => response.json());

  }

  findAllUsers()
  {
    return fetch(USER_API_URL,{
      credentials:'include'
    }).then(function (response) {
      return response.json();
    })
  }

  findUserById(userId)
  {
    return fetch((USER_API_URL + '/userId/' + userId ),{
      credentials : 'include'
    }).then((response) => response.json())
  }


}
