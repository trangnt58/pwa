import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare const FB: any;

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.css']
})

export class MenuGameComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  playWord() {
    console.log('playWord');
    this.router.navigate(['/playword']);
  }

  playSong() {
    this.router.navigate(['/songpop'])
  }

}
