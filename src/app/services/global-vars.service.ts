import { Injectable } from '@angular/core';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalVarsService {

  constructor() { }
  public isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public profile: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public socket: BehaviorSubject<Object> = new BehaviorSubject<Object>(null);
  public fullSocket: BehaviorSubject<Object> = new BehaviorSubject<Object>(null);
  public mySocketId: BehaviorSubject<String> = new BehaviorSubject<String>(null);

  setLoginStatus(isLoggedIn){
   this.isUserLoggedIn.next(isLoggedIn);
  }

  setProfile(profile) {
    this.profile.next(profile);
  }

  setSocket(socket) {
  	this.socket.next(socket);
  }

  setMySocketId(socketId) {
    this.mySocketId.next(socketId);
  }

  setFullSocket(fullSocket){
  	this.fullSocket.next(fullSocket);
  }
}
