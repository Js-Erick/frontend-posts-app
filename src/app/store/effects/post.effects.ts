import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../services/post.service';
import { loadPosts, loadPostsSuccess, addPost, deletePost } from '../actions/post.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService
  ) {}

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(loadPosts),
    mergeMap(() => this.postService.getPosts()
      .pipe(
        map(posts => loadPostsSuccess({ posts })),
        catchError(() => of({ type: '[Post] Load Posts Failed' }))
      ))
  ));

  addPost$ = createEffect(() => this.actions$.pipe(
    ofType(addPost),
    mergeMap(action => this.postService.addPost(action.post)
      .pipe(
        map(post => ({ type: '[Post] Add Post Success', post })),
        catchError(() => of({ type: '[Post] Add Post Failed' }))
      ))
  ));

  deletePost$ = createEffect(() => this.actions$.pipe(
    ofType(deletePost),
    mergeMap(action => this.postService.deletePost(action.postId)
      .pipe(
        map(() => ({ type: '[Post] Delete Post Success', postId: action.postId })),
        catchError(() => of({ type: '[Post] Delete Post Failed' }))
      ))
  ));
}

