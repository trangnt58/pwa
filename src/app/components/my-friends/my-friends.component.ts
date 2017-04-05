import { Component, OnInit, Input, Output, NgZone, EventEmitter,  
  trigger,
  state,
  style,
  transition,
  animate 
} from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';
import { UserService } from './../../services/user.service';
import { SocketService } from './../../services/socket.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
  providers: [ UserService, SocketService ],
  animations: [
    trigger('friendState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class MyFriendsComponent implements OnInit {
  @Output() selectFriend = new EventEmitter<Object>();
  @Input() from: Object = {};
	friends: Object[] = [];
  selectedFriend: boolean = false;
  playerFriend: Object = {};
  socket: any;
  profile: Object = {};

  constructor(private globalVars: GlobalVarsService, 
    private userService: UserService, private socketService: SocketService,
    private zone: NgZone ) { }

  ngOnInit() {
    this.globalVars.fullSocket.subscribe(res => {
        if (res != null) {
          this.socket = res['socket'];
          this.profile = res['profile']
          this.socketService.getFriendList(this.socket,this.profile['_id']).subscribe(res => {
            if(res['type'] =='list') {
              this.friends = res['list_friend'];
            } else {
              if (res['singleUser'] && this.checkUserInList(res['list_friend']['_id'])) {
                if(this.friends.length > 0) {
                  this.friends = this.friends.filter(function( obj ) {
                    return obj['_id'] !== res['list_friend']['_id'];
                  });
                }
                this.friends.push(res['list_friend']);
              }
              
              if (res['type'] == 'new-friend') {
                this.friends.push(res['user']);

              }
              if (res['type'] == 'unfriend') {
                this.friends = this.removeInArray(this.friends, res['user']);
              }
            }          
          });
        }
    });  
  }

  chooseFriend(item) {
    for (let i = 0; i < this.friends.length; i++) {
      if (this.friends[i]['state'] == item){
        item['state'] = 'active';
      } 
      else {
        this.friends[i]['state'] = 'inactive';
      }
    }
    item['state'] = 'active';
    
    if (item.online == true) {
      this.playerFriend = item;
      this.selectedFriend = true;
      this.selectFriend.emit(item);
    } else {
      this.playerFriend = null;
      this.selectedFriend = false;
      this.selectFriend.emit(item);
    }
  }

  checkUserInList(userId){
    if (this.friends.length >= 0){
      for(let i = 0; i < this.friends.length; i++){
        if(userId == this.friends[i]['_id']) {
          return true;
        }
      }
      return false;
    }

  }

  removeInArray(arr, user) {
    arr = arr.filter(function( obj ) {
      return obj['_id'] !== user['_id'];
    });
    return arr;
  }

}
