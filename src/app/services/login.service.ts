import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from './config';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(user){
  	let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post(Config.url+ '/api/users/create', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }

  updateInfo(email, method, user): Promise<Object> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post(Config.url + '/api/users/edit/'+ email + '/'+ method, JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }
  
}