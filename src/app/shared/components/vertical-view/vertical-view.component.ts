import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { RedditPost } from 'src/app/interfaces/reddit-post.interface';
import { ViewData } from 'src/app/interfaces/view-data.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-vertical-view',
  templateUrl: './vertical-view.component.html',
  styleUrls: ['./vertical-view.component.scss'],
})
export class VerticalViewComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() selectedSubreddit: string;
  @Input() selectedView = 'three';
  @Input() showLabel = false;

  @ViewChild('content') content: any;

  private destroy$ = new Subject();
  selectedSub$: BehaviorSubject<ViewData>;
  subredditPosts$: Observable<RedditPost[]>;
  allPosts: RedditPost[];
  loading$: Observable<boolean>;
  views = ['one', 'two', 'three', 'four'];
  showNextPage: boolean;

  constructor(private postsService: PostsService) {
  }
  ngOnInit() {
    this.loading$ = this.postsService.isLoading$;
    this.selectedSub$ = new BehaviorSubject<ViewData>({subreddit: this.selectedSubreddit, goToNextPage: false });
    this.subredditPosts$ = this.selectedSub$.asObservable()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(view => {
          this.showNextPage = view.goToNextPage;
          return this.postsService.getPostsData(view.subreddit, view.goToNextPage)
        })
      );

    this.subredditPosts$.subscribe(posts => {
      if (this.showNextPage) {
        this.allPosts = [...this.allPosts, ...posts];
      } else {
        this.allPosts = posts
      }
    })
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

  confirmSubreddit() {
    this.allPosts = [];
    this.scrollToTop();
    this.selectedSub$.next({ subreddit: this.selectedSubreddit, goToNextPage: false })
  }

  loadNextPage(event) {
    event.target.complete();
    this.selectedSub$.next({ subreddit: this.selectedSubreddit, goToNextPage: true })
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  /**
   * Decode some characters on URLs coming from reddit API
   */
  decodeUrl(url: string): string {
    return url.replace('amp;', '').replace('amp;s', 's');
  }

  menuOpened() {
    this.content.el.classList.remove('front');
    this.content.el.classList.add('back');
  }

  menuClosed() {
    this.content.el.classList.remove('back');
    this.content.el.classList.add('front');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
