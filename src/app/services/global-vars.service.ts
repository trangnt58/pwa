import { Injectable } from '@angular/core';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalVarsService {

  constructor() { }
  public isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public profile: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  setLoginStatus(isLoggedIn){
   this.isUserLoggedIn.next(isLoggedIn);
  }

  setProfile(profile) {
    this.profile.next(profile);
  }
}
