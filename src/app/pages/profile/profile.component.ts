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
  friends: any;
  requests: Object[] = [];
  noRequest: boolean = false;
  constructor(private globalVars: GlobalVarsService, 
    private userService: UserService, private zone: NgZone, private socketService: SocketService) { }

  ngOnInit() {
  	this.globalVars.profile.subscribe(value => {
  		this.zone.run(() => {
  			this.profile = value;
  		});

      if (value['_id'] != undefined) {
        this.socketService.connectSocket(value['_id']);
        this.userService.getFriend(value['_id']).then(res => {
          this.zone.run(() => {
            this.friends = res;
          });
        });

        this.userService.getRequestFriend(value['_id']).then(res => {
          this.requests = res;
          if(this.requests.length == 0) {
            this.noRequest = true;            
          }
        });        
       }
  	});
  }

  getListFriend(email) {
    this.userService.getFriend(email).then(res => {
      this.friends = res;
    });
  }

  agree(item) {
    this.userService.agreeRequest(item['_id'], this.profile['_id']).then(res => {
      // if (this.requests.indexOf(item) >= 0 ) {
      //   this.requests.splice(this.requests.indexOf(item), 1);
      // }
      console.log(res);
      console.log('đã đồng ý');
    });
  }

  cancel(idFriend) {
    this.userService.cancel(this.profile['_id'], idFriend).then(res => {
      console.log('hủy');
    })
  }
}
