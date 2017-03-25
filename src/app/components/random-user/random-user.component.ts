import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalVarsService } from './../../services/global-vars.service';
import { SocketService } from './../../services/socket.service';

@Component({
  selector: 'app-random-user',
  templateUrl: './random-user.component.html',
  styleUrls: ['./random-user.component.css'],
  providers: [ SocketService ]
})
export class RandomUserComponent implements OnInit {
  @Output() toUser = new EventEmitter<Object>();

	socket: any;
	idUser: any;
	randomUser: Object;
  numOfOnline: number = 1;
  constructor(private socketService: SocketService,
    private globalVars: GlobalVarsService,) { }

  ngOnInit() {
  	this.globalVars.fullSocket.subscribe(value => {
    	if (value != null) {
    		this.socket = value['socket'];
    		this.idUser = value['profile']['_id'];
    		this.socketService.receiveRandomUser(this.socket).subscribe(res => {
    			this.randomUser = res;

    		});
        this.socketService.getNumOfOnline(this.socket).subscribe(res => {
          if(res != null) this.numOfOnline = Number(res);
        });
    	}
    });
  }

  random() {
  	this.socketService.randomUser(this.socket, this.idUser);
  }

  sendRequest() {
    this.toUser.emit(this.randomUser);
    console.log('Gửi yêu cầu');
  }
}
