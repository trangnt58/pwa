import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profile: Object = {};
  constructor(private globalVars: GlobalVarsService, private zone: NgZone) { }

  ngOnInit() {
  	this.globalVars.profile.subscribe(value => {
  		this.zone.run(() => {
  			console.log(value);
  			this.profile = value;
  		});
  	});
  }

  getListFriend(email) {

  }
}
