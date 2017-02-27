import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-game-request',
  templateUrl: './game-request.component.html',
  styleUrls: ['./game-request.component.css'],
  providers: [ GameService ]
})
export class GameRequestComponent implements OnInit {
  @Output() request = new EventEmitter<Object>();
	turns: Object[] = [];

  constructor( private globalVars: GlobalVarsService,
  	private gameService: GameService,
  	private zone: NgZone ) {
  		this.globalVars.profile.subscribe(value => {
        if (value['_id'] != undefined) {
          this.gameService.getRequestGame(value['_id']).then(res => {
            this.turns = res;
          });
        }
    });
  }

  ngOnInit() {
  }

  getTurns() {
    return this.turns;
  }

  begin(item) {
    this.request.emit(item);
  }

  ignore(item) {
    this.gameService.deleteGame(item['_id']).then(res => {
      console.log(res);
      var index = this.turns.indexOf(item);
      if (index >= 0) this.turns.splice(index, 1);
    });
    //hủy yêu cầu, ko chơi;
  }

}
