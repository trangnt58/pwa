import { Component, OnInit, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { HelperService} from './../../services/helper.service';
import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css'],
  providers: [ HelperService ],
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
export class ReadingComponent implements OnInit {
  @Output() onCorrect = new EventEmitter<boolean>();
  @Output() userAnswer = new EventEmitter<Object>();
  @Output() saveQuestion = new EventEmitter<Object>();
	@Input() curWord: Object;
	@Input() allWords: Object[] = [];
  @Input() choices: Object[];
	answers: Object[] = [];

  clicked: boolean = false;
  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

  speak() {
  	this.helperService.speak(this.curWord['content']);
  }

  ngOnChanges(changes:{[propKey: string]: SimpleChange}) {
    if (this.choices != null) {
      this.clicked = false;
      this.answers = this.choices;
      for (let i = 0; i < this.answers.length; i++) {
        this.answers[i]['state'] = null;
      }
      return;
    }

    
    //Random
    let NO_OF_ANS = 4;
    this.clicked = false;
    if (this.allWords.length < NO_OF_ANS) {
      NO_OF_ANS = this.allWords.length;
    }

    // Tạo mảng các từ sai
    let wrongWord = [];
    for (let i = 0; i < this.allWords.length; i++) {
      if (this.curWord['id'] != this.allWords[i]['id']) {
        wrongWord.push(this.allWords[i]);
      }
    }

    // Random vị trí từ đúng
    let position = this.helperService.random(NO_OF_ANS);

    // Tạo mảng các câu trả lời
    this.answers = [];

    for (let i = 0; i < NO_OF_ANS; i++) {
      let temp;

      if (i == position) {
        temp = JSON.parse(JSON.stringify(this.curWord));
      } else {
        let r = this.helperService.random(wrongWord.length);
        temp = JSON.parse(JSON.stringify(wrongWord[r]));
        wrongWord.splice(r, 1);
      }

      this.answers.push(temp);
    }


    this.speak();
  }

  checkAnswer(item) {
    if (item == null) {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.curWord['id'] == this.answers[i]['id']) {
          this.answers[i]['state'] = 'right';
          break;
        }
      }
      return;
    }
    this.clicked = true;
    if (item.id == this.curWord['id']) {
      item['state'] = 'right';
      this.onCorrect.emit(true);
      this.getAnswer(item);
     
    } else {
      item['state'] = 'wrong';
      //Tìm cái đúng để hiện lên @@
      for (let i = 0; i < this.answers.length; i++) {
        if (this.curWord['id'] == this.answers[i]['id']) {
          this.answers[i]['state'] = 'right';
          break;
        }
      }
      this.onCorrect.emit(false);
      this.getAnswer(item);
    }

  }

  getAnswer(item) {
    let question = {};
    question = this.curWord;
    question['choice'] = this.answers;
    question['type'] = 'reading';
    question['state'] == null;
    this.saveQuestion.emit(question);

    let answer = '';
    if ( item == null) {
      answer = null;
    } else {
      answer = item['content'];
    }
    this.userAnswer.emit(answer);
  }

}
