import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RedditPost } from '../interfaces/reddit-post.interface';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('content') content: any;

  selectedSub$ = new BehaviorSubject<string>('memes');

  subredditPosts$: Observable<RedditPost[]>;
  loading$: Observable<boolean>;
  selectedSubreddit = 'memes';
  showLabel = false;
  views = ['one', 'two', 'three', 'four'];
  selectedView = 'three';

  constructor(private postsService: PostsService) {
  }
  ngOnInit() {
    this.loading$ = this.postsService.isLoading$;
    this.subredditPosts$ = this.selectedSub$.asObservable()
      .pipe(
        switchMap(enteredSubreddit => this.postsService.getPostsData(enteredSubreddit))
      )
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
    this.postsService.loadingOn();
  }

  toggleLabel() {
    this.showLabel = !this.showLabel;
  }

  confirmSubreddit() {
    console.log('this.selectedSubreddit: ', this.selectedSubreddit);
    console.log('confirmed!');
    this.selectedSub$.next(this.selectedSubreddit)
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
