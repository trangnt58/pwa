import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { WaitingGameComponent } from './../../components/waiting-game/waiting-game.component';
import { WritingComponent } from './../../games/writing/writing.component';
import { ReadingComponent } from './../../games/reading/reading.component';
import { GameRequestComponent } from './../../components/game-request/game-request.component';
import { WordService } from './../../services/word.service';
import { HelperService} from './../../services/helper.service';
import { GlobalVarsService } from './../../services/global-vars.service';
import { GameService } from './../../services/game.service';


import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'app-play-word',
  templateUrl: './play-word.component.html',
  styleUrls: ['./play-word.component.css'],
  providers: [ WordService, HelperService, GameService ]
})
export class PlayWordComponent implements OnInit {
  @ViewChild(WritingComponent) writingComponent;
  @ViewChild(ReadingComponent) readingComponent;
  @ViewChild(GameRequestComponent) gameRequestComponent;

  score: number = 0;
  percent: number = 0;
  count: number = 0;
  words: any;
  allWords: any;
  answers: Object[] = [];
  curWord: Object = {};
  max = 5; 
  isEnd: boolean = false;
  typeGame = ['reading', 'writing'];
  counter: number = 100;
  selectedGame: string;
  interval: any;
  colorProgressbar = 'primary';

  isReady: boolean = false;
  selectedFriend: boolean = false;
  playerFriend: Object = {};
  profile: Object = {};
  //Lưu câu trả lời
  turnGame = [];
  allQuestions = [];

  //Nếu là một yêu cầu từ bạn thì không cần random
  isRequest: boolean = false;
  contentGame = [];
  choices = [];

  //players
  from: Object = {};
  to: Object;

  turn: Object = {
      "from": {
        "id": {
        }
      },
      "to": {
        "id": {
        }
      }
  };

  constructor( private wordService: WordService, private gameService: GameService,
    private helperService: HelperService, 
    private globalVars: GlobalVarsService,
    public dialog: MdDialog ) { }

  ngOnInit() {
    this.wordService.getAllWord().then(res => {
      this.allWords = res;
      this.words = this.helperService.getRandomArrayElements(this.allWords, this.max);
    });

    this.globalVars.profile.subscribe(value => {
      if (value['_id'] != undefined) {
        this.profile = value;
        this.from = this.profile;
        this.from['score'] = 0;
      }
    });
  }

  openDialog() {
      let config: MdDialogConfig = {
        disableClose: true,
        width: '50%',
        height: '',
        position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
        }
      };

      let dialogRef = this.dialog.open(WaitingGameComponent, config );
      let instance = dialogRef.componentInstance;
      instance.from = this.from;
      instance.to = this.to;
      
      dialogRef.afterClosed().subscribe(result => {
        //this.selectedOption = result;
        if(result == true) {
          this.ready();
        }
      });
    }
  

  ready() {
    //check nếu người được chọn trùng với người ý yêu cầu
    if(!this.check()) {
      this.isReady = true;
      this.reload();
    } else {
      this.isReady = true;
      this.isRequest = true;
      this.reload();
    }
    
  }

  check() {
    let allTurns = [];
    allTurns = this.gameRequestComponent.getTurns();
    for (let i = 0; i < allTurns.length; i++) {
      if (allTurns[i]['from']['_id'] == this.playerFriend['_id']) {
        this.contentGame = allTurns[i]['content'];
        this.max = allTurns[i]['content'].length;
        return true;
      }
    }
    return false;
  }

  reload() {
    this.colorProgressbar = 'primary';
    if (this.count == this.max)  {
      this.doneGame();
      this.isEnd = true;      
      return;
    }
    this.count++;

    //Nếu không phải là một yêu cầu có sẵn thì tiến hành random;
    if(!this.isRequest) {
      this.random();
      this.choices = null;
      this.countDownTimer();
    }
    
    if (this.isRequest) {
      let i = this.count - 1;
      this.curWord = this.contentGame[i];
      if (this.contentGame[i]['type'] == 'reading' && this.contentGame[i]['choice'] != undefined) {
        this.choices = this.contentGame[i]['choice'];
      }
      this.selectedGame = this.contentGame[i]['type'];
      this.countDownTimer();
    }

  }

  random() {
    // Chọn từ ngẫu nhiên
    let i = this.helperService.random(this.words.length);
    this.curWord = this.words[i];

    // Chọn game ngẫu nhiên
    let j = this.helperService.random(this.typeGame.length);
    this.selectedGame = this.typeGame[j];
  }

  next() {
    if (this.count == this.max) {
      this.doneGame();
      this.isEnd = true;
      return;
    }
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i]['id'] == this.curWord['id']) {
        this.words.splice(i, 1);
        break;
      }
    }
    clearInterval(this.interval);
    this.reload();
  }

  refresh() {
    clearInterval(this.interval);
    setTimeout(() => {
      this.next();
    }, 1000);
  }

  onCorrect(correct: boolean): void {
    if (correct) {
      this.createScore();
      this.refresh();
    } else {
      if (this.selectedGame == 'reading') {
        clearInterval(this.interval);
        this.refresh();
      }
    }
  }

  createScore() {
    this.score++;
    this.percent = this.score*100/this.max;
    if(!this.isRequest) {
      this.from['score']++;
    } else {
      this.to['score']++;
    }
  }


  countDownTimer() {
    this.counter = 100;
    this.interval = setInterval(() => {
      this.counter -= 1;
      if ( this.counter >= 30 && this.counter < 50)
        this.colorProgressbar = 'accent';
      if (this.counter < 30) this.colorProgressbar ='warn';

      // Khi hết giờ
      if (this.counter <= 0) {
        if(this.selectedGame == 'writing') {
          this.writingComponent.showAnswer = true;
          this.writingComponent.getAnswer();
          this.refresh();
          return;
        }
        if (this.selectedGame == 'reading') {
           // hết thời gian mà chưa trả lời thì set câu trả lời = null
          this.readingComponent.getAnswer(null);
          this.readingComponent.checkAnswer(null);
          this.refresh();
          return;
        }
      }
    }, 80);
  }

  saveGame(item) {
    this.turnGame.push(item);
  }

  saveQuestion(question: Object) {
    this.allQuestions.push(question);
  }

  userAnswer(userAnswer: String) {
    this.answers.push(userAnswer);
  }

  doneGame() {
    //user khởi đầu game
    if (!this.isRequest) {   
      this.turn['from']['id']= this.profile['_id'];
      this.turn['from']['score'] = this.score;
      this.turn['to']['id'] = this.playerFriend['_id'];
      this.turn['game'] = 'word';
      this.turn['content'] = this.allQuestions;
      this.turn['fromAns'] = this.answers;
    //game là từ người khác yêu cầu
    } else {
      this.turn['toAns'] = this.answers;
      this.turn['to']['score'] = this.score;
    }
    
  }

  selectFriend(friend: Object) {
    this.selectedFriend = true;
    this.playerFriend = friend;
    this.to = friend;
    this.to['score'] = 0;
  }

  sendRequestGame() {
    if (!this.isRequest) {
      this.gameService.createGame(this.turn).then(res => {
        console.log(res);
      });
    } else {
      //update Game
    }
  }

  request(request: Object) {
    this.isRequest = true;
    this.turn = request;
    this.contentGame = request['content'];
    this.from = request['from']['id'];
    this.from['score'] = request['from']['score'];
    this.to = request['to']['id'];
    this.to['score'] = 0;
    this.openDialog();
  }
}
