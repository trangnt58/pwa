import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from './../../services/user.service';
import { GlobalVarsService } from './../../services/global-vars.service';
import { SocketService } from './../../services/socket.service';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css'],
  providers: [ UserService ]
})
export class SearchFriendComponent implements OnInit {
  profile: Object = {};
	query: String = '';
	result: Object[] = [];
  requests: Object[] = [];
  socket: any;
  constructor(
    private globalVars: GlobalVarsService, private socketService: SocketService, 
    private userService: UserService, 
    private zone: NgZone) { }

  ngOnInit() {
    this.globalVars.profile.subscribe(value => {
      this.zone.run(() => {
        this.profile = value;
      });
    });
    this.globalVars.fullSocket.subscribe(value => {
      if(value != null) {
        this.socket = value['socket'];
        this.socketService.getFriendshipRequest(this.socket, value['profile']['_id']).subscribe(res => {          
          this.requests = res;
        });

        this.socketService.listenEvent(this.socket, 'new-user').subscribe(res => {
          if(this.getNewArray(this.requests, res) != null) {
            //console.log('a new user in requests online');
            this.requests = this.getNewArray(this.requests, res);
            for (let i = 0; i < this.requests.length; i++) {
              this.requests[i]['isRequest'] = true;
            }
          }

          if(this.getNewArray(this.result, res) != null) {
            //console.log('a new user in search result online');
            this.result = this.getNewArray(this.result, res);
          }
        });
     }
    });
  }

  getNewArray(arr, newUser) {
    for(let i = 0; i < arr.length; i++) {
      if (newUser['_id'] == arr[i]['_id']) {
        arr = arr.filter(function( obj ) {
          return obj['_id'] !== newUser['_id'];
        });
        arr.push(newUser);
        return arr;
      }
    }
    return null;
  }

   onKey(event: any) { 
    this.search();
  }



  search(){
    if(this.query != '') {
      var data = {};
      data['query'] = this.query;
      this.socketService.sendListenEventArr(this.socket,'search-user','search-user-response', data).subscribe(
        res => {
          for(let i = 0 ;i < res.length; i++) {
            res[i]['state'] = '';
          }
          this.result = res;
       });
    }
    else {
      this.result = [];
    }
  }

  createFriend(item){
    if(this.profile['_id'] != undefined) {
      let friend: Object = {};
      friend['from'] = this.profile['_id'];
      friend['fromInfo'] = this.profile;
      friend['to'] = item['_id'];
      if(item['onApp'] == true) {
        friend['toSocketId'] = item['socketId'];
        this.socketService.createFriend(this.socket, friend);
      } else {
        
      }    
    }
  }
}
