import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getUser(email): Promise<Object> {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/users/api/'+email).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  getListFriend(id): Promise<Object> {
  	return new Promise(resolve => {
      this.http.get('http://localhost:3000/users/api/friend/'+id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  getFriend(id): Promise<Object> {
  	return new Promise(resolve => {
      this.http.get('http://localhost:3000/users/api/friend/'+ id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  createFriend(request){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post('http://localhost:3000/friends/create', JSON.stringify(request), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }



  findUser(input): Promise<Object[]> {
  	return new Promise(resolve => {
      this.http.get('http://localhost:3000/users/search/'+ input).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  getRequestFriend(id): Promise<Object[]> {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/friends/request/'+id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  agreeRequest(from, to) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/friends/agree/'+from+'/'+to).subscribe(result => {
        console.log(result.json());
      });
    });
  }

  cancel(user, friend): Promise<Object> {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/friends/cancel/'+user+'/'+friend).subscribe(result => {
        resolve(result.json());
      });
    });
  }
}
