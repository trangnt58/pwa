import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService ]
})
export class ProfileComponent implements OnInit {
	profile: Object = {};
  friends: any;
  requests: Object[];
  constructor(private globalVars: GlobalVarsService, private userService: UserService, private zone: NgZone) { }

  ngOnInit() {
  	this.globalVars.profile.subscribe(value => {
  		this.zone.run(() => {
  			console.log(value);
  			this.profile = value;
  		});

      if (value['id'] != undefined) {
        this.userService.getFriend(value['id']).then(res => {
          this.zone.run(() => {
            this.friends = res;
          });
        });

        this.userService.getRequestFriend(value['id']).then(res => {
          this.requests = res;
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
    this.userService.agreeRequest(item['_id'], this.profile['id']).then(res => {
      // if (this.requests.indexOf(item) >= 0 ) {
      //   this.requests.splice(this.requests.indexOf(item), 1);
      // }
      console.log('đã đồng ý');
    });
  }

  cancel(idFriend) {
    this.userService.cancel(this.profile['id'], idFriend).then(res => {
      console.log('hủy');
    })
  }
}
