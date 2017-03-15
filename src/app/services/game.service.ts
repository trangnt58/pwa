import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class GameService {

  constructor(private http:Http) { }

  createGame(game) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post('http://localhost:3000/api/games/create', JSON.stringify(game), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }

  updateGame(id, turn) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post('http://localhost:3000/api/games/update/'+id, JSON.stringify(turn), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      });
    });

  }

  getRequestGame(id):Promise<Object[]> {
     return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/games/request/'+ id).subscribe(result => {
        resolve(result.json());
      });
    });
  }

  deleteGame(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return new Promise(resolve => {
      this.http.post('http://localhost:3000/api/games/delete/'+ id, { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }

}
