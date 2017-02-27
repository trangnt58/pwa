import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css']
})
export class MyAnswerComponent implements OnInit {

	@Input() turnGame: Object[];
  constructor() { }

  ngOnInit() {
  	console.log(this.turnGame);
  }

  compare(str1, str2) {
  	if (str1 == null || str2 == null) return false;
    return str1.trim().toLowerCase() == str2.trim().toLowerCase();
  }

}
