import { createReducer, on, Action } from '@ngrx/store';
import { loadPostsSuccess, addPostSuccess, deletePostSuccess } from '../actions/post.actions';
import { Post } from '../../models/post.model';

export interface PostState {
    posts: Post[];
  }
  
export const initialState: PostState = {
  posts: []
};
  
const _postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts })),
  on(addPostSuccess, (state, { post }) => ({ ...state, posts: [...state.posts, post] })),
  on(deletePostSuccess, (state, { postId }) => ({ ...state, posts: state.posts.filter(post => post.id !== postId) }))
);
  
export function postReducer(state: PostState | undefined, action: Action) {
  return _postReducer(state, action);
}
