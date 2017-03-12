import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css']
})
export class MyAnswerComponent implements OnInit {

	@Input() turnGame: Object;
  @Input() from: Object;
  @Input() to: Object;
  content: Object[];
  fromAns = [];
  toAns = [];
  constructor() { }

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

}
