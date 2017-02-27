import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from './../../services/user.service';
import { GlobalVarsService } from './../../services/global-vars.service';

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
  constructor(private globalVars: GlobalVarsService, private userService: UserService, private zone: NgZone) { }

  ngOnInit() {
    this.globalVars.profile.subscribe(value => {
      this.zone.run(() => {
        this.profile = value;
      });
    });
  }

  search(){
  	if(this.query != '') {
  		this.userService.findUser(this.query).then(res => {
  			this.zone.run(() => {
  				this.result = res;
  			console.log(this.result);
  		});
  			
  		});
  	}
  }

  createFriend(item){
    if(this.profile['_id'] != undefined) {
      let friend: Object = {};
      friend['from'] = this.profile['_id'];
      friend['to'] = item['_id'];
      this.userService.createFriend(friend).then(res => {
        console.log('gửi yêu cầu thành công');
      });
    }

  }
}
