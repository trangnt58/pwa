import { Component, OnInit, Input } from '@angular/core';
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

	@Input() turnGame: Object;
  @Input() from: Object;
  @Input() to: Object;
  @Input() isRequest: boolean;
  content: Object[];
  fromAns = [];
  toAns = [];
  isSend: boolean = false;
  constructor( private gameService: GameService, private router: Router, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.content = this.turnGame['content'];
    this.fromAns = this.turnGame['fromAns'];
    this.toAns = this.turnGame['toAns'];
    //console.log(this.)
  }

  compare(str1, str2) {
  	if (str1 == null || str2 == null) return false;
    return str1.trim().toLowerCase() == str2.trim().toLowerCase();
  }

  sendRequestGame() {
    if (!this.isRequest) {
      this.gameService.createGame(this.turnGame).then(res => {
        this.openSnackBar('Send request success!');
        this.isSend = true;
        //this.router.navigate(['/playword']);
      });
    } else {
      console.log(this.turnGame);
      this.gameService.updateGame(this.turnGame['_id'], this.turnGame).then(res => {
        this.openSnackBar('Save success!');
        this.isSend = true;
        //this.router.navigate(['/playword']);
      });
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message,'', {
      duration: 3000,
    });
  }

}

