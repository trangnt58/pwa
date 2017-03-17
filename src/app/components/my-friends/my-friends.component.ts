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

  constructor(private globalVars: GlobalVarsService, 
    private userService: UserService, private socketService: SocketService,
    private zone: NgZone ) { }

  ngOnInit() {
    this.globalVars.profile.subscribe( value => {
      if(value['_id'] == undefined) return;
    	this.globalVars.socket.subscribe(socket => {
        if (value['_id'] != undefined && socket != null) {
          this.socketService.getFriendList(socket,value['_id']).subscribe(res => {
              if(res['singleUser'] && this.checkUserInList(res['list_friend']['_id'])) {
                if(this.friends.length > 0) {
                  this.friends = this.friends.filter(function( obj ) {
                    return obj['_id'] !== res['list_friend']['_id'];
                  });
                }
                this.friends.push(res['list_friend']);
              } else {
                if(res['userDisconnected'] && this.checkUserInList(res['list_friend']['_id'])){
                  this.friends = this.friends.filter(function( obj ) {
                    return obj['_id'] !== res['list_friend']['_id'];
                  });
                }else{
                  this.friends = res['list_friend'];
                } 
              }           
            
          });
          // //http request
          // this.userService.getFriend(value['_id']).then(res => {
          //   this.zone.run(() => {
          //     this.friends = res;
          //   });
          // });
        }
      });
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
    this.playerFriend = item;
    this.selectedFriend = true;
    this.selectFriend.emit(item);
  }

  checkUserInList(userId){
    if (this.friends.length >= 0){
      for(let i = 0; i<this.friends.length; i++){
        if(userId == this.friends[i]['_id']) {
          return true;
        }
      }
      return false;
    }

  }

}
