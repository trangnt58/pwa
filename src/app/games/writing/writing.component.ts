import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {
  @Output() onCorrect = new EventEmitter<boolean>();
  @Output() userAnswer = new EventEmitter<Object>();
	@Input() curWord: Object;
	answer: String = '';
  showAnswer: boolean = false;
  gotAnswer: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.answer = '';
    this.showAnswer = false;
    this.gotAnswer = false;
  }

  checkAnswer() {
  	if (this.compare(this.answer,this.curWord['content'])) {
      this.onCorrect.emit(true);
      //this.gotAnswer = true;
      this.getAnswer();
  	} else {
      this.onCorrect.emit(false);
      //this.getAnswer();
    }
  }

  onKey(event: any) { 
    // Check câu trả lời khi chưa đưa ra đc đáp án đúng
    if (this.gotAnswer == false) {
      this.checkAnswer();
    }
  }

  compare(str1, str2) {
    return str1.trim().toLowerCase() == str2.trim().toLowerCase();
  }

  getAnswer() {
    this.gotAnswer = true;

    // let question = {};
    // question = this.curWord;
    // question['type'] = 'writing';
    // this.saveQuestion.emit(question);

    let answer = this.answer;
    this.userAnswer.emit(answer);
  }

}
