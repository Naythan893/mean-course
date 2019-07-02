import { Component,OnInit,OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import { Post } from '../post.model';
import  { PostsService } from '../posts.service';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent  implements  OnInit, OnDestroy {
  // postlist=[
  //   {title: 'First post',content: 'First post\'s content'},
  //   {title: 'Second post',content: 'Second post\'s content'},
  //   {title: 'Third post',content: 'Thrid post\'s content'}
  // ];
postlist: Post[]=[];
private postsSub :  Subscription;
  constructor(public postsService: PostsService) {}


  ngOnInit()  {
    this.postlist=this.postsService.getPosts();
    this.postsSub =  this.postsService.getPostUpdatedListener()
    .subscribe((posts:  Post[]) =>  {
      this.postlist=posts;

    } );
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
 }
