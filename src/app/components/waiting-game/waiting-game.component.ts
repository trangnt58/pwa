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
        this.socketService.receiveResponse(this.socket).subscribe(res => {
          //đồng ý
          if(res['agree']) {
            clearInterval(this.interval);
            this.status = "Bạn chơi đã đồng ý.";

          } else {
            this.status = "Yêu cầu không được chấp nhận.";
            clearInterval(this.interval);
            setTimeout(() => {
              this.dialogRef.close(this.isReady);
            }, 2000);
          }
        });
        // this.socketService.beginGame(this.socket).subscribe(res => {
        //       if(res['agree'] == true) {
        //         console.log(res['content']);
        //         this.ready();
        //       }
        // });
      });
      this.count = 10;
      this.interval = setInterval(() => {
        this.count -=1;
        if (this.count == 0) {
         // this.ready();
         this.status = "Yêu cầu không được chấp nhận.";
         clearInterval(this.interval);

        }  
      }, 1000);

    }
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
