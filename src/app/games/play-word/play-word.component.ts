import { Component, OnInit, ViewChild } from '@angular/core';
import { WritingComponent } from './../../games/writing/writing.component';
import { ReadingComponent } from './../../games/reading/reading.component';
import { WordService } from './../../services/word.service';
import { HelperService} from './../../services/helper.service'
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
  providers: [ WordService, HelperService ],
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

  score: number = 0;
  count: number = 0;
  words: any;
  allWords: any;
  answers: Object[] = [];
  curWord: Object = {};
  max = 5; 
  isEnd: boolean = false;
  typeGame = [ 'reading','writing'];
  counter: number = 100;
  selectedGame: string;
  interval: any;
  colorProgressbar = 'primary';
  //Lưu câu trả lời
  turnGame = [];
  constructor( private wordService: WordService, private helperService: HelperService ) { }

  ngOnInit() {
    this.wordService.getAllWord().then(res => {
      this.allWords = res;
      this.words = this.helperService.getRandomArrayElements(this.allWords, this.max);
      this.reload();
    });
  }

  reload() {
    this.colorProgressbar = 'primary';
    if (this.count == this.max)  {
      this.isEnd = true;
      return;
    }
    this.count++;
    
    // Chọn từ ngẫu nhiên
    let i = this.helperService.random(this.words.length);
    this.curWord = this.words[i];

    // Chọn game ngẫu nhiên
    let j = this.helperService.random(this.typeGame.length);
    this.selectedGame = this.typeGame[j];
    this.countDownTimer();
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

  getTurnGame() {
    console.log(this.turnGame);
  }
}