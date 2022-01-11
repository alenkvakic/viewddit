import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  previewImages$: Observable<unknown[]>

  constructor(private postsService: PostsService) {}
  
  ngOnInit() {
    this.previewImages$ = this.postsService.getPosts('https://www.reddit.com/r/aww/.json?&raw_json=1')
      .pipe(
        map(res => {
          return res['data'].children
            .filter(entry => entry.data.preview)
            .map(entry => entry.data.preview.images[0].source.url)
        })
      )
  }

}