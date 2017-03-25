import { Component, OnInit, NgZone, ViewChild, HostListener } from '@angular/core';
import { GlobalVarsService } from '../../services/global-vars.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayWordComponent } from '../../games/play-word/play-word.component';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { SocketService } from './../../services/socket.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { GameRequestDialogComponent } from './../../components/game-request-dialog/game-request-dialog.component';
import { PushNotificationsService } from 'angular2-notifications';

declare var gapi: any;

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css'],
  providers: [ LoginService, UserService, SocketService ]
})
export class NavLoginComponent implements OnInit {
  @ViewChild(PlayWordComponent) playWordComponent;
	isLogin: boolean = false;
	profile: Object = {};
	auth2: any;
  showNoti: boolean = false;
  dialogRef: any;
  socket: any;

  constructor (private globalVars: GlobalVarsService, 
    private userService: UserService, private loginService: LoginService, 
    private socketService: SocketService,
    private zone: NgZone, private router: Router,
    public dialog: MdDialog,
    private _push: PushNotificationsService) {
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
        if(this.profile['_id'] != undefined) {
          this.socket = this.socketService.connectSocket(this.profile['_id']);
          this.setGlobal(this.profile, this.socket);
        }
  		});
  	});

    this.globalVars.fullSocket.subscribe(value => {
      if(value != null) {
        this.socket = value['socket'];
        this.socketService.createFriendRequest(this.socket).subscribe(res => {
          //console.log(res);
          this.createPush('Yêu cầu kết bạn', res['fromInfo']['name'] + ' đã gửi yêu cầu kết bạn'); 
        });
      }
    });

  }

  createPush(title, body) {
    if (this._push.permission == 'granted') {
      this._push.create(title, {body: body, icon: 'assets/images/default-avatar.png'}).subscribe(
            res => console.log(res),
            err => console.log(err)
        );
    }
  }

  // //set socket and profile to global
  setGlobal(profile, socket){
    this.globalVars.setSocket(socket);
    var fullSocket = {};
    fullSocket['profile'] = profile;
    fullSocket['socket'] = socket;
    this.globalVars.setFullSocket(fullSocket);
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
                 // console.log(res['_id']);
                  this.profile['_id'] = res['_id'];
                  this.globalVars.setProfile(this.profile);
                });
              } else {
                //đã đăng nhập
                this.userService.updateUser(this.profile['email'], this.profile).then(res => {
                  this.profile = res;
                  this.globalVars.setProfile(this.profile);
                });
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
      if (this.socket != undefined) {
        this.socketService.logout(this.socket,this.profile['_id']);
      }
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

  showNotify() {
    this.showNoti = !this.showNoti;
  }
}
