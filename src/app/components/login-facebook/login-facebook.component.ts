import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare const FB: any;

@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.css']
})
export class LoginFacebookComponent implements OnInit {
  profile: Object = {};
  constructor( private globalVars: GlobalVarsService, private router: Router) {
     FB.init({
      appId      : '1848098138804243',
      xfbml      : true,
      cookie    : true,
      version    : 'v2.8'
    });
  }

  ngOnInit() {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

  loginFB() {
    FB.login((result: any) => {
      console.log(result);
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
        this.globalVars.setProfile(this.profile);
        this.globalVars.setLoginStatus(true);
        this.router.navigate(['/menugame']);
        //console.log(res);
        // 
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


  logout() {
    FB.logout(function(response) {
      console.log(response);
    });
  }

}
