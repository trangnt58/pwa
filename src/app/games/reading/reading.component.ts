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
  answerPlayer: String;

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

      this.speak();
      return;
    }
  }

  checkAnswer(item) {
    if (item == null) {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.curWord['_id'] == this.answers[i]['_id']) {
          this.answers[i]['state'] = 'right';
          break;
        }
      }
      return;
    }
    this.clicked = true;
    if (item.id == this.curWord['id']) {
      item['state'] = 'right';
      this.getAnswer(item);
      this.onCorrect.emit(true);
    } else {
      item['state'] = 'wrong';
      //Tìm cái đúng để hiện lên @@
      for (let i = 0; i < this.answers.length; i++) {
        if (this.curWord['_id'] == this.answers[i]['_id']) {
          this.answers[i]['state'] = 'right';
          break;
        }
      }
      this.getAnswer(item);
      this.onCorrect.emit(false);
      
    }

  }

  getAnswer(item) {
    let answer = '';
    if (item == null) {
      answer = null;
    } else {
      answer = item['content'];
    }
    this.userAnswer.emit(answer);
  }

}
