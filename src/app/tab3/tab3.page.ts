import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RedditPost } from '../interfaces/reddit-post.interface';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  subredditPosts$: Observable<RedditPost[]>
  selectedView = 'three-view'
  showLabel = false;

  @ViewChild('content') content: any;

  constructor(private postsService: PostsService) {}
  
  ngOnInit() {
    this.subredditPosts$ = this.postsService.getPosts('https://www.reddit.com/r/memes/.json?&raw_json=1')
      .pipe(
        map(res => {
          return res['data'].children
            .filter(entry => entry.data.preview)
            .map(entry => entry.data)
        })
      )
  }

  switchDisplay() {
    this.selectedView = this.selectedView === 'three-view' ? 'four-view' : 'three-view';
  }

  toggleLabel() {
    this.showLabel = !this.showLabel;
  }

  menuOpened() {
    this.content.el.classList.remove('front')
    this.content.el.classList.add('back')
  }

  menuClosed() {
    this.content.el.classList.remove('back')
    this.content.el.classList.add('front')
  }

}