import { Component, OnInit } from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';
import { SocketService } from './../../services/socket.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [ SocketService ]
})
export class HistoryComponent implements OnInit {
	socket: any;
	profile: Object;
  constructor(private socketService: SocketService, private globalVars: GlobalVarsService) { }

  ngOnInit() {
  	this.globalVars.fullSocket.subscribe(value => {
      if(value != null) {
        this.socket = value['socket'];
        this.profile = value['profile'];
        this.socketService.getHistory(this.socket, this.profile['_id']);
      }
    });
  }

}
