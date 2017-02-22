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

}
