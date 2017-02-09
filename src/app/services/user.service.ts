import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getListFriend(id): Promise<Object> {
  	return new Promise(resolve => {
      this.http.get('http://localhost:3000/users/api/friend/'+id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

}
