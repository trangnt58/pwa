import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WordService } from './../../services/word.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  providers: [ WordService ]
})
export class SectionComponent implements OnInit {
  private sub: any;
  curTopic: Object = {};
  topicId: String
	sections: Object[] = [];
  hasErr: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private wordService: WordService) { }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      this.topicId = params['topicId'];
      this.wordService.getSection(this.topicId).then( res => {
       this.sections = res;
      }).catch((err) => {
        this.hasErr = true;
        console.log('Error fetching data');
      });
      this.wordService.getInfoTopic(this.topicId).then( res => {
        this.curTopic = res;
      }).catch((err) => {
        this.hasErr = true;
      });
    });
  }

  goWord(idSection) {
    this.router.navigate(['/topic', this.curTopic['id'], idSection]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
