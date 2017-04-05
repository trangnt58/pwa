import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CoolLocalStorage } from 'angular2-cool-storage';

declare const FB: any;

@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.css'],
  providers: [ LoginService ]
})
export class LoginFacebookComponent implements OnInit {
  profile: Object = {};
  localStorage: CoolLocalStorage;
  constructor( private globalVars: GlobalVarsService, private router: Router,
    private loginService: LoginService,
    localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
    FB.init({
      appId      : '1848098138804243',
      xfbml      : true,
      cookie    : true,
      version    : 'v2.8'
    });
  }

  ngOnInit() {
    
  }

  loginFB() {
    FB.login((result: any) => {
      this.getInfoUser();
    }, { scope: 'email' });
  }

  getInfoUser() {
    FB.api('me?fields=id,name,email,picture', (res) => {
      if (res != null) {
        this.profile['name'] = res.name;
        this.profile['imageUrl'] = res.picture.data.url;
        this.profile['email'] = res.email;
        this.profile['method'] = 'facebook';
        //save on mlab
        this.createUser();    
      }     
    });
  }

  statusChangeCallback(res) {
    if (res.status === 'connected') {
      this.getInfoUser();      
    } else if (res.status === 'not_authorized') {
        
    }else {
        
    }
  };

  createUser() {
    this.loginService.updateInfo(this.profile['email'], 'facebook', this.profile).then(res => {
      this.profile = res;
      this.globalVars.setProfile(this.profile);
      this.globalVars.setLoginStatus(true);
      this.localStorage.setItem('login', 'facebook');
      this.router.navigate(['/menugame']);
    });
  }
}
