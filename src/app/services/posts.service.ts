import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {finalize, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
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
      map(res => res.data.children
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
