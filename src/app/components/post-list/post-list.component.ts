import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/post.model';
import { loadPosts, deletePost, addPost } from '../../store/actions/post.actions';
import { selectAllPosts, selectFilteredPosts } from '../../store/selectors/post.selectors';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);
  filter: string = '';
  p: number = 1; 
  itemsPerPage: number = 5; 
  totalItems: number = 0; 
  Math = Math; 

  postForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private store: Store) {
    this.posts$ = this.store.pipe(select(selectAllPosts));
  }

  ngOnInit() {
    this.store.dispatch(loadPosts());
    this.posts$.subscribe(posts => {
      this.totalItems = posts.length;
      console.log('Posts:', posts);
    });
  }

  onFilter() {
    this.posts$ = this.store.pipe(select(selectFilteredPosts(this.filter.toLowerCase())));
  }

  onCreate() {
    if (this.postForm.valid) {
      const newPost: Post = {
        id: Date.now(), 
        name: this.postForm.get('name')?.value || '',
        description: this.postForm.get('description')?.value || ''
      };
      this.store.dispatch(addPost({ post: newPost }));
      this.postForm.reset();

      
      Swal.fire({
        title: '¡Nuevo Post Creado!',
        text: `Haz creado un nuevo post con nombre: "${newPost.name}" y descripción: "${newPost.description}"`,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } else {
      this.postForm.markAllAsTouched(); 
    }
  }

  onDelete(postId: number) {
    
    this.posts$.subscribe(posts => {
      const post = posts.find(p => p.id === postId);
      if (post) {
       
        Swal.fire({
          title: '¿Estás seguro?',
          text: `¿Estás seguro de eliminar este post"?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.store.dispatch(deletePost({ postId }));
            Swal.fire({
              title: '¡Eliminado!',
              text: `Haz eliminado el post con nombre: "${post.name}" y descripción: "${post.description}"`,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    }).unsubscribe(); 
  }

  onPageChange(page: number) {
    this.p = page;
  }
}
