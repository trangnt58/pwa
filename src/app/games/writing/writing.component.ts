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
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    this.answer = '';
  }

  checkAnswer() {
  	if (this.compare(this.answer,this.curWord['content'])) {
      this.onCorrect.emit(true);
      this.getAnswer();
  	} else {
      this.onCorrect.emit(false);
      //this.getAnswer();
    }
  }

  onKey(event: any) { // without type info
    this.checkAnswer();
  }

  compare(str1, str2) {
    return str1.trim().toLowerCase() == str2.trim().toLowerCase();
  }

  getAnswer() {
    let result = {};
    result = this.curWord;
    result['answer'] = this.answer;
    result['type'] = 'writing';
    this.userAnswer.emit(result);
  }

}
