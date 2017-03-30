import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from './config';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getUser(email): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(Config.url + '/users/api/'+ email).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  updateUser(id,user): Promise<Object> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post(Config.url + '/users/edit/'+ id, JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }

  getListFriend(id): Promise<Object> {
  	return new Promise(resolve => {
      this.http.get(Config.url+'/users/api/friend/'+ id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  getFriend(id): Promise<Object[]> {
  	return new Promise(resolve => {
      this.http.get(Config.url + '/users/api/friend/'+ id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  createFriend(request){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post(Config.url + '/friends/create', JSON.stringify(request), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }



  findUser(input): Promise<Object[]> {
  	return new Promise(resolve => {
      this.http.get(Config.url + '/users/search/'+ input).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  getRequestFriend(id): Promise<Object[]> {
    return new Promise(resolve => {
      this.http.get(Config.url + '/friends/request/'+id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  agreeRequest(from, to) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post(Config.url + '/friends/agree/'+from+'/'+to, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      });
    });
    // return new Promise(resolve => {
    //   this.http.get(Config.url + '/friends/agree/'+from+'/'+to).subscribe(result => {
    //     resolve(result.json());
    //   });
    // });
  }

  cancel(user, friend): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(Config.url + '/friends/cancel/'+user+'/'+friend).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  ignore(from, to): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(Config.url + '/friends/ignore/'+from+'/'+to).subscribe(result => {
        resolve(result.json());
      });
    });
  }
}
