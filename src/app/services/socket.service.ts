
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

  goPlayWord(socket) {
    socket.emit('go-play-word');
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

  receiveRandomUser(socket) {
     let observable = new Observable(observer => {
      socket.on('random-user-response', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;

  }

  /* Người chơi gửi yêu cầu nhưng không nhận được phản hồi */
  finishRequest(socket, request) {
    socket.emit('finish-request', request);
  }

  receiveFinish(socket) {
     let observable = new Observable(observer => {
      socket.on('close-dialog', (data) => {
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

  sendResponse(socket, response) {
    socket.emit('send-response', response);
  }

  beginGame(socket) {
    let observable = new Observable(observer => {
      socket.on('begin-game', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  sendAns(socket, data) {
    socket.emit('send-answer', data);
  }

  receiveAnsFriend(socket){
     let observable = new Observable(observer => {
      socket.on('receive-answer', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  receiveResponse(socket) {
    let observable = new Observable(observer => {
      socket.on('receive-response', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  waitAccept(socket) {
    let observable = new Observable(observer => {
      socket.on('wait-accept', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
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


  getNumOfOnline(socket){
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


  createFriend(socket, data) {
    socket.emit('create-friend', data);
  }

  createFriendRequest(socket) {
    let observable = new Observable(observer => {
      socket.on('create-friend-request', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }

  unfriend(socket, data) {
    socket.emit('unfriend', data);
    let observable = new Observable(observer => {
      socket.on('unfriend-response', (data) => {
        observer.next(data);    
      });

      return () => {
        socket.disconnect();
      };  
    })     
    return observable;
  }



  /* 
  * Method to emit the logout event.
  */
  logoutGame(socket, userId):any{
    socket.emit('logout-game', userId);
  }

  logout(socket, userId):any{
    socket.emit('logout', userId);
  }

  /* 
  * Method to emit the disconnect event.
  */
  // disconnect(userId):any {
  //   this.socket.emit('disconnect', userId);
  // }

}
