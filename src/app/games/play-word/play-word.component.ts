import { Component, OnInit } from '@angular/core';
import { WordService } from './../../services/word.service'

@Component({
  selector: 'app-play-word',
  templateUrl: './play-word.component.html',
  styleUrls: ['./play-word.component.css'],
  providers: [ WordService ]
})
export class PlayWordComponent implements OnInit {
  count: number = 0;
  words: any;
  allWords: any;
  answers: Object[] = [];
  curWord: Object = {};
  max = 10; 
  isEnd: boolean = false;
  constructor( private wordService: WordService) { }

  ngOnInit() {
    this.wordService.getAllWord().then(res => {
      this.words = res;
      this.allWords = this.words.slice();
      this.reload();

    });
  }

  reloadAns() {
    let NO_OF_ANS = 4;
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
    let position = Math.floor(Math.random() * NO_OF_ANS);

    // Tạo mảng các câu trả lời
    this.answers = [];

    for (let i = 0; i < NO_OF_ANS; i++) {
      let temp;

      if (i == position) {
        temp = JSON.parse(JSON.stringify(this.curWord));
      } else {
        let r = Math.floor(Math.random() * wrongWord.length);
        temp = JSON.parse(JSON.stringify(wrongWord[r]));
        wrongWord.splice(r, 1);
      }

      this.answers.push(temp);
    }
  }

  reload() {
    if (this.count == this.max)  {
      this.isEnd = true;
      return;
    }
    this.count++;
    let random = Math.floor(Math.random() * this.allWords.length);
    this.curWord = this.allWords[random];
    this.reloadAns();
    this.speak();
  }

  speak() {
    var wordAudio = encodeURI(this.curWord['content']);
    var audio = new Audio('http://api.voicerss.org/?key=9162f83042cf475f8231eee77f6ac5e8&hl=en-us&r=-2&src='+ wordAudio);
    audio.play();
  }
  next() {
    this.reload();
  }

  checkAnswer(item: Object) {
    // Xử lý
    if (item['id'] == this.curWord['id']) {
      this.reload();
      item['state'] = 'right';
    } else {
      item['state'] = 'wrong';
    }
  }


  getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

  random() {   
    let numbers = ['1','2','4','5','6','7','8','9','10'];
    alert( this.getRandomArrayElements(numbers, 4) );
  }

}
