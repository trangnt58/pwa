import { Component, NgZone, OnInit } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    private router: Router) { 
    // this.globalVars.isUserLoggedIn.subscribe(value => console.log(value));
  }

  ngOnInit() {
    this.start();
  }

  start() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '736288713251-26srbi81jha5n1aithe4av668oh5pn12.apps.googleusercontent.com'
        //scope: 'https://www.googleapis.com/auth/drive'
      });

      this.auth2.then(() => {
        var isSignedIn = this.auth2.isSignedIn.get();
        var googleUser = this.auth2.currentUser.get();
        
        if (isSignedIn) {
          this.isLogin = true;
          
          var res =  googleUser.getBasicProfile();
          this.profile['displayName'] = res.getName();
          this.profile['imageUrl'] = res.getImageUrl();

          this.globalVars.setLoginStatus(true);
          this.globalVars.setProfile(this.profile);
          this.router.navigate(['/']);

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
          this.isLogin = true;
          
          this.isLogout = false;
          var res =  googleUser.getBasicProfile();
          this.profile['displayName'] = res.getName();
          this.profile['imageUrl'] = res.getImageUrl();
          this.profile['name'] = res.getName();
          this.profile['email'] = res.getEmail();

          //save mlab
          this.loginService.checkExist(this.profile['email']).then(res => {
            //lần đầu đăng nhập
            if (res == null) {
              this.loginService.login(this.profile).then(res => {
                console.log(res['_id']);
                this.profile['_id'] = res['_id'];
                this.globalVars.setProfile(this.profile);
              });
            } else {
              //đã đăng nhập
              // this.userService.getUser(this.profile['email']).then(res => {
              //   console.log(res['_id']);
              //   this.profile['id'] = res['_id'];
              //   this.globalVars.setProfile(this.profile);
              // });
             this.userService.updateUser(this.profile['email'], this.profile).then(res => {
                this.profile = res;
                this.globalVars.setProfile(this.profile);
              });
            }
          });


          this.globalVars.setLoginStatus(true);
         
          this.router.navigate(['/']);
        });
      },(error) => {
        alert(JSON.stringify(error, undefined, 2));
    });
  }

  sendData() {
    return this.profile;
  }

// if render button
   onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    onFailure(error) {
      console.log(error);
    }
    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
      });
    }
 
}
