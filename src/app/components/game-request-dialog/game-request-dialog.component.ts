import { Component, OnInit, Input } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
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
  to: Object;

	isAgree: boolean = false;
	socket: any;

  constructor(public dialogRef: MdDialogRef<GameRequestDialogComponent>, 
  	private socketService: SocketService, private globalVars: GlobalVarsService) { }

  ngOnInit() {
  	this.globalVars.fullSocket.subscribe(value => {
      if(value != null) {
        this.socket = value['socket'];
        this.to = value['profile'];
        // this.socketService.beginGame(this.socket).subscribe(res => {
        //   if(res['agree'] == true) {
        //     this.isAgree = true;
        //    	console.log(res['content']);
        //     this.dialogRef.close(this.isAgree);
        //   }
        // });
      }
    });
  }

  agree() {
  	this.isAgree = true;
  	this.sendResponse();
  	//this.dialogRef.close(this.isAgree);
  }

  cancel() {
  	this.sendResponse();
  	this.dialogRef.close(this.isAgree);
  }

  sendResponse() {
  	let response = {};
  	response['agree'] = this.isAgree;
  	response['fromSocketId'] = this.fromSocketId;
    response['from'] = this.from;
    response['to'] = this.to;
  	this.socketService.sendResponse(this.socket, response);
  }

}
