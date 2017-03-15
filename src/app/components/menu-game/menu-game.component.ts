import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SocketService } from './../../services/socket.service';


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
  constructor( private router: Router, private socketService: SocketService ) { }

  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    })
    
  }
  ngDestroy() {
    this.connection.unsubscribe();
  }

  playWord() {
    this.router.navigate(['/playword']);
  }

  playSong() {
    this.router.navigate(['/songpop'])
  }

  toLearn() {
    this.router.navigate(['/learn']);
  }

  sendRealtime(){
    this.socketService.sendMessage("aaaa");
  }

   

}
