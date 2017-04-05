import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';
import { UserService } from './../../services/user.service';
import { SocketService } from './../../services/socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService, SocketService ]
})
export class ProfileComponent implements OnInit {
	profile: Object = {};
  friends: Object[] = [];
  requests: Object[] = [];
  noRequest: boolean = false;
  socket: any;
  constructor(private globalVars: GlobalVarsService, 
    private userService: UserService, 
    private zone: NgZone, 
    private socketService: SocketService) { }

  ngOnInit() {
  	this.globalVars.fullSocket.subscribe(value => {
      if(value != null) {
        this.profile = value['profile'];
        this.socket = value['socket'];
        var id = value['profile']['_id'];

        this.socketService.getFriendList(this.socket, id).subscribe(res => {
          if (res['type'] =='list') {
            this.zone.run(() => {
              for (let i = 0; i < res['list_friend'].length; i++) {
                res['list_friend'][i]['state'] = 'isFriend';
              }
              this.friends = res['list_friend'];
            });
          } else {
            if (res['type'] == 'unfriend') {
              this.friends = this.removeInArray(this.friends, res['user']);
            }

            if (res['type'] == 'new-friend') {
              res['user']['state'] = 'isFriend';
              this.friends.push(res['user']);
            }
          }
        });
        this.socketService.getFriendshipRequest(this.socket, id).subscribe(res => {
          this.zone.run(() => {
            this.requests = res;
            if(this.requests.length == 0) {
              this.noRequest = true;            
            } else {
            for (let i = 0; i < this.requests.length; i++) {
                this.requests[i]['isRequest'] = true;
              }
            }
          }); 
        });

        this.socketService.listenEvent(this.socket, 'new-user').subscribe(res => {
          if(this.getNewArray(this.friends, res) != null) {
            res['state'] = 'isFriend';
            this.friends = this.getNewArray(this.friends, res);
          }
        });
      }
    });
  }

  agree(item) {
    this.userService.agreeRequest(item['_id'], this.profile['_id']).then(res => {
      console.log(res);
    });
  }

  removeInArray(arr, user) {
    arr = arr.filter(function( obj ) {
      return obj['_id'] !== user['_id'];
    });
    return arr;
  }

  cancel(item) {
    let index = this.friends.indexOf(item);
    this.userService.cancel(this.profile['_id'], item['_id']).then(res => {
      this.friends.splice(index, 1);
    })
  }

  checkUserInList(userId){
    if (this.friends.length >= 0){
      for (let i = 0; i < this.friends.length; i++){
        if (userId == this.friends[i]['_id']) {
          return true;
        }
      }
      return false;
    }
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
}
