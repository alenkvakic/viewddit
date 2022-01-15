import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {finalize, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
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

  getPostsData(url: string): Observable<RedditPost[]>  {
    this.loadingOn();
    return this.http.get<RedditPost>(url).pipe(
      // tap(() => this.loadingOn()),
      map(res => res.data.children
        .filter(entry => entry.data.preview)
        .map(entry => entry.data)),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    console.log('loading true');
    this.#isLoadingSubject$.next(true);
  }

  loadingOff() {
    console.log('loading false');
    this.#isLoadingSubject$.next(false);
  }
}
