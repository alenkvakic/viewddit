import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

import { Observable, throwError } from 'rxjs';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  previewImages$: Observable<unknown[]>

  constructor(private postsService: PostsService) {}
  
  ngOnInit() {
    this.previewImages$ = this.postsService.getPosts('https://www.reddit.com/r/pics/.json?&raw_json=1')
      .pipe(
        map(res => {
          return res['data'].children
            .filter(entry => entry.data.preview)
            .map(entry => entry.data.preview.images[0].source.url)
        })
      )
  }

}
