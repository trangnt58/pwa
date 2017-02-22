import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  constructor() { }

  random(range): number {
    return Math.floor(Math.random() * range);
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

  speak(content) {
    var wordAudio = encodeURI(content);
    var audio = new Audio('http://api.voicerss.org/?key=9162f83042cf475f8231eee77f6ac5e8&hl=en-us&r=-2&src='+ wordAudio);
    audio.play();
  }
  
}
