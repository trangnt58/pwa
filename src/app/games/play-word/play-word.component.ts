import { Component, OnInit, ViewChild } from '@angular/core';
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
  providers: [ WordService, HelperService, GameService ],
  animations: [
    trigger('state', [
      state('wrong', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('right',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('wrong => right', animate('100ms ease-in')),
      transition('right => wrong', animate('100ms ease-out'))
    ])
  ]
})
export class PlayWordComponent implements OnInit {
  @ViewChild(WritingComponent) writingComponent;
  @ViewChild(ReadingComponent) readingComponent;
  @ViewChild(GameRequestComponent) gameRequestComponent;

  score: number = 0;
  count: number = 0;
  words: any;
  allWords: any;
  answers: Object[] = [];
  curWord: Object = {};
  max = 3; 
  isEnd: boolean = false;
  typeGame = [ 'reading','writing'];
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

  //Nếu là một yêu cầu từ bạn thì không cần random
  isRequest: boolean = false;
  contentGame = [];
  choices = [];

  constructor( private wordService: WordService, private gameService: GameService,
    private helperService: HelperService, 
    private globalVars: GlobalVarsService ) { }

  ngOnInit() {

    this.wordService.getAllWord().then(res => {
      this.allWords = res;
      this.words = this.helperService.getRandomArrayElements(this.allWords, this.max);
      //this.reload();
    });
    this.globalVars.profile.subscribe(value => {
      if (value['_id'] != undefined) {
        this.profile = value;
      }
    });
  }

  ready() {
    //check nếu người được chọn trùng với người ý yêu cầu;
    // lấy content từ bên server
    // kiểm tra trùng lặp ở bên my request
    //.....
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
        return true;
      }
    }
    return false;
  }

  reload() {
    this.colorProgressbar = 'primary';
    if (this.count == this.max)  {
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
      if (this.contentGame[i]['choice'] != undefined) {
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

  onCorrect(correct: boolean): void {
    if (correct) {
      this.score ++;
      clearInterval(this.interval);
      this.next();
      setTimeout(() => {
        
      }, 1000);
    } else {
      if (this.selectedGame == 'reading') {
        clearInterval(this.interval);
        this.next();
      }

    }
  }

  countDownTimer() {
    this.counter = 100;
    this.interval = setInterval(() => {
      this.counter -=1;
      if ( this.counter >= 30 && this.counter < 50)
        this.colorProgressbar = 'accent';
      if (this.counter < 30) this.colorProgressbar ='warn';

      // Khi hết giờ
      if (this.counter <= 0) {
        if(this.selectedGame == 'writing') {
          this.writingComponent.getAnswer();
          clearInterval(this.interval);
          this.next();
          return;
        }
        if (this.selectedGame == 'reading') {
          console.log(this.counter);
           // hết thời gian mà chưa trả lời thì set câu trả lời = null
          this.readingComponent.getAnswer(null);
          clearInterval(this.interval);
          this.next();
          return;
        }
      }
    }, 80);
  }

  saveGame(item) {
    this.turnGame.push(item);
  }

  userAnswer(userAnswer: Object) {
    this.turnGame.push(userAnswer);
  }


  selectFriend(friend: Object) {
    this.selectedFriend = true;
    this.playerFriend = friend;
   // console.log(friend);
  }


  sendRequestGame() {
    let turn: Object = {};
    turn['from'] = this.profile['_id'];
    turn['to'] = this.playerFriend['_id'];
    turn['game'] = 'word';
    turn['content'] = this.turnGame;
    this.gameService.createGame(turn).then(res => {
      console.log(res);
    });
  }

  request(request: Object) {
    this.isRequest = true;
    this.contentGame = request['content'];
    this.ready();
  }
}