import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { GlobalVarsService } from './../../services/global-vars.service';
import { SocketService } from './../../services/socket.service';


@Component({
  selector: 'app-waiting-game',
  templateUrl: './waiting-game.component.html',
  styleUrls: ['./waiting-game.component.css'],
  providers: [ SocketService ]
})
export class WaitingGameComponent implements OnInit {
	@Input() from: Object;
	@Input() to: Object;
  @Input() isOnline: boolean;
  socket: any;
	count: number;
	interval: any;
	isReady: boolean = false;
  status: String = "";
  toSocketId: any;

  constructor( public dialogRef: MdDialogRef<WaitingGameComponent>,
    private socketService: SocketService, private globalVars: GlobalVarsService) { }

  ngOnInit() {
    if (!this.isOnline) {
     //offline
      this.count = 3;
  	
    	this.interval = setInterval(() => {
    		this.count -=1;
    		if (this.count == 0) {
    			this.ready();
    		}  
      }, 1000);
    } else {
      //Nếu là đối kháng trực tiếp
      this.globalVars.fullSocket.subscribe(res => {
        if(res == null) return;
        this.socket = res['socket'];
        this.socketService.listenEvent(this.socket, 'receive-response').subscribe(res => {
          //đồng ý
          if(res['agree']) {
            clearInterval(this.interval);
            this.status = "Bạn chơi đã đồng ý. <br> Đang tải game...";
          } else {
            this.status = "Yêu cầu không được chấp nhận.";
            this.cancel();
          }
        });
      });
      this.count = 10;
      this.interval = setInterval(() => {
        this.count -=1;
        if (this.count == 0) {
          var data = {};
          data['toSocketId'] = this.toSocketId;
          this.socketService.sendEvent(this.socket, 'finish-request', data);
          this.status = "Yêu cầu không được chấp nhận.";
          this.cancel();
        }  
      }, 1000);
    }
  }

  ready() {
  	this.isReady = true;
  	clearInterval(this.interval);
  }

  cancel() {
    clearInterval(this.interval);
      setTimeout(() => {
        this.dialogRef.close(this.isReady);
    }, 1000);
  }
}
