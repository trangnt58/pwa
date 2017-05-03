import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { GlobalVarsService } from './../../services/global-vars.service';
import { SocketService } from './../../services/socket.service';

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css'],
  providers: [ SocketService ]
})
export class MyAnswerComponent implements OnInit {
  @Output() goBack = new EventEmitter<boolean>();
	@Input() turnGame: Object;
  @Input() from: Object;
  @Input() to: Object;
  @Input() isRequest: boolean;
  @Input() isOnline: boolean;
  @Input() isReceiver: boolean;
  content: Object[];
  fromAns = [];
  toAns = [];
  isSend: boolean = false;
  socket: any;
  constructor( private router: Router, 
    private globalVars: GlobalVarsService, 
    private socketService: SocketService,) { }

  ngOnInit() {
    this.content = this.turnGame['contentGame'];
    this.fromAns = this.turnGame['fromAns'];
    this.toAns = this.turnGame['toAns'];
   
    this.globalVars.fullSocket.subscribe(res => {
      if(res != null) {
        this.socket = res['socket'];
         if (this.isReceiver) {
          this.saveGame();
        }
      }
    })
  }

  compare(str1, str2) {
  	if (str1 == null || str2 == null) return false;
    return str1.trim().toLowerCase() == str2.trim().toLowerCase();
  }

  saveGame() {
    var history: Object = {
      "player1": {
        "id": this.from['_id'],
        "win": 0
      },
      "player2": {
        "id": this.to['_id'],
        "win": 0
      }
    }

    if (this.from['score'] > this.to['score']) {
      history['player1']['win'] = 1;
    }
    if(this.from['score'] < this.to['score']){
      history['player2']['win'] = 1;
    }
    if(this.socket != null) {
      this.socketService.sendEvent(this.socket, 'save-history', history);
    }

  }

  goPlayWord() {
    this.goBack.emit(true);
  }

}

