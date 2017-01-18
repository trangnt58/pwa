import { Component, OnInit } from '@angular/core';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  loginFB() {
    FB.login((result: any) => {
    console.log(result);
  }, { scope: 'user_friends' });
  }
}
