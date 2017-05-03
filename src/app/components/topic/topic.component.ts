import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WordService } from './../../services/word.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  providers: [ WordService ]
})
export class TopicComponent implements OnInit {
	topics: Object[] = [];
  hasErr: boolean = false;
  constructor(private router: Router, 
  	private wordService: WordService ) { }

  ngOnInit() {
  	this.wordService.getAllTopic().then(res => {
  		this.topics = res;
  	}).catch((err) => {
      this.hasErr = true;
      console.log("Error fetching topics");
    });
  }

  goLearn(topic) {
  	if (topic.status == 'inactive') return;
  	this.router.navigate(['/topic/', topic.id]);
  }

}
