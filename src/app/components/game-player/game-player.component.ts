import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.css']
})
export class GamePlayerComponent implements OnInit {

	@Input() from: Object;
	@Input() to: Object;
	count: number;
	interval: any;
	isReady: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.from = null;
    this.to = null;
  }

}
