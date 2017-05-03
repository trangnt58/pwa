import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';

@Injectable()
export class WordService {

  constructor(private http: Http) { }

  getWordBySection(sectionId): Promise<Object[]> {
    return new Promise((resolve, reject) => {
      this.http.get(Config.url + '/api/words/section/'+sectionId).subscribe(result => {
        resolve(result.json());
      }, err => {
        reject(err);
      });
    });
  }

  getAllTopic():Promise<Object[]> {
    return new Promise((resolve, reject) => {
      this.http.get(Config.url + '/api/words/topic').subscribe(result => {
        resolve(result.json());
      }, err => {
        reject(err);
      });
    });
  }

  getInfoTopic(id): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.get(Config.url + '/api/words/topic/info/'+ id).subscribe(result => {
        resolve(result.json());
      }, err => {
        reject(err);
      });
    });
  }

  getSection(topicId):Promise<Object[]> {
    return new Promise((resolve, reject) => {
      this.http.get(Config.url + '/api/words/topic/'+ topicId).subscribe(result => {
        resolve(result.json());
      }, err => {
        reject(err);
      });
    });
  }

  getInfoSection(topicId, sectionId): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.get(Config.url + '/api/words/section/info/'+ topicId + '/' + sectionId).subscribe(result => {
        resolve(result.json());
      }, err => {
        reject(err);
      });
    });
  }
  
}
