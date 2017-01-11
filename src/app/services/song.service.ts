import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class SongService {

  constructor(private http:Http) { }

  getPopSong(): Promise<Object> {
  	return new Promise(resolve => {
      this.http.get('assets/data/song.json').subscribe(result => {
        resolve(result.json());
      });
    });

  }

}
