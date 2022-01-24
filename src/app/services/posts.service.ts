import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {RedditPost} from '../interfaces/reddit-post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  #isLoadingSubject$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.#isLoadingSubject$.asObservable();

  lastEntry: RedditPost = null; 

  constructor(private http: HttpClient) { }

  getPosts(url: string) {
    return this.http.get<unknown>(url);
  }

  getPostsData(subreddit: string, loadNextPage = true): Observable<RedditPost[]>  {
    this.lastEntry = loadNextPage ? this.lastEntry : null;
    this.loadingOn();
    return this.http.get<RedditPost>(`https://www.reddit.com/r/${subreddit}/.json?${ loadNextPage && this.lastEntry ? '&after=' + this.lastEntry.name : '' }&raw_json=1`).pipe(
      catchError(() => of(null)),
      map(res => {
        return res?.data?.children
        .filter(entry => entry?.data?.preview)
        .map(entry => entry?.data)
      }),
      tap(res => this.lastEntry = res[res.length - 1]),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    this.#isLoadingSubject$.next(true);
  }

  loadingOff() {
    this.#isLoadingSubject$.next(false);
  }
}
