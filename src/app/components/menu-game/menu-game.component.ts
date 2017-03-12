import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare const FB: any;

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.css'],
  providers: [ ]
})

export class MenuGameComponent implements OnInit {
  constructor( private router: Router ) { }

  ngOnInit() {
    
  }

  playWord() {
    this.router.navigate(['/playword']);
  }

  playSong() {
    this.router.navigate(['/songpop'])
  }

  toLearn() {
    this.router.navigate(['/learn']);
  }

}
