import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GameService } from './../../services/game.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css'],
  providers: [ GameService ]
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
  constructor( private gameService: GameService, private router: Router, 
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.content = this.turnGame['contentGame'];
    this.fromAns = this.turnGame['fromAns'];
    this.toAns = this.turnGame['toAns'];
    
    if (this.isReceiver) {
      this.saveGame();
    }
  }

  compare(str1, str2) {
  	if (str1 == null || str2 == null) return false;
    return str1.trim().toLowerCase() == str2.trim().toLowerCase();
  }

  saveGame() {
    
    var turn: Object = {
        "from": {
          "id": "",
          "score": 0
        },
        "to": {
          "id": "",
          "score": 0
        }
    };
    turn['from']['id'] = this.from['_id'];
    turn['to']['id'] = this.to['_id'];
    turn['played'] = true;
    turn['from']['score'] = this.from['score'];
    turn['to']['score'] = this.to['score'];
    this.gameService.createGame(turn).then(res => {
      console.log('success');
      //console.log(res);
    });
  }

  // sendRequestGame() {
  //   if (!this.isRequest) {
  //     this.gameService.createGame(this.turnGame).then(res => {
  //       this.openSnackBar('Send request success!');
  //       this.isSend = true;
  //       //this.router.navigate(['/playword']);
  //     });
  //   } else {
  //     console.log(this.turnGame);
  //     this.gameService.updateGame(this.turnGame['_id'], this.turnGame).then(res => {
  //       this.openSnackBar('Save success!');
  //       this.isSend = true;
  //       //this.router.navigate(['/playword']);
  //     });
  //   }
  // }

  // openSnackBar(message) {
  //   this.snackBar.open(message,'', {
  //     duration: 3000,
  //   });
  // }

  goPlayWord() {
    this.goBack.emit(true);
  }

}

