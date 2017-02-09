import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var gapi: any;

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css']
})
export class NavLoginComponent implements OnInit {

	isLogin: boolean = false;
	profile: Object = {};
	auth2: any;

  constructor (private globalVars: GlobalVarsService, private zone: NgZone, private router: Router ) {
	}

  ngOnInit() {
  	this.start();
  	this.globalVars.isUserLoggedIn.subscribe(value => {
  		this.zone.run(() => {
  			this.isLogin = value;
  		});
  	});

  	this.globalVars.profile.subscribe(value => {
  		this.zone.run(() => {
  			this.profile = value;
  		});
  	});
  }

  start() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '736288713251-26srbi81jha5n1aithe4av668oh5pn12.apps.googleusercontent.com'
      });

      this.auth2.then(() => {
        var isSignedIn = this.auth2.isSignedIn.get();
        var googleUser = this.auth2.currentUser.get();
        
        if (isSignedIn) {
        	this.zone.run(() => {
        		this.isLogin = true;
	          var res =  googleUser.getBasicProfile();
	          this.profile['name'] = res.getName();
	          this.profile['imageUrl'] = res.getImageUrl();
            this.profile['email'] = res.getEmail();
	          this.globalVars.setLoginStatus(true);
          	this.globalVars.setProfile(this.profile);
            console.log('res'+ JSON.stringify(res));
	          //this.router.navigate(['/']);
        	});
        } else {
          console.log('not login');
          this.globalVars.setLoginStatus(false);
        }
      });

     });
  }

  logOut() {
    this.auth2 = gapi.auth2.getAuthInstance();
    
    this.auth2.signOut().then(() => {
      console.log('User signed out.');
      this.zone.run(() => {
        this.globalVars.setLoginStatus(false);
        this.isLogin = false;
        this.profile = {};
      })
    });
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }
}
