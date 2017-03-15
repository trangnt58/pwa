
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
}
