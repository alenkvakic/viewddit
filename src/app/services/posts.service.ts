import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, finalize, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {RedditPost} from '../interfaces/reddit-post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  #isLoadingSubject$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.#isLoadingSubject$.asObservable();

  constructor(private http: HttpClient) { }

  getPosts(url: string) {
    return this.http.get<unknown>(url);
  }

  getPostsData(subreddit: string, page = 1): Observable<RedditPost[]>  {
    this.loadingOn();
    return this.http.get<RedditPost>(`https://www.reddit.com/r/${subreddit}/.json?&raw_json=${page}`).pipe(
      catchError(() => of(null)),
      map(res => res?.data?.children
        .filter(entry => entry.data.preview)
        .map(entry => entry.data)),
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
