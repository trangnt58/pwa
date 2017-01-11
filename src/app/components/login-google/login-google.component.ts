import { Component, NgZone, OnInit } from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})

export class LoginGoogleComponent implements OnInit {
   isLogin: boolean = false;
  profile: Object = {};
  auth2: any;
  isLogout: boolean = false;
  
  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.start();
    //this.renderButton();
  }

  start() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '736288713251-26srbi81jha5n1aithe4av668oh5pn12.apps.googleusercontent.com'
        //scope: 'https://www.googleapis.com/auth/drive'
      });

      this.auth2.then(() => {
        console.log(this.auth2);
        var isSignedIn = this.auth2.isSignedIn.get();
        var googleUser = this.auth2.currentUser.get();
        
          if (isSignedIn) {
            console.log('da login');
         this.isLogin = true;
         var res =  googleUser.getBasicProfile();
            this.profile['displayName'] = res.getName();
            this.profile['imageUrl'] = res.getImageUrl();
          } else {
            console.log('not login');
            this.attachSignin(document.getElementById('customBtn'));
             
          }
      });

     });
  }

  attachSignin(element) {
    console.log('aaa')
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.zone.run(() => {
          this.isLogin = true;
          this.isLogout = false;
          var res =  googleUser.getBasicProfile();
          this.profile['displayName'] = res.getName();
          this.profile['imageUrl'] = res.getImageUrl();
          console.log(this.profile);
        });
      },(error) => {
        alert(JSON.stringify(error, undefined, 2));
    });
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
