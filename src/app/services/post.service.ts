import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:5037/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPost(post: Post): Observable<Post> {
    const postData = {
      name: post.name,
      description: post.description
    };
    return this.http.post<Post>(this.apiUrl, postData);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}`);
  }
}


