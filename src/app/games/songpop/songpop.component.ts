import { Component, OnInit } from '@angular/core';
import { SongService } from './../../services/song.service';

@Component({
  selector: 'app-songpop',
  templateUrl: './songpop.component.html',
  styleUrls: ['./songpop.component.css'],
  providers: [ SongService ]
})
export class SongpopComponent implements OnInit {

	listSong: Object[] = [];
  constructor(private songService: SongService ) { }

  ngOnInit() {
  	this.songService.getPopSong().then(res => {
  		for(let i = 0; i < 10; i++) {
  			this.listSong.push(res['collection'][i]);
  		}
  		for(let i = 0; i < this.listSong.length; i++) {
	  		if(this.listSong[i]['track']['publisher_metadata'] == null) {
	  			this.listSong[i]['artist'] = this.listSong[i]['track']['user']['username'];
	  		} else {
	  			this.listSong[i]['artist'] = this.listSong[i]['track']['publisher_metadata']['artist'];
	  		}
	  	}
  	});
  }
}
