import { Component, OnInit, Input } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-waiting-game',
  templateUrl: './waiting-game.component.html',
  styleUrls: ['./waiting-game.component.css']
})
export class WaitingGameComponent implements OnInit {
	@Input() from: Object;
	@Input() to: Object;
	count: number;
	interval: any;
	isReady: boolean = false;

  constructor( public dialogRef: MdDialogRef<WaitingGameComponent> ) { }

  ngOnInit() {
  	this.count = 3;
  	this.interval = setInterval(() => {
  		this.count -=1;
  		if (this.count == 0) {
  			this.ready();
  		}  
    }, 1000);
  }

  ready() {
  	this.isReady = true;
  	clearInterval(this.interval);
  	this.dialogRef.close(this.isReady);
  }

  cancel() {
  	clearInterval(this.interval);
  	this.dialogRef.close(this.isReady);
  }

}
