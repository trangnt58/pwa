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
      this.http.post(Config.url+ '/users/api/create', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }

  checkExist(email): Promise<Object> {
    return new Promise(resolve => {
      this.http.get(Config.url+'/users/api/'+ email).subscribe(result => {
        resolve(result.json());
      });
    });
  }
  
}