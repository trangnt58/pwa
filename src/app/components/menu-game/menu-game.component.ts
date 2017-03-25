import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalVarsService } from './../../services/global-vars.service';
import { SocketService } from './../../services/socket.service';
import { MdSnackBar } from '@angular/material';
import { PushNotificationsService } from 'angular2-notifications';

declare const FB: any;

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.css'],
  providers: [ SocketService ]
})

export class MenuGameComponent implements OnInit {
  connection: any;
  messages: Object[] = [];
  isLogin: boolean = false;
  constructor( private router: Router, 
    public snackBar: MdSnackBar,
    private globalVars: GlobalVarsService, private socketService: SocketService, 
    private _push: PushNotificationsService ) { }

  ngOnInit() {
    this.globalVars.profile.subscribe(value => {
      if(value['_id'] != undefined) {
        this.isLogin = true;
      }
    });
    // this._push.create('Test', {body: 'something'}).subscribe(
    //         res => console.log(res),
    //         err => console.log(err)
    //     )
    
    // if (this._push.permission == 'granted') {
    //   this._push.create('Test', {body: 'something'}).subscribe(
    //         res => console.log(res),
    //         err => console.log(err)
    //     );
    // } else {
    //   this._push.requestPermission();
    // }
    
  
  
    // this.connection = this.socketService.getMessages().subscribe(message => {
    //   console.log(message);
    //   this.messages.push(message);
    // })
    
  }
  ngDestroy() {
    this.connection.unsubscribe();
  }

  playWord() {
    if(!this.isLogin) {
      this.openSnackBar('You must log in to play this game.');
      return;
    }
    this.router.navigate(['/playword']);
  }

  playSong() {
    this.router.navigate(['/songpop'])
  }

  toLearn() {
    this.router.navigate(['/learn']);
  }

  openSnackBar(message) {
    this.snackBar.open(message,'', {
      duration: 2000,
    });
  }
}
