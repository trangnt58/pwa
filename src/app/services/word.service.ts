import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WordService {

  constructor(private http: Http) { }

  getAllWord(): Promise<Object> {
    return new Promise(resolve => {
      this.http.get('assets/data/words.json').subscribe(result => {
        resolve(result.json());
      });
    });
  }
  
}
