import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

declare var gapi: any;

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css'],
  providers: [ LoginService, UserService ]
})
export class NavLoginComponent implements OnInit {

	isLogin: boolean = false;
	profile: Object = {};
	auth2: any;

  constructor (private globalVars: GlobalVarsService, 
    private userService: UserService, private loginService: LoginService, 
    private zone: NgZone, private router: Router ) {
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
            //save mlab
            this.loginService.checkExist(this.profile['email']).then(res => {
              //lần đầu đăng nhập
              if (res == null) {
                this.loginService.login(this.profile).then(res => {
                  console.log(res['_id']);
                  this.profile['id'] = res['_id'];
                  this.globalVars.setProfile(this.profile);
                });
              } else {
                //đã đăng nhập
                this.userService.updateUser(this.profile['email'], this.profile).then(res => {
                  this.profile = res;
                  this.globalVars.setProfile(this.profile);
                });

                // this.userService.getUser(this.profile['email']).then(res => {
                //   console.log(res['_id']);
                //   this.profile['id'] = res['_id'];
                //   this.globalVars.setProfile(this.profile);
                // });
              }
            });

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
        this.router.navigate(['/login']);
      })
    });
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }
}
