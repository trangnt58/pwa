
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Config } from './config';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  
	/* 
	* specifying Base URL.
	*/
	private BASE_URL = Config.url;  
  private socket;

  constructor() {}

  connectSocket(userId:string) {
    this.socket = io(this.BASE_URL,{ query: `userId=${userId}`});
    return this.socket;
  }

  goPlayWord(socket) {
    socket.emit('go-play-word');
  }

  getFriendList(socket, userId: string) {
    socket.emit('friend-list', userId);
    let observable = new Observable(observer => {
      socket.on('friend-list-response', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  listenEvent(socket, nameEvent) {
    let observable = new Observable(observer => {
      socket.on(nameEvent, (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  sendAndListenEvent(socket, sendEvent, listenEvent, data) {
    socket.emit(sendEvent, data);
    let observable = new Observable(observer => {
      socket.on(listenEvent, (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  sendListenEventArr(socket, sendEvent, listenEvent, data) {
    socket.emit(sendEvent, data);
    let observable = new Observable<Object[]>(observer => {
      socket.on(listenEvent, (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  sendEvent(socket, nameEvent, data) {
    socket.emit(nameEvent, data);
  }

  getFriendshipRequest(socket, userId: string) {
    socket.emit('friendship-request', userId);
    let observable = new Observable<Object[]>(observer => {
      socket.on('friendship-response', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  randomUser(socket, userId) {
    socket.emit('random-user', userId);
  }

  receiveRequestSocket(socket, userId) {
    if(userId == undefined) return null;
    let observable = new Observable(observer => {
      socket.on('send-request-response', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  getNumOfOnline(socket){
    socket.emit('get-sum-online');
     let observable = new Observable(observer => {
      socket.on('sum-online', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  /* 
  * Method to get history game recent.
  */
  getHistory(socket, userId){
    socket.emit('history', userId);
  }

  /* 
  * Method to emit the logout or exit game event.
  */
  logout(socket, userId):any{
    socket.emit('logout', userId);
  }

  /* 
  * Method to emit the disconnect event.
  */
  disconnect(socket):any {
    socket.disconnect();
  }

}
