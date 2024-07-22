import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState } from '../reducers/post.reducer';
import { Post } from '../../models/post.model';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

export const selectFilteredPosts = (filter: string) => createSelector(
  selectAllPosts,
  (posts: Post[]) => posts.filter(post => post.name.toLowerCase().includes(filter.toLowerCase()))
);



