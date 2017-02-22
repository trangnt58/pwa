import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { HelperService} from './../../services/helper.service'

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css'],
  providers: [ HelperService ]
})
export class ReadingComponent implements OnInit {
  @Output() onCorrect = new EventEmitter<boolean>();
  @Output() userAnswer = new EventEmitter<Object>();
	@Input() curWord: Object;
	@Input() allWords: Object[] = [];
	answers: Object[] = [];

  clicked: boolean = false;
  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

  speak() {
  	this.helperService.speak(this.curWord['content']);
  }

  ngOnChanges(changes:{[propKey: string]: SimpleChange}) {
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
    this.clicked = true;
    if (item.id == this.curWord['id']) {
      console.log('đúng');
      this.onCorrect.emit(true);
      this.getAnswer(item);
    } else {
      console.log('sai');
      this.onCorrect.emit(false);
      this.getAnswer(item);
    }

  }

  getAnswer(item) {
    let result = {};
    result = this.curWord;
    result['choice'] = this.answers;
    if ( item == null) {
      result['answer'] = null;
    } else {
      result['answer'] = item['content'];
    }
    
    result['type'] = 'reading';
    this.userAnswer.emit(result);
  }

}
