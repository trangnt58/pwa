import { Component, OnInit } from '@angular/core';
import { WordService } from './../../services/word.service';
import { HelperService} from './../../services/helper.service';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { WordDialogComponent } from './../../components/word-dialog/word-dialog.component';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css'],
  providers: [ WordService, HelperService ]
})
export class LearningComponent implements OnInit {
	words: Object[] = [];
  curWord: Object = {};
  disableNext: boolean = false;
  disablePre: boolean = false;

  constructor( private wordService: WordService, private helperService: HelperService,
  	public dialog: MdDialog ) {

  }

  speak() {
    this.helperService.speak(this.curWord['content']);
  }

  ngOnInit() {
 		this.wordService.getAllWord().then( res => {
 			this.words = res;
      this.curWord = this.words[0];
      this.checkDisable();
 		})
  }

  checkDisable() {
    let index: number;
    index = this.words.indexOf(this.curWord);
    length = this.words.length;
    if(index == 0) {
      this.disablePre = true;
    }
    if(index == length - 1) {
      this.disableNext = true;
    }
    if(index > 0 && index < length - 1) {
      this.disableNext = false;
      this.disablePre = false;
    }
  }

  next() {
    let index: number;
    index = this.words.indexOf(this.curWord);
    length = this.words.length;
    if (index == length - 1) {
      this.disableNext = true;
    } else {
      index = index + 1;
      this.curWord = this.words[index];
      this.checkDisable();
    }
    this.speak();
    
  }

  

  previous() {
    let index: number;
    index = this.words.indexOf(this.curWord);
    length = this.words.length;
    if (index == 0) {
      this.disablePre = true;
    } else {
      index = index - 1;
      this.curWord = this.words[index--];
      this.checkDisable();
    }
    this.speak();
  }

  openDialog(item) {
    let config: MdDialogConfig = {
      disableClose: false,
      width: '50%',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    };

    let dialogRef = this.dialog.open(WordDialogComponent, config );
    let instance = dialogRef.componentInstance;
   	instance.word = item;
    
    dialogRef.afterClosed().subscribe(result => {});
  }

  changeWord(item) {
    this.curWord = item;
    this.checkDisable();
  }

}
