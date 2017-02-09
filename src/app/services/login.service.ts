import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(user){

  	let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:3000/users/api/create', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }

  checkExist(email): Promise<Object> {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/users/api/'+ email).subscribe(result => {
        resolve(result.json());
      });
    });
  }
  
}