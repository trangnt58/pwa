import { Component, OnInit, Input } from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';
import { SocketService } from './../../services/socket.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
  providers: [ SocketService, UserService ]
})
export class UserItemComponent implements OnInit {
	profile: Object = {};
	@Input() user: Object = {};
	socket: any;
	isMe: boolean = false;
	isFriend: boolean = false;
  isRequest: boolean =false;
  requests: Object[] = [];
  state: String = '';
  constructor( private socketService: SocketService,
    private globalVars: GlobalVarsService,
    private userService: UserService ) { }

  ngOnInit() {
  	this.globalVars.fullSocket.subscribe(value => {
  		if(value != null) {
  			this.profile = value['profile'];
        var myId = value['profile']['_id'];
        var friendId = this.user['_id'];
  			this.socket = value['socket'];  
  			if(this.profile['list_friend'].indexOf(this.user['_id']) >= 0) {
  				this.isFriend = true;
          this.state = 'isFriend';
  			}
        if (this.profile['_id'] == this.user['_id']) this.isMe = true;
  			      
  		}
  	})

  }

  checkIsRequest(requests, friendId) {
    if (requests.length > 0) {
      for(let i = 0; i < requests.length; i++) {
        if(requests[i]['_id'] == friendId) {
          this.isRequest = true;
          this.state = 'isRequest';
          break;
        }
      }
    }
  }

  unfriend() {
    var data = {};
    data['from'] = this.profile;
    data['to'] = this.user;
    this.socketService.sendEvent(this.socket, 'unfriend', data);
  }

  createFriend(){
    if(this.profile['_id'] != undefined) {
      let friend: Object = {};
      friend['from'] = this.profile['_id'];
      friend['fromInfo'] = this.profile;
      friend['to'] = this.user['_id'];
      if(this.user['onApp'] == true) {
        friend['toSocketId'] = this.user['socketId'];
        this.socketService.createFriend(this.socket, friend);
      } 
    }
  }

  acceptRequest(){
    var data = {};
    data['from'] = this.user;
    data['to'] = this.profile;
    this.socketService.sendEvent(this.socket, 'accept-request', data);
    this.user = null;
  }

  ignoreRequest() {
  	this.userService.ignore(this.user['_id'], this.profile['_id']).then( res => {
  		console.log(res);
  		this.user = null;
  	});
  }

}
