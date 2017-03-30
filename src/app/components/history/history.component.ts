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
  history: Object[] = [];
  constructor(private socketService: SocketService, private globalVars: GlobalVarsService) { }

  ngOnInit() {
  	this.globalVars.fullSocket.subscribe(value => {

      if(value != null) {
        this.socket = value['socket'];
        this.profile = value['profile'];
        var data = {};
        data['userId'] = this.profile['_id'];
        this.socketService.sendListenEventArr(this.socket, 'history', 'history-response', data).subscribe(
          res =>{
            this.history = res;
          });
      }
    });
  }

}
