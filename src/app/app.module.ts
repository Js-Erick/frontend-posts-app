import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { postReducer } from './store/reducers/post.reducer';
import { PostEffects } from './store/effects/post.effects';
import { PostService } from './services/post.service';

const appRoutes: Routes = [
  { path: '', component: PostListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ posts: postReducer }),
    EffectsModule.forRoot([PostEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

