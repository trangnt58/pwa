import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { WaitingGameComponent } from './../../components/waiting-game/waiting-game.component';
import { GameRequestDialogComponent } from './../../components/game-request-dialog/game-request-dialog.component';

import { WritingComponent } from './../../games/writing/writing.component';
import { ReadingComponent } from './../../games/reading/reading.component';
import { GameRequestComponent } from './../../components/game-request/game-request.component';
import { WordService } from './../../services/word.service';
import { HelperService} from './../../services/helper.service';
import { GlobalVarsService } from './../../services/global-vars.service';
import { GameService } from './../../services/game.service';
import { SocketService } from './../../services/socket.service';

@Component({
  selector: 'app-play-word',
  templateUrl: './play-word.component.html',
  styleUrls: ['./play-word.component.css'],
  providers: [ WordService, HelperService, GameService, SocketService ]
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

  socket: any;
  dialogRef: any;
  onlineGame: boolean = false;
  isReceiver: boolean = false;
  playerSocketId: String;

  constructor( private wordService: WordService, private gameService: GameService,
    private socketService: SocketService,
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

    this.globalVars.fullSocket.subscribe(value => {
      if(value != null) {
        this.socket = value['socket'];
        let idUser = value['profile']['_id'];
        this.socketService.receiveRequestSocket(this.socket, idUser).subscribe(res => {
          this.openDialogReceiveRequest(res['from'],res['fromSocketId']);
          this.isReceiver = true;
          //this.playerSocketId = res['fromSocketId'];
        });

        this.socketService.beginGame(this.socket).subscribe(res => {
          if(res['agree'] == true) {
            this.playerSocketId = res['playerSocketId'];
            this.from = res['from'];
            this.to = res['to'];
            this.onlineGame = true;
            this.contentGame = res['content'];
            this.closeAllDialog();
            this.ready();
          }
        });

        this.socketService.receiveAnsFriend(this.socket).subscribe(res => {
          if(res['correct'] == true) {
            if(!this.isReceiver) {
              this.to['score']++;
            } else {
              this.from['score']++;
            }
          }
        })
      }
    });
  }

  closeAllDialog() {
    this.dialogRef.close();
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

    this.dialogRef = this.dialog.open(WaitingGameComponent, config );
    let instance = this.dialogRef.componentInstance;
    instance.from = this.from;
    instance.to = this.to;
    instance.isOnline = true;
    
    this.dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        //this.ready();
      }
    });
  }

  openDialogReceiveRequest(fromUser, fromSocketId) {
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

    this.dialogRef = this.dialog.open(GameRequestDialogComponent, config );
    let instance = this.dialogRef.componentInstance;
    instance.from = fromUser;
    instance.fromSocketId = fromSocketId;
    this.dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        //this.ready();
      }
    });

  }
  

  ready() {
    if (this.onlineGame) {
      this.isReady = true;
      this.reload();
      return;
    }

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
    if(!this.isRequest && !this.onlineGame) {
      this.random();
      this.choices = null;
      this.countDownTimer();
    }
    
    if (this.isRequest || this.onlineGame) {
      let i = this.count - 1;
      this.curWord = this.contentGame[i]['word'];
      if (this.contentGame[i]['type'] == 'reading' && this.contentGame[i]['choices'] != undefined) {
        this.choices = this.contentGame[i]['choices'];
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
    if (this.onlineGame) {
      if(correct) {
        let data = {};
        data['correct'] = true;
        data['playerSocketId'] = this.playerSocketId;
        this.socketService.sendAns(this.socket, data);
        this.createScore();
      return;
      }else {
        return;
      }
    }

    //game offline, đúng thì thoát nhanh;
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
    if (this.onlineGame) {
      if(this.isReceiver) {
        this.to['score']++;
      } else {
        this.from['score']++;
      }
      return;
    }
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
        clearInterval(this.interval);
      
        if (this.onlineGame) {
          this.refresh();
          return;
        }
        
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

  sendRequestSocket(){
    let requestSocket = {};
    requestSocket['fromId'] = this.from['_id'];
    requestSocket['from'] = this.from;
    requestSocket['toId'] = this.to['_id'];
    requestSocket['toSocketId'] = this.to['socketId'];
    this.socketService.sendRequest(this.socket, requestSocket);
    this.openDialog();

    this.socketService.waitAccept(this.socket).subscribe(res => {
        console.log(res);
    });
  }
}
