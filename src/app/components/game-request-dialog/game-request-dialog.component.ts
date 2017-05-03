import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SocketService } from './../../services/socket.service';
import { GlobalVarsService } from './../../services/global-vars.service';

@Component({
  selector: 'app-game-request-dialog',
  templateUrl: './game-request-dialog.component.html',
  styleUrls: ['./game-request-dialog.component.css'],
  providers: [ SocketService ]
})
export class GameRequestDialogComponent implements OnInit {
	@Input() from : Object;
	@Input() fromSocketId: String;
  @Input() numOfQues: Number;
  to: Object;

	isAgree: boolean = false;
	socket: any;
  status: String = null;

  constructor(public dialogRef: MdDialogRef<GameRequestDialogComponent>, 
  	private socketService: SocketService, private globalVars: GlobalVarsService) { }

  ngOnInit() {
  	this.globalVars.fullSocket.subscribe(value => {
      if(value != null) {
        this.socket = value['socket'];
        this.to = value['profile'];
        this.socketService.listenEvent(this.socket, 'close-dialog').subscribe(res => {
          if(res['close']) {
            this.dialogRef.close(this.isAgree);
          }
        });
      }
    });
  }

  agree() {
  	this.isAgree = true;
  	this.sendResponse();
    this.status = "Đang tải game..."
  }

  cancel() {
  	this.sendResponse();
  	this.dialogRef.close(this.isAgree);
  }

  sendResponse() {
  	let response = {};
  	response['agree'] = this.isAgree;
    response['numOfQues'] = this.numOfQues
  	response['fromSocketId'] = this.fromSocketId;
    response['from'] = this.from;
    response['to'] = this.to;
  	this.socketService.sendEvent(this.socket, 'send-response', response);
  }

}
