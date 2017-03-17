
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/*npm install @types/socket.io-client --save
*/
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

	/* 
	* specifying Base URL.
	*/
	private BASE_URL = 'http://localhost:3000';  
  private socket;

  constructor() {}

  connectSocket(userId:string) {
    this.socket = io(this.BASE_URL,{ query: `userId=${userId}`});
    return this.socket;
  }

  getFriendList(socket, userId: string) {
    //this.connectSocket(userId);
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

  sendRequest(socket, request) {
    socket.emit('send-request', request);
  }

  receiveRequestSocket(socket, userId) {
    if(userId == undefined) return null;
    //this.connectSocket(userId);
   // this.socket.emit('friend-list', userId);
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


  // getFriendList(userId: string): Promise<Object[]> {
  //   this.socket = io(this.BASE_URL);
  //   this.socket.emit('friend-list', userId);
  //   return new Promise(resolve => {
  //     this.socket.on('friend-list-response', (data) => {
  //       resolve(data);    
  //     });
  //   });

  // }

  sendMessage(message){
  	this.socket = io(this.BASE_URL);
    this.socket.emit('add-message', message);    
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.BASE_URL);
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  


  /* 
  * Method to emit the logout event.
  */
  logout(userId):any{

    this.socket.emit('logout', userId);

    let observable = new Observable(observer => {
      this.socket.on('logout-response', (data) => {
        observer.next(data);    
      });

      return () => {
        
        this.socket.disconnect();
      };  
    })     
    return observable;
  }

  /* 
  * Method to emit the disconnect event.
  */
  disconnect(userId):any {
    //this.socket.emit()
    this.socket.emit('disconnect', userId);
  }

}
