import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('content') content: any;
  subredditPosts$: Observable<RedditPost[]>;
  showLabel = false;
  views = ['one', 'two', 'three', 'four'];
  selectedView = 'three';

  constructor(private postsService: PostsService) {
  }
  ngOnInit() {
    this.subredditPosts$ = this.postsService.getPosts('https://www.reddit.com/r/memes/.json?&raw_json=1')
      .pipe(
        map(res => res['data'].children
            .filter(entry => entry.data.preview)
            .map(entry => entry.data))
      );
  }

  switchDisplay() {
    let selectedIndex = this.views.findIndex(entry => entry === this.selectedView);
    const nextIndex = selectedIndex + 1;
    if (nextIndex + 1 > this.views.length) {
      selectedIndex = 0;
    } else {
      selectedIndex++;
    }
    this.selectedView = this.views[selectedIndex];
  }

  toggleLabel() {
    this.showLabel = !this.showLabel;
  }

  menuOpened() {
    this.content.el.classList.remove('front');
    this.content.el.classList.add('back');
  }

  menuClosed() {
    this.content.el.classList.remove('back');
    this.content.el.classList.add('front');
  }

}
