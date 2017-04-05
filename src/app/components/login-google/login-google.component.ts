import { Component, NgZone, OnInit } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CoolLocalStorage } from 'angular2-cool-storage';

declare var gapi: any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css'],
  providers: [ LoginService, UserService ]
})

export class LoginGoogleComponent implements OnInit {
  isLogin: boolean = false;
  profile: Object = {};
  auth2: any;
  isLogout: boolean = false;
  
  constructor(private zone: NgZone, private globalVars: GlobalVarsService, 
    private userService: UserService, private loginService: LoginService, 
    private router: Router, private localStorage: CoolLocalStorage) { 
  }

  ngOnInit() {
    this.start();
  }

  start() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '736288713251-26srbi81jha5n1aithe4av668oh5pn12.apps.googleusercontent.com'
      });

      this.auth2.then(() => {
        var isSignedIn = this.auth2.isSignedIn.get();
        var googleUser = this.auth2.currentUser.get();
        
        if (isSignedIn) {
          //Đã đăng nhập
          this.attachSignin(document.getElementById('customBtn'));
        } else {
          this.globalVars.setLoginStatus(false);
          this.attachSignin(document.getElementById('customBtn'));
        }
      });
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.zone.run(() => {
          var res =  googleUser.getBasicProfile();
          this.profile['displayName'] = res.getName();
          this.profile['imageUrl'] = res.getImageUrl();
          this.profile['name'] = res.getName();
          this.profile['email'] = res.getEmail();

          this.loginService.updateInfo(this.profile['email'], 'google', this.profile).then(res => {
            this.profile = res;
            this.globalVars.setProfile(this.profile);
            this.globalVars.setLoginStatus(true);
            this.localStorage.setItem('login', 'google');
            this.router.navigate(['/']);
          });          
        });
      },(error) => {
        alert(JSON.stringify(error, undefined, 2));
    });
  }

  sendData() {
    return this.profile;
  }
}
